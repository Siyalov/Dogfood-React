import React, { useContext, useState } from "react";
import Card from "../components/Card";
import AdCard from "../components/AdCard";
import { Context } from "../App";
import Api from "../Api";

/** @typedef {import('../typings').Product} Product */
/** @typedef {import('../typings').NewProduct} NewProduct */
/** @typedef {import('../typings').User} User */
/** @typedef {import('../typings').UserAuthorization} UserAuthorization */

/**
 * @param {Object} opts
 * @param {Api} opts.api
 * @param {Array<Product>} opts.goods
 * @param {React.Dispatch<React.SetStateAction<Product[]>>} opts.setFav
 * @param {User} opts.user
 * @param {(product: Product, count: number) => void} opts.addToCart
 */
export default function Catalog({ goods, api, setFav, user, addToCart }) {
  const { searchText, products } = useContext(Context);
  return (
    <>
      <div className="cards-container">
        {goods?.length > 0 ? (
          goods.map((product, index) => {
            return (
              <>
                {index % 8 == 0 && !user?._id ? (
                  <AdCard
                    key={"ad" + index}
                    text={
                      <>
                        <h2>
                          Подарок за
                          <br />
                          первый заказ!
                        </h2>
                        <span>{product.name}</span>
                      </>
                    }
                    img={product.pictures}
                    cardColor={`rgba(${Math.random() * 256},${
                      Math.random() * 256
                    },${Math.random() * 256}, 0.6)`}
                  />
                ) : (
                  ""
                )}
                <Card
                  key={index}
                  {...product}
                  api={api}
                  setFav={setFav}
                  userId={user?._id}
                  addToCart={() => addToCart(product, 1)}
                />
              </>
            );
          })
        ) : (
          <p
            key="empty"
            style={{ gridColumnEnd: "span 4", textAlign: "center" }}
          >
            Для отображения данных необходимо войти в приложение
          </p>
        )}
      </div>
    </>
  );
};
