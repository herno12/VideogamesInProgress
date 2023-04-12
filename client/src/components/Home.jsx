import React from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { getVideogames, filterVideogamesByGenre, filterCreated, sortByName, getNameVideogames, sortByRating } from "../actions";
import {Link} from 'react-router-dom';
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import style from "./Home.module.css"


const Home = ()=>{

    
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getVideogames())
    },[dispatch]); 
//???? El [dispatch] hace q vuelva a buscar todos los videogames antes de hacer cualquier otro dispatch?? Ej: se hizo un filtrado y ahora se pide un ordenamiento (sort). Antes de hacer el sort, vuelve a buscad todos los videogames, y hace el sort sobre el total de videogames (no sollo sobre los filtrados). Es así???
    

    const allVideogames = useSelector((state)=>state.videogames); 

// console.log(allVideogames);
    

    const genreList= ["Action","Indie","Adventure","RPG","Strategy","Shooter","Casual","Simulation","Puzzle","Arcade","Platformer","Racing","Massively Multiplayer","Sports","Fighting","Family","Board Games","Educational","Card"]


    //Estados locales para Paginado:
    const [currentPage, SetCurrentPage]= useState(1);
    const [videogamesPerPage, SetVideogamesPerPage]= useState(15);
    const indexOfLastVideogame= currentPage * videogamesPerPage;
    const indexOfFirstVideogame= indexOfLastVideogame - videogamesPerPage;
    const currentVideogames= allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
    const paginado= (pageNumber)=>{
        SetCurrentPage(pageNumber)
    }
    
    //Estado local para sorting:
    const [sort, setSort]=useState('');

//Handles:
    const handleClick =(event)=>{
        event.preventDefault(); //ME PARECE Q NO ES NECESARIO EN ESTE CASO! Tengo entendido q es solo para el onSubmit q se pone en el Form.
        dispatch(getVideogames());
    }

    const handleFilterGenre = (event)=>{
// console.log(event.target.value); Ctrolo q está recibiendo el event ok.
        dispatch(filterVideogamesByGenre(event.target.value))
    }

    const handleFilterCreated = (event) =>{
        dispatch(filterCreated(event.target.value))
    }

    const handleSortName = (event) =>{
        dispatch(sortByName(event.target.value))
        SetCurrentPage(1);  //Para q antes de ordenar, vaya a la pagina 1. Asi me aseguro de q ordena todo.
        setSort(`Sorted: ${event.target.value}`);  //NO ME QUEDÓ MUY CLARO PORQUÉ HACE ESTO ASÍ... SELENE LO EXPLICA EN CLASE 03 1:15:00.
    }

    const handleSortRating = (event)=>{
        dispatch(sortByRating(event.target.value))
        SetCurrentPage(1);  //Para q antes de ordenar, vaya a la pagina 1. Asi me aseguro de q ordena todo.
        setSort(`Sorted: ${event.target.value}`);  //NO ME QUEDÓ MUY CLARO PORQUÉ HACE ESTO ASÍ... SELENE LO EXPLICA EN CLASE 03 1:15:00.
    }
// console.log(currentVideogames);

//INICIO RENDERIZADO:
    return (
        <div className={style.container}>
            <div>
            {/* SERIA CORRECTO "COMPONENTIZAR" MÁS ESTO: 
            // HACER OTRO COMPONENT "NavBar" y poner ahí la "SearchBar", el button "Reset Filter", button par Filtrar, button para Ordenar, Botones/Links de Paginado */}
            
            <h3><Link to= '/createvideogame'>Create Videogame</Link></h3>
            <h1>VIDEOGAMES</h1>

{/* SearchBar */}
            <SearchBar />
            <br />

{/* Filter por Género: */}
                <select onChange={(event)=>handleFilterGenre(event)}>
                    <option value='All'>All Genres</option>
                    {
                        genreList.map((g,i)=>{
                            return (
                                <option value={g} key={i}>{g}</option>
                                )
                            })
                        }
                </select>
                <select onChange={(event)=>handleFilterCreated(event)}>
                    
{/* Filter por Origen: Created */}                
                    <option value='All'>All Sources</option>
                    <option value='API'>API: RAWG</option>
                    <option value='Created'>Created By Users</option>
                </select>
                <br />

{/* Sort por Name */}
                <select onChange={(event)=>handleSortName(event)}>
                    <option value='nameA-Z'>Name A-Z</option> 
                    <option value='nameZ-A'>Name Z-A</option>
                </select>

{/* Ordenar por Rating */}
                <select onChange={handleSortRating}>
                    <option value='rating1-5'>Rating 1-5</option> 
                    <option value='rating5-1'>Rating 5-1</option>
                </select>
                <br />

{/* Button Reset */}
                <button onClick={event=>{handleClick(event)}}>Reset Filters</button> 
              
{/* PAGINADO: */}
                <div className={style.pag}>
                <Paginado videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} paginado={paginado} currentPage={currentPage} />
                </div>

{/* CARDS: */}
                <div className={style.cards}>
                {
                    currentVideogames?.map((v,i)=>{
                        return (
                            <Link to={`/home/${v.id}`}>
                                    <Card name={v.name} background_image={v.background_image} genres={v.genres.map((g)=>'•'+g.name)} key={i} />
                                </Link>
                        )
                    })
                }
                </div>         
            </div>
        </div>
    )
}


export default Home;