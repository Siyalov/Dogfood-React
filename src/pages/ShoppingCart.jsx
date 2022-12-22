import React from "react";

export default function ShoppingCart({ cart }) {
  return (
    <>
      {cart.map((el) => (
        <div>
          {el.product.name}
          {el.count}
        </div>
      ))}
    </>
  );
}
