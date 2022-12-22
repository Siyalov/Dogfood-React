import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Catalog from "./pages/Catalog";
import ShoppingCart from "./pages/ShoppingCart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Api from "./Api.js";
import Local from "./Local";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import { Fan } from "react-bootstrap-icons";
import { path, defaultToken } from "./settings";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import { Container, Row, Col } from "react-bootstrap";

const Context = React.createContext({}); 

const App = () => {
    const [data, setData] = useState([]);
    const [goods, setGoods] = useState([]);
    const [token, setToken] = useState(Local.getItem("shop-user"));
    const [user, setUser] = useState(Local.getItem("user", true));
    const [popupActive, changePopupActive] = useState(false);
    const [api, setApi] = useState(new Api(token || defaultToken));
    const [fav, setFav] = useState([]);
    const [products, setProducts ] =useState([]);
    const [searchText, search] = useState("");
    const [cart, setCart] = useState([]);
    function addToCart(product, count) {
        for (const el of cart) {
            if (el.product._id === product._id) {
                el.count += count
                return
            }
        }
        cart.push({ product, count });
        setCart([...cart]);
    }

    useEffect(() => {
        // setApi(new Api(token));
        api.token = token;
    }, [token]);

    useEffect(() => {
        if (!token) {
            api.token = defaultToken;
            setUser({});
        }
        // if (token) {
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
                        api.token = defaultToken;
                        setUser({});
                    }
                });
        // } else {
        //     setGoods([]);
        //     setData([]);
        // }
    }, []);

    useEffect(() => {
        const f = goods.filter(el => el.likes.includes(user._id))
        setFav(f);
        setProducts(goods);
    }, [goods])

    return <Context.Provider value={{
        products: products,
        searchText: searchText,
        setProducts: setProducts,
        search: search,  
    }}>
        <div className="wrapper">
            <Header
                // products={data}
                update={setGoods}
                openPopup={changePopupActive}
                user={!!token}
                setToken={setToken}
                setUser={setUser}
                likes={fav.length}
                cart={cart.length}
            />
            {/* <Catalog goods={goods} /> */}
            {/* <Product/> */}
            {/* TODO: use hash router to fix github pages problem */  }
            <Routes>
                <Route path={path} element={<Catalog goods={goods} setFav={setFav} api={api} user={user} addToCart={addToCart} />} />
                <Route path={path + "favorites"} element={<Main goods={fav} api={api} setFav={setFav} user={user} />} />
                <Route path={path + "product/:id"} element={<Product api={api} addToCart={addToCart} />} />
                <Route path={path + "profile"} element={<Profile user={user} />} />
                <Route path={path + "shoppingCart"} element={<ShoppingCart cart={cart} />} />
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
    </Context.Provider>
};

export {App, Context};
