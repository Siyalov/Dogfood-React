import React, { useContext } from "react";
import Card from "../components/Card";
import AdCard from "../components/AdCard";
import { Context } from "../App";

export default function Catalog() {
  const { products, user, addToCart } = useContext(Context);
  return (
    <>
      <div className="cards-container">
        {products?.length > 0 ? (
          products.map((product, index) => {
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
                  product={product}
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
