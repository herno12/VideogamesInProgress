import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getDetail, clearDetail} from "../actions/index";
import style from "./Detail.module.css";


export default function Detail(props){
// console.log(props)
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
        return ()=> dispatch(clearDetail())
    },[dispatch])

    const myVideogame= useSelector((state)=>state.detail)

// console.log(myVideogame)

    return (
        <div className={style.container}>

        <div className={style.card}>
            

            {
                Object.keys(myVideogame).length>0 ?
                <div>
                    <h1>{myVideogame.name}</h1>
        
                    <img src={myVideogame.background_image} alt="image not found" className={style.image}/>
                    
                        
                    <p>{myVideogame.createdInDB? myVideogame.description : myVideogame.description.slice(3,-4)}</p>
                    <h2>Rating: {myVideogame.rating}</h2>
                    <h3>Genres: {myVideogame.genres.map(p=>('•')+p.name)}</h3>
                    {/* Me trae el array de Platforms */}
                    <h3>Platforms: {myVideogame.platforms.map(p=>('•')+p)}</h3>
                    <h5>Release Date: {myVideogame.released}</h5>
                    <h5>ID: {myVideogame.id}</h5>            
                </div>
                : <p>Loading...</p>
                
            }

        </div>
            <br />

            <Link to= "/home">
                <button>Back to All Videogames</button>
            </Link>
            <br />
            <br />


            </div>
    )
}