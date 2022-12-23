import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

import Product from "./pages/Product";
import Catalog from "./pages/Catalog";
import ShoppingCart from "./pages/ShoppingCart";
import Main from "./pages/Main";
import Profile from "./pages/Profile";

import Api from "./Api.js";
import Local from "./Local";
import { path, defaultToken } from "./settings";
import { useContext } from "react";

/** @typedef {import('./typings').DogFoodContext} DogFoodContext */
/** @typedef {import('./typings').Product} Product */
/** @typedef {import('./typings').NewProduct} NewProduct */
/** @typedef {import('./typings').User} User */
/** @typedef {import('./typings').UserAuthorization} UserAuthorization */

/** @type {React.Context<DogFoodContext>} */
const Context = React.createContext({});

const App = () => {
  /** @type {[ Product[], React.Dispatch<React.SetStateAction<Product[]>> ]} */
  const [goods, setGoods] = useState([]);
  /** @type {[ string, React.Dispatch<React.SetStateAction<string>> ]} */
  const [token, setToken] = useState(Local.getItem("shop-user"));
  /** @type {[ User, React.Dispatch<React.SetStateAction<User>> ]} */
  const [user, setUser] = useState(Local.getItem("user", true));
  /** @type {[ Product[], React.Dispatch<React.SetStateAction<Product[]>> ]} */
  const [favorites, setFavorites] = useState([]);
  /** @type {[ Product[], React.Dispatch<React.SetStateAction<Product[]>> ]} */
  const [products, setProducts] = useState([]);
  /** @type {[ Array<{ product: Product, count: number }>, React.Dispatch<React.SetStateAction< Array<{ product: Product, count: number }> >> ]} */
  const [cart, setCart] = useState([]);
  const [searchText, search] = useState("");
  const [cartLength, setCartLength] = useState(0);
  const [popupActive, changePopupActive] = useState(false);
  const [api, setApi] = useState(new Api(token || defaultToken));

  /**
   * @param {Product} product 
   * @param {number} count 
   */
  function addToCart(product, count) {
    let productInCart = false;
    for (const el of cart) {
      if (el.product._id === product._id) {
        el.count += count;
        productInCart = true;
        if (el.count <= 0) {
          cart.splice(cart.indexOf(el), 1);
        }
        break;
      }
    }
    if (!productInCart && count > 0) {
      cart.push({ product, count });
    }
    setCart([...cart]);
  }

  useEffect(() => {
    api.token = token;
  }, [token]);

  useEffect(() => {
    if (!token) {
      api.token = defaultToken;
      setUser({});
    }

    api.getProducts().then((data) => {
      setGoods(data.products || []);
    });

    api.showProfile().then((data) => {
      if (!data._id) {
        setToken("");
        api.token = defaultToken;
        setUser({});
      }
    });
  }, []);

  useEffect(() => {
    const favorites = goods.filter((product) => product.likes.includes(user._id));
    setFavorites(favorites);
  }, [goods]);

  useEffect(() => {
    const filteredProducts = goods.filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase()));
    setProducts(filteredProducts);
  }, [goods, searchText]);

  useEffect(() => {
    let length = 0;
    for (const el of cart) {
      length += el.count;
    }
    setCartLength(length);
  }, [cart]);

  return (
    <Context.Provider
      value={{
        products,
        setProducts,

        searchText,
        search,

        user,
        setUser,

        cart,
        setCart,
        cartLength,
        setCartLength,
        addToCart,
        
        favorites,
        setFavorites,

        api,
        setApi,
      }}
    >
      <div className="wrapper">
        <Header
          openPopup={changePopupActive}
          setToken={setToken}
        />
        <div className="content-body">
          <Routes>
            <Route
              path={path}
              element={<Catalog />}
            />
            <Route
              path={path + "favorites"}
              element={<Main />}
            />
            <Route
              path={path + "product/:id"}
              element={<Product />}
            />
            <Route path={path + "profile"} element={<Profile />} />
            <Route
              path={path + "shoppingCart"}
              element={<ShoppingCart />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
      {!token && (
        <Modal
          isActive={popupActive}
          changeActive={changePopupActive}
          setToken={setToken}
        />
      )}
    </Context.Provider>
  );
};

export { App, Context };
