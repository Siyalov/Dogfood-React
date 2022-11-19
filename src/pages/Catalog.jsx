import React from "react";
import Card from "../components/Card";
import AdCard from "../components/AdCard";

export default ({ goods, api, setFav }) => {
   // const myLikes = goods.filter((e) => e.likes.includes(user._id));
   // console.log(myLikes.length, myLikes)
   return <div className="cards-container">
      {goods?.length > 0 ?
         goods.map((d, i) => {
            return <>
               {i % 8 == 0 ?
                  <AdCard
                     key={'ad' + i}
                     text={<>
                        <h2>Подарок за<br />первый заказ!</h2>
                        <span>{d.name}</span>
                     </>}
                     img={d.pictures}
                     cardColor={`rgba(${Math.random() * 256},${Math.random() * 256},${Math.random() * 256}, 0.6)`}
                  /> : ''}
               <Card
                  key={i}
                  {...d}
                  api={api}
                  setFav={setFav}
               />
            </>
         })
         : <p key='empty' style={{ gridColumnEnd: "span 4", textAlign: "center" }}>Для отображения данных необходимо войти в приложение</p>
      }
   </div>
}