import React,{useContext, useState} from "react";
import Card from "../components/Card";
import AdCard from "../components/AdCard";
import {Context}  from "../App";  


export default ({ goods, api, setFav, user, addToCart}) => {
   const { searchText, products } = useContext(Context);       
       
   console.log(searchText)
   // const myLikes = goods.filter((e) => e.likes.includes(user._id));
   // console.log(myLikes.length, myLikes)
   console.log(user._id)
   return <>
      {/* <div className="main-page-header">
         <div className="h-wrapper">
            <h1><b>Крафтовые лакомства для собак</b></h1>
            <h4>Всегда свежие лакомства ручной работы с доставкой по России и миру</h4>
         </div>
      </div> */}
      <div className="cards-container">
         {goods?.length > 0 ?
            goods.map((d, i) => {
               return <>
                  {i % 8 == 0 && !user?._id ?
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
                     userId={user?._id}
                     addToCart={() => addToCart(d, 1)}
                  />
               </>
            })
            : <p key='empty' style={{ gridColumnEnd: "span 4", textAlign: "center" }}>Для отображения данных необходимо войти в приложение</p>
         }
      </div>
   </>
}