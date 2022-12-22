import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { path } from "../../settings";

const Card = ({
  name,
  price,
  pictures,
  _id,
  likes,
  api,
  setFav,
  discount,
  userId,
  addToCart,
}) => {
  const [like, setLike] = useState(false);
  const imgStyle = {
    backgroundImage: `url(${pictures})`,
  };
  useEffect(() => {
    if (likes.includes(userId)) {
      setLike(true);
    }
  }, []);

  const likeHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setLike(!like);
    api.setLike(_id, !like).then((data) => {
      if (!like) {
        setFav((prev) => {
          return [...prev, data];
        });
      } else {
        setFav((prev) => prev.filter((el) => el._id !== _id));
      }
    });
  };

  return (
    <Link to={path + `product/${_id}`}>
      <div className="card">
        <div className="card__header">
          {discount ? <span className="card__discount">-{discount}%</span> : ""}
          <span className="card__like" onClick={likeHandler}>
            {like ? <HeartFill /> : <Heart />}
          </span>
        </div>
        <div className="card__img" style={imgStyle}></div>
        <div className="card__price">{price} ₽</div>
        <div className="card__text">{name}</div>
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

export default Card;
