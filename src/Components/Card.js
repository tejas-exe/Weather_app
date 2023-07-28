import React from "react";
import style from "./Card.module.css";

const Card = (props) => {
   console.log("==>",props); 
  return <div className={style.container}>{props.children}</div>;
};

export default Card;
