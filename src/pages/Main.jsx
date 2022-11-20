import React from "react";
import Card from "../components/Card";

export default ({ goods, api, setFav }) => {
   // { myLikes?.length > 0 }
   return <>
      <h1>Главная страница</h1>
      <div className="cards-container">
         {goods?.map((d, i) => <Card
            key={d._id}
            {...d}
            api={api}
            setFav={setFav}
         />)}
      </div>
   </>
}