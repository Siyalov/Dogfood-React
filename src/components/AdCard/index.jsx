import React from "react";
import "./style.css";

const AdCard = ({ text, price, img }) => {
   const imgStyle = {
      backgroundImage: `url(${img})`
   };
   return (
      <div className="ad-card">
         <div className="ad-card__wrapper">
            <div className="ad-card__text">{text}</div>
            <div className="ad-card__img" style={imgStyle}></div>
         </div>
      </div>
   )
}

export default AdCard;