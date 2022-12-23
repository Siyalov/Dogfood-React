import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { path } from "../../settings";
import Api from "../../Api";
import { useContext } from "react";
import { Context } from "../../App";

/** @typedef {import('../../typings').Product} Product */

/**
 * @param {{
 *  product: Product
 *  addToCart: (product: Product, count: number) => void
 * }} param0
 */
export default function Card({
  product,
  addToCart,
}) {
  const { api, setFavorites, user } = useContext(Context);

  const [like, setLike] = useState(false);
  const imgStyle = {
    backgroundImage: `url(${product.pictures})`,
  };
  useEffect(() => {
    if (product.likes.includes(user._id)) {
      setLike(true);
    }
  }, []);

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

  return (
    <Link to={path + `product/${product._id}`}>
      <div className="card">
        <div className="card__header">
          {product.discount ? <span className="card__discount">-{product.discount}%</span> : ""}
          <span className="card__like" onClick={likeHandler}>
            {like ? <HeartFill /> : <Heart />}
          </span>
        </div>
        <div className="card__img" style={imgStyle}></div>
        <div className="card__price">{product.price} ₽</div>
        <div className="card__text">{product.name}</div>
        <button
          className="btn"
          onClick={(event) => {
            event.preventDefault();
            addToCart();
          }}
        >
          В корзину
        </button>
      </div>
    </Link>
  );
};
