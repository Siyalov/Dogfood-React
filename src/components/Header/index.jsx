import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo"
import { BoxArrowInRight, BoxArrowLeft } from "react-bootstrap-icons";
import "./style.css";
import { ReactComponent as FavIcon } from './img/ic-favorites.svg'
import { ReactComponent as CartIcon } from './img/ic-cart.svg'
import { ReactComponent as ProfileIcon } from './img/ic-profile.svg'
import xmasTree from "./img/xmas-tree.png";
import { useNavigate } from "react-router-dom";
import { path } from "../../settings";

let t = '';
if (document.body.classList.contains('xmas')) {
   t = require('../../assets/xmas-audio').default;
}

export default ({ products, update, openPopup, user, setToken, setUser, likes }) => {
   const navigate = useNavigate();
   const [text, changeText] = useState("");
   const [cnt, setCnt] = useState(0);
   const handler = e => {
      changeText(e.target.value);
      const result = products.filter((el => el.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1));
      setCnt(result.length);
      if (!text) {
         update(products);
      } else {
         update(result);
      }
   }
   const logout = e => {
      e.preventDefault();
      localStorage.removeItem("shop-user");
      localStorage.removeItem("user");
      setToken("");
      setUser({});
      navigate(path);
   }

   return <>
      <header>
         <Logo />
         {document.body.classList.contains('xmas') ?
            <>
               <audio loop={true} autoPlay={true} id="xmas_audio" >
                  <source src={t} />
               </audio>
               <span className="xmas__tree" onClick={() => {
                  if (xmas_audio.paused) {
                     xmas_audio.play();
                     document.body.classList.add('xmas');
                  } else {
                     xmas_audio.pause();
                     document.body.classList.remove('xmas');
                  }
               }}><img height={64} src={xmasTree} /></span>
            </>
            : ''}
         <input type="search" value={text} onChange={handler} />
         <nav>
            {user && <Link to={path + "favorites"}><FavIcon /><span>{likes}</span></Link>}
            {user && <Link to={path}><CartIcon /></Link>}
            {user && <Link to={path + "profile"}><ProfileIcon /></Link>}
            {user && <a href="" onClick={logout}><BoxArrowLeft style={{ fontSize: "1.6rem" }} /></a>}
            {!user && <a href="" onClick={e => { e.preventDefault(); openPopup(true) }}><BoxArrowInRight style={{ fontSize: "1.6rem" }} /></a>}
         </nav>
      </header>
      <div>
         {/* {text ? `По запросу ${text} найдено ${cnt} позиций` : "Поиск..."} */}
      </div>
   </>
}