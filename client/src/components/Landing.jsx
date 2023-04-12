import React from "react";
import {Link} from 'react-router-dom';
import style from "./Landing.module.css";


    export default function LandingPage(){
    return (
        <div className={style.container}>
                   
            <h1 className={style.h1}>Welcome</h1>
                <div>
            <Link to='/home'>
                <button className={style.button}>Come on in!</button>
            </Link>
                </div>        
        </div>
    )
}