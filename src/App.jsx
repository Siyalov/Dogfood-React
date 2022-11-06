import React, { useState } from "react";
import Product from "./pages/Product";
// import Catalog from "./pages/Catalog";
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Container, Row, Col } from "react-bootstrap";



const App = () => {
    {/*const st = {
        height: "50px",
        backgroundColor: "silver"
    }

    return <Container style={{ height: "900px", backgroundColor: "darkorchid" }}>
         <Row>
            <Col xs={12} style={st} />
            <Col md={3} xs={6} style={st} />
            <Col md={3} xs={6} style={st} />
            <Col md={3} xs={6} style={st} />
            <Col md={3} xs={6} style={st} />
            <Col xs={12} style={st} />
            <Col xs={6} style={st} />
            <Col xs={6} style={st} />
            <Col xs={6} style={st} />
            <Col xs={12} style={st} />
        </Row> 
    </Container >*/}
    return <Product />
}

export default App;






