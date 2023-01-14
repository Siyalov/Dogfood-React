import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Figure,
  Table,
  ButtonGroup,
  Button,
  Alert,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context } from "../App";
import { StarFill, Star, HeartFill, Heart, Truck } from 'react-bootstrap-icons'

/** @typedef {import('../typings').Product} Product */
/** @typedef {import('../typings').Review} Review */

export default function Product() {
  const { api, addToCart, setFavorites, user } = useContext(Context);

  /** @type {[ Product, React.Dispatch<React.SetStateAction<Product>> ]} */
  const [product, setProduct] = useState({});
  // /** @type {[ Review[], React.Dispatch<React.SetStateAction<Review[]>> ]} */
  // const [productReviews, setProductReviews] = useState([]);

  const [cnt, setCnt] = useState(1);
  const [like, setLike] = useState(false);
  useEffect(() => {
    if (product?.likes?.includes(user._id)) {
      setLike(true);
    }
  }, []);
  let params = useParams();

  /** @type {React.MouseEventHandler<HTMLSpanElement>} */
  const likeHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setLike(!like);
    api.setLike(product._id, !like).then((data) => {
      if (!like) {
        setFavorites((prev) => {
          return [...prev, data];
        });
      } else {
        setFavorites((prev) => prev.filter((el) => el._id !== product._id));
      }
    });
  };


  useEffect(() => {
    api.getProduct(params.id).then((data) => {
      setProduct(data);
    });
    // api.getProductReviews(params.id).then((data) => {
    //   setProductReviews(data);
    // });
  }, []);

  return (
    <Container>
      {product._id && (
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
            {product.discount ? (
              <small>
                <del>{cnt * product.price} ₽ </del>
              </small>
            ) : (
              ""
            )}
            <div>
              <strong
                className={product.discount ? "text-danger" : "text-dark"}
              >
                {cnt *
                  Math.ceil(
                    product.price * ((100 - product.discount) / 100)
                  )}{" "}
                ₽
              </strong>
            </div>
            <Row>
              <Col md={6}>
                <ButtonGroup>
                  <Button
                    size="sm"
                    variant="light"
                    disabled={!cnt}
                    onClick={(e) => setCnt(cnt - 1)}
                  >
                    -
                  </Button>
                  <Button size="sm" variant="light" disabled>
                    {cnt}
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    onClick={(e) => setCnt(cnt + 1)}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </Col>
              <Col md={6}>
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => addToCart(product, cnt)}
                >
                  В корзину
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="product__like" onClick={likeHandler}>
                  {like ? [<HeartFill color="red" />, ' Убрать из избранного'] : [<Heart color="red" />, ' Добавить в избранное']}
                </div>
              </Col>
            </Row>  
            <Row>
              <Col>
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
              </Col>
            </Row>
          </Col>
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
            <Row>
              <Col>
                { product.reviews.length > 0 ?
                  product.reviews.map(review => (
                    <div className="product-review">
                      <div>
                        <b>{review.author.name}</b>{" "}
                        {new Date(review.created_at).toLocaleString()}
                      </div>
                      <div>
                        {new Array(review.rating).fill(<StarFill color="orange" />)}
                        {new Array(5 - review.rating).fill(<Star color="orange" />)}
                      </div>
                      <div>{review.text}</div>
                    </div>
                  ))
                  : 'Отзывов пока нет.'
                }
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};
