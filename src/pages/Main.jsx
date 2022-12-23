import React from "react";
import Api from "../Api";
import Card from "../components/Card";

/** @typedef {import('../typings').Product} Product */
/** @typedef {import('../typings').NewProduct} NewProduct */
/** @typedef {import('../typings').User} User */
/** @typedef {import('../typings').UserAuthorization} UserAuthorization */

/**
 * @param {Object} opts
 * @param {Product[]} opts.goods
 * @param {Api} opts.api
 * @param {React.Dispatch<React.SetStateAction<Product[]>>} opts.setFav
 * @param {User} opts.user
 */
export default function Main({ goods, api, setFav, user }) {
  return (
    <>
      <h1>
        <center>Любимые продукты</center>
      </h1>
      <div className="cards-container">
        {goods?.map((d, i) => (
          <Card
            key={d._id}
            {...d}
            api={api}
            setFav={setFav}
            userId={user?._id}
          />
        ))}
      </div>
    </>
  );
};
