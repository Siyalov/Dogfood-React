import React, { useState, useContext } from "react";
import { BoxArrowInRight, BoxArrowLeft } from "react-bootstrap-icons";
import "./style.css";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { Context } from "../../App";
import { ReactComponent as FavIcon } from "./img/ic-favorites.svg";
import { ReactComponent as CartIcon } from "./img/ic-cart.svg";
import { ReactComponent as ProfileIcon } from "./img/ic-profile.svg";
import xmasTree from "./img/xmas-tree.png";
import { useNavigate } from "react-router-dom";
import { path } from "../../settings";

/** @typedef {import('../../typings').Product} Product */
/** @typedef {import('../../typings').NewProduct} NewProduct */
/** @typedef {import('../../typings').User} User */
/** @typedef {import('../../typings').UserAuthorization} UserAuthorization */

let xmasAudioData = "";
if (document.body.classList.contains("xmas")) {
  xmasAudioData = require("../../assets/xmas-audio").default;
}

/**
 * @param {Object} opts
 * @param {React.Dispatch<React.SetStateAction<boolean>>} opts.openPopup
 * @param {React.Dispatch<React.SetStateAction<string>>} opts.setToken
 */
export default function Header({
  openPopup,
  setToken,
}) {
  const navigate = useNavigate();
  const { searchText, search, products, cartLength, favorites, setUser, user } = useContext(Context);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handler = (e) => {
    search(e.target.value);
  };
  /** @type {React.MouseEventHandler<HTMLAnchorElement>} */
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("shop-user");
    localStorage.removeItem("user");
    setToken("");
    setUser({});
    navigate(path);
  };

  return (
    <>
      <header>
        <Logo />
        {document.body.classList.contains("xmas") ? (
          <>
            <audio loop={true} autoPlay={true} id="xmas_audio">
              <source src={xmasAudioData} />
            </audio>
            <span
              className="xmas__tree"
              onClick={() => {
                if (xmas_audio.paused) {
                  xmas_audio.play();
                  document.body.classList.add("xmas");
                } else {
                  xmas_audio.pause();
                  document.body.classList.remove("xmas");
                }
              }}
            >
              <img height={64} src={xmasTree} />
            </span>
          </>
        ) : (
          ""
        )}
        <input type="search" value={searchText} onChange={handler} />
        <nav>
          {user._id && (
            <Link to={path + "favorites"}>
              <FavIcon />
              <span>{favorites.length}</span>
            </Link>
          )}
          {user._id && (
            <Link to={path + "shoppingCart"}>
              <CartIcon />
              <span>{cartLength}</span>
            </Link>
          )}
          {user._id && (
            <Link to={path + "profile"}>
              <ProfileIcon />
            </Link>
          )}
          {user._id && (
            <a href="" onClick={logout}>
              <BoxArrowLeft style={{ fontSize: "1.6rem" }} />
            </a>
          )}
          {!user._id && (
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                openPopup(true);
              }}
            >
              <BoxArrowInRight style={{ fontSize: "1.6rem" }} />
            </a>
          )}
        </nav>
      </header>
      <div>
        {searchText
          ? `По запросу ${searchText} найдено ${products.length} позиций`
          : ""}
      </div>
    </>
  );
};
