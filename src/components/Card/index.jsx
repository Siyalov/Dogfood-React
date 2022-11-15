import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Card = ({ text, price, img, id }) => {
   const imgStyle = {
      backgroundImage: `url(${img})`
   };
   return (
      <Link to={`/product/${id}`}>
         <div className="card">
            <div className="card__img" style={imgStyle}></div>
            <div className="card__price">{price} ₽</div>
            <div className="card__text">{text}</div>
            <button className="btn">Вкорзину</button>
         </div>
      </Link>
   )
}

export default Card;