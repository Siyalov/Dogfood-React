import React from "react";
import "./style.css";
import { Percent } from "react-bootstrap-icons";

/**
 * @param {Object} opts
 * @param {string | JSX.Element} opts.text
 * @param {number} opts.price
 * @param {string} opts.img
 * @param {string} opts.cardColor
 */
export default function AdCard({ text, price, img, cardColor }) {
  const imgStyle = {
    backgroundImage: `url(${img})`,
  };
  return (
    <div className="ad-card" style={{ "--cardColor": cardColor }}>
      <div className="ad-card__wrapper">
        <div className="ad-card__text">{text}</div>
        <div className="ad-card__img" style={imgStyle}></div>
        <Percent className="ad-background-symbol" />
      </div>
    </div>
  );
};
