import React, { useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Footer from "./components/Footer";

import data from "./assets/data.json"


const App = () => {
    const [goods, setGoods] = useState(data);

    return (
        <div className="wrapper">
            <Header products={goods} />
            <div className="cards-container">
                {/* <Card/> */}
                {data.map((d, i) => <Card
                    key={i}
                    img={d.picture}
                    text={d.name}
                    price={d.price}
                />)}
            </div>
            <Footer />
        </div>
    )
}

export default App;






