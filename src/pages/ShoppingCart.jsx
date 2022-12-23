import React from "react";
import {
  Container,
  Row,
  Col,
  Figure,
  Table,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { EmojiFrown } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { path } from "../settings";

export default function ShoppingCart({ cart, cartLength }) {
  return (
    <>
      <Container>
        <Row>
          <Col xs={12}>
            <h1>
              <b>{cartLength} товаров</b> в корзине
            </h1>
          </Col>
          {cartLength == 0 ? (
            <Col xs={12} className="centered">
              <div>
                <EmojiFrown
                  style={{
                    color: "lightgrey",
                    fontSize: "600%",
                  }}
                />
              </div>
              <h3>
                <b>В корзине нет товаров</b>
              </h3>
              <h5 style={{ color: "lightgrey" }}>
                Добавьте товар, нажав кнопку «В корзину» в карточке товара
              </h5>
              <Link to={path}>
                <Button variant="warning" size="sm">
                  На главную
                </Button>
              </Link>
              <div>
                <br />
              </div>
            </Col>
          ) : (
            cart.map((el) => (
              <div>
                {el.product.name}
                {el.count}
              </div>
            ))
          )}
        </Row>
      </Container>
    </>
  );
}
