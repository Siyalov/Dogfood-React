import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  Alert,
  Container,
  Row,
  Col,
  Figure,
  Table,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { EmojiFrown, Trash, Truck } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Context } from "../App";
import { path } from "../settings";

export default function ShoppingCart() {
  const { cart, cartLength, addToCart } = useContext(Context);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  useEffect(() => {
    let price = 0;
    let discount = 0;
    for (const el of cart) {
      price += el.product.price * el.count;
      discount += Math.floor(
        (el.product.price * el.count * el.product.discount) / 100
      );
    }
    setTotalPrice(price);
    setTotalDiscount(discount);
  }, [cart]);

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
            <>
              <Col xs={12} lg={8}>
                {cart.map((el) => (
                  <Row>
                    <Col xs={1}>
                      <Figure>
                        <Figure.Image src={el.product.pictures} />
                      </Figure>
                    </Col>
                    <Col xs={4}>{el.product.name}</Col>
                    <Col xs={3}>
                      <ButtonGroup>
                        <Button
                          size="sm"
                          variant="light"
                          disabled={!el.count}
                          onClick={(e) => addToCart(el.product, -1)}
                        >
                          -
                        </Button>
                        <Button size="sm" variant="light" disabled>
                          {el.count}
                        </Button>
                        <Button
                          size="sm"
                          variant="light"
                          onClick={(e) => addToCart(el.product, 1)}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </Col>

                    <Col xs={2}>
                      <div>
                        {el.product.discount ? (
                          <>
                            <del className="text-dark">
                              {el.count * el.product.price} ₽
                            </del>
                            <br />
                            <strong
                              className={
                                el.product.discount
                                  ? "text-danger"
                                  : "text-dark"
                              }
                            >
                              {el.count *
                                Math.ceil(
                                  el.product.price *
                                    ((100 - el.product.discount) / 100)
                                )}{" "}
                              ₽
                            </strong>
                          </>
                        ) : (
                          <strong className="text-dark">
                            {el.count * el.product.price} ₽
                          </strong>
                        )}
                      </div>
                    </Col>
                    <Col xs={1}>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => addToCart(el.product, -el.count)}
                      >
                        <Trash />
                      </Button>
                    </Col>
                  </Row>
                ))}
              </Col>
              <Col xs={12} lg={4}>
                <Row>
                  <Col
                    xs={12}
                    style={{ borderRadius: 8, boxShadow: "grey 0 0 10px" }}
                  >
                    <Row>
                      <Col xs={12} className="padding-top">
                        <h3>
                          <b>Ваша корзина</b>
                        </h3>
                      </Col>
                    </Row>
                    <Row className="padding-top">
                      <Col xs={6}>Товары</Col>
                      <Col xs={6} className="right-align">
                        {totalPrice} ₽
                      </Col>
                    </Row>
                    <Row className="padding-top">
                      <Col xs={6}>Скидка</Col>
                      <Col
                        xs={6}
                        className="right-align"
                        style={{ color: "red" }}
                      >
                        {-totalDiscount} ₽
                      </Col>
                    </Row>

                    <hr />
                    <Row>
                      <Col xs={6}>
                        <b>Общая стоимость</b>
                      </Col>
                      <Col xs={6} className="right-align">
                        <b>{totalPrice - totalDiscount} ₽</b>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} className="padding-top padding-bottom">
                        <Button
                          size="sm"
                          variant="warning"
                          className="width100"
                        >
                          Оформить заказ
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Alert variant="secondary" className="mt-3">
                    <Row>
                      <Col xs={2}>
                        <Truck />
                      </Col>
                      <Col xs={10}>
                        {" "}
                        <small>
                          <b>Доставка по всему миру!</b>
                        </small>
                        <br />
                        <small>
                          Доставка курьером - <b>от 399 &nbsp;₽</b>
                        </small>
                        <br />
                        <small>
                          Доставка в пункт выдачи - <b>от 199&nbsp;₽</b>
                        </small>
                      </Col>
                    </Row>
                  </Alert>
                </Row>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
}
