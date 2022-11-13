
import React from "react";
import logo from './img/logo.svg'
import miniLogo from './img/mini-logo.svg'
import "./style.css"


export default () => {
   return <a className="logo" href="">
      <img src={logo} alt="Dog Food" className="full-logo" />
      <img src={miniLogo} alt="Dog Food" className="small-logo" />
   </a>
}
