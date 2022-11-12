import React, { useEffect, useState } from "react";
import Product from "./pages/Product";
import Catalog from "./pages/Catalog";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Api from "./Api.js"
//import 'bootstrap/dist/css/bootstrap.min.css';
//import { Container, Row, Col } from "react-bootstrap";



const App = () => {
    const [data, setData] = useState([]);
    const [goods, setGoods] = useState([])
    const [token, setToken] = useState(localStorage.getItem('shop-user'));
    const [popupActive, changePopupActive] = useState(false);
    const [api, setApi] = useState(new Api(token));

    useEffect(() => {
        setApi(new Api(token));
    }, [token])


    useEffect(() => {
        if (token) {
            api.getProducts()
                .then(data => {
                    setGoods(data.products || []);
                    setData(data.products || []);
                })
            // console.log("Данные из сервера", data);
            api.showProfile()
                .then(data => {
                    console.log("User", data);
                    if (!data._id) {
                        setToken('');
                    }
                });
        } else {
            setGoods([]);
            setData([]);
        }
    }, [api])

    return <>
        <div className="wrapper">
            <Header products={data} update={setGoods} openPopup={changePopupActive} user={!!token} setToken={setToken} />
            <Catalog goods={goods} />
            {/* <Product/> */}
            <Footer />
        </div>
        {!token && <Modal isActive={popupActive} changeActive={changePopupActive} setToken={setToken} api={api} />}
    </>
}

export default App;




