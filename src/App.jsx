import React, { useEffect, useState } from "react";
import Product from "./pages/Product";
import Catalog from "./pages/Catalog";
import Header from "./components/Header";
import Footer from "./components/Footer";

import 'bootstrap/dist/css/bootstrap.min.css';
//import { Container, Row, Col } from "react-bootstrap";



const App = () => {
    const [data, setData] = useState([]);
    const [goods, setGoods] = useState([])
    const [token, setToken] = useState(localStorage.getItem('shop-user'))

    useEffect(() => {
        fetch("https://api.react-learning.ru/products", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setGoods(data.products)
                setdata(data.products)

            });
    }, []);

    return <>
        <div className="wrapper">
            <Header products={data} update={setGoods} />
            <Catalog goods={goods} />
            <Footer />
        </div>
    </>
}

export default App;




