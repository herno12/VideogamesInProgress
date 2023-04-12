import React from 'react';
import style from "./Card.module.css";

const Card = ({name, background_image, genres})=>{
    return (
        <div className={style.card}>
            <h3>{name}</h3>
            <h5>{genres}</h5>
            <div >
                <img src={background_image} alt="image not found" className={style.image}/> 
                {/* <img src={background_image} alt="image not found" width="200px" hight="250px" />  */}
            </div>
        </div>
    );
}

export default Card;