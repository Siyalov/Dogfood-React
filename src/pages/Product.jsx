import React, { useState, useEffect } from "react";
//import data from "../assets/data.json"
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Figure, Table, ButtonGroup, Button, Alert } from "react-bootstrap";
import { Truck } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
import Api from "../Api";

export default ({ api, addToCart } ) => {
   // let p = data[0];
   const [product, setProduct] = useState({})

   const [cnt, setCnt] = useState(1);
   let params = useParams();

   useEffect(() => {
      api.getProduct(params.id)
         .then(data => {
            console.log(data);
            setProduct(data);
         })
   }, []);


   return <Container>
      {product._id &&
         <Row>
            <Col xs={12}>
               <h1>{product.name}</h1>
            </Col>
            <Col xs={12} md={6} lg={4}>
               <Figure>
                  <Figure.Image src={product.pictures} />
               </Figure>
            </Col>
            <Col xs={12} md={4}>
               {product.discount ? <small><del>{cnt * product.price} ₽ </del></small> : ''}
               <div><strong className={product.discount ? "text-danger" : "text-dark"}>
                  {cnt * Math.ceil(product.price * ((100 - product.discount) / 100))} ₽
               </strong></div>
               <Row>
                  <Col md={6}>
                     <ButtonGroup>
                        <Button size="sm" variant="light" disabled={!cnt} onClick={e => setCnt(cnt - 1)}>-</Button>
                        <Button size="sm" variant="light" disabled>{cnt}</Button>
                        <Button size="sm" variant="light" onClick={e => setCnt(cnt + 1)}>+</Button>
                     </ButtonGroup>
                  </Col>
                  <Col md={6}>
                     <Button size="sm" variant="warning" onClick={() => addToCart(product, cnt) }>В корзину</Button>
                  </Col>
               </Row>
               {/* <Alert variant="secondary" className="mt-3">
                  <Row>
                     <Col md={1}><Truck /></Col>
                     <Col><small>Доставка по всему миру!</small></Col>
                  </Row >
               </Alert > */}
            </Col >
            <Col xs={12}>
               <h2>Описание</h2>
               <p>{product.description}</p>
            </Col>
            <Col xs={12}>
               <h2>Характеристики</h2>
               <Table hover>
                  <tbody>
                     <tr>
                        <th>Вес</th>
                        <th>{product.wight} грамм</th>
                     </tr>
                     <tr>
                        <th>Цена</th>
                        <th>{product.price} ₽ за 100 грамм</th>
                     </tr>
                     <tr>
                        <th>Польза</th>
                        <th>{product.description}</th>
                     </tr>
                  </tbody>
               </Table>
            </Col>
            <Col xs={12}>
               <h2>Отзывы</h2>
            </Col>
         </Row >
      }
   </Container >
}

