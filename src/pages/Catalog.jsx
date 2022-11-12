import React from "react";
import Card from "../components/Card";

import AdCard from "../components/AdCard";

export default ({ goods }) => {
   return <div className="cards-container">
      {goods.map((d, i) => {
         return <>
            {i % 8 == 0 ? <AdCard text={<>
               <h2>Подарок за<br />первый заказ!</h2>
               <span>{d.name}</span>
            </>} img={d.pictures} /> : ''}
            <Card
               key={i}
               img={d.pictures}
               text={d.name}
               price={d.price}
            />
         </>
      })}
   </div>
}