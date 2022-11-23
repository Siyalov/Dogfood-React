import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Catalog from "./pages/Catalog";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Api from "./Api.js";
import Local from "./Local";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import { Fan } from "react-bootstrap-icons";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import { Container, Row, Col } from "react-bootstrap";

const App = () => {
    const [data, setData] = useState([]);
    const [goods, setGoods] = useState([]);
    const [token, setToken] = useState(Local.getItem("shop-user"));
    const [user, setUser] = useState(Local.getItem("user", true));
    const [popupActive, changePopupActive] = useState(false);
    const [api, setApi] = useState(new Api(token));
    const [fav, setFav] = useState([]);

    useEffect(() => {
        setApi(new Api(token));
    }, [token]);

    useEffect(() => {
        if (token) {
            api.getProducts()
                .then((data) => {
                    setGoods(data.products || []);
                    setData(data.products || []);
                });
            // console.log("Данные из сервера", data);
            api.showProfile()
                .then((data) => {
                    // console.log("User", data);
                    if (!data._id) {
                        setToken("");
                    }
                });
        } else {
            setGoods([]);
            setData([]);
        }
    }, [api]);

    useEffect(() => {
        const f = goods.filter((el) => el.likes.includes(user._id));
        setFav(f);
    }, [goods]);

    return (
        <>
        <div className="wrapper">
            <Header
                products={data}
                update={setGoods}
                openPopup={changePopupActive}
                user={!!token}
                setToken={setToken}
                setUser={setUser}
                likes={fav.length}
            />
            {/* <Catalog goods={goods} /> */}
            {/* <Product/> */}
            <Routes>
                <Route path="/" element={<Catalog goods={goods} setFav={setFav} api={api} user={user}/>} />
                <Route path="/favorites" element={<Main goods={fav} api={api} setFav={setFav} user={user} />} />
                <Route path="/product/:id" element={<Product api={api} />} />
                <Route path="/profile" element={<Profile user={user} />} />
            </Routes>
            <Footer />
        </div>
        {!token && (
            <Modal
            isActive={popupActive}
            changeActive={changePopupActive}
            setToken={setToken}
            api={api}
            setUser={setUser}
            likes={fav.length}
            />
        )}
        </>
    );
};

export default App;
