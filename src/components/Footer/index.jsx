import React from "react";
import Logo from "../Logo";
import "./style.css";

export default () => {
  return (
    <footer>
      <Logo />
      <span className="copy">
        &copy;{new Date().getFullYear()}
        DogFood.ru
      </span>
      <a href="">1.Reiciendis</a>
      <a href="">2.Reiciendis</a>
      <a href="">3.Reiciendis</a>
      <a href="">4.Reiciendis</a>
      <a href="">5.Reiciendis</a>
      <a href="">6.Reiciendis</a>
      <a href="">7.Reiciendis</a>
      <a href="">8.Reiciendis</a>
      <div className="contacts">
        <p>Мы на связи</p>
        <a href="tel:+79117118811">+7(911)711-88-11</a>
        <nav>
          <a href="">
            <i className="fa-brands fa-vk"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-odnoklassniki"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-telegram"></i>
          </a>
        </nav>
      </div>
    </footer>
  );
};
