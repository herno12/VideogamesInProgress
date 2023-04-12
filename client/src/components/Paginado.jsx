import React from "react";
import style from "./Paginado.module.css"

// CAMBIARLE NOMBRE A INGLES: Paginating
export default function Paginado({videogamesPerPage, allVideogames, paginado, currentPage}){
    const pageNumbers= [];
    //Con el "for" q está abajo, determino cuántas Pages van a ser necesarias para mostrar todos los videogames, teniendo en cuenta cuántos tengo q mostrar por Page. Y me guardo en el array "pageNumbers" los números consecuticos del 0 a la cantidada de Pages. Si fueran 5 Pages, me queda entonce1 el array: [1,2,3,4].

// SELENE HIZO EL FOR ASI, PERO PARA MI ESTA MAL:
    // for(let i=0; i<=Math.ceil(allVideogames/videogamesPerPage); i++){ 
    //     pageNumbers.push(i+1) // "i+1" para q el paginado arranque en 1 y no en 0.
    // }

    for(let i=1; i<=Math.ceil(allVideogames/videogamesPerPage); i++){ 
        pageNumbers.push(i)
    }
    
    // console.log(currentPage);

    return (
        <nav>
            <div className={style.container}>
            <p>
                    <a onClick={()=>currentPage>1 ? paginado(currentPage-1) : paginado(currentPage)}>prev</a>
                </p>
                {pageNumbers && pageNumbers.map(number=>(
                    <p key={number} className={currentPage===number? style.currentPage : ''}>
                    <a onClick={()=>paginado(number)}>{number}</a>
                </p>
                ))}
                <p>
                    <a onClick={()=>pageNumbers[pageNumbers.length-1]===currentPage ? paginado(currentPage) : paginado(currentPage+1)}>next</a>
                </p>
            </div>
        </nav>
    )

}

