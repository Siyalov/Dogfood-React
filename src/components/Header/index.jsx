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
 * @param {React.Dispatch<React.SetStateAction<Product[]>>} opts.update
 * @param {React.Dispatch<React.SetStateAction<boolean>>} opts.openPopup
 * @param {boolean} opts.user
 * @param {React.Dispatch<React.SetStateAction<string>>} opts.setToken
 * @param {React.Dispatch<React.SetStateAction<User>>} opts.setUser
 * @param {number} opts.likes
 * @param {number} opts.cart
 */
export default function Header({
  update,
  openPopup,
  user,
  setToken,
  setUser,
  likes,
  cart,
}) {
  const navigate = useNavigate();
  // TODO: types
  const { searchText, search, setProducts, products } = useContext(Context);
  const [cnt, setCnt] = useState(0);
  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handler = (e) => {
    search(e.target.value);
    const result = products.filter(
      (el) => el.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
    );
    setCnt(result.length);
    if (!text) {
      update(products);
    } else {
      update(result);
    }
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
          {user && (
            <Link to={path + "favorites"}>
              <FavIcon />
              <span>{likes}</span>
            </Link>
          )}
          {user && (
            <Link to={path + "shoppingCart"}>
              <CartIcon />
              <span>{cart}</span>
            </Link>
          )}
          {user && (
            <Link to={path + "profile"}>
              <ProfileIcon />
            </Link>
          )}
          {user && (
            <a href="" onClick={logout}>
              <BoxArrowLeft style={{ fontSize: "1.6rem" }} />
            </a>
          )}
          {!user && (
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
          ? `По запросу ${searchText} найдено ${cnt} позиций`
          : ""}
      </div>
    </>
  );
};
