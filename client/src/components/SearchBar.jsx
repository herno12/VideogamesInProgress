import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameVideogames } from '../actions';
import style from "./SearchBar.module.css";

export default function SearchBar (){
    const dispatch = useDispatch();
    const [name, setName]=useState('');

    function handleInputChange(event){
        // event.preventDefault(); // ME PARACE Q ESTO NO VA.
        setName(event.target.value);
// console.log(name); Lo recibe ok.
    }

    function handleSubmit (event){
        event.preventDefault();
        dispatch(getNameVideogames(name))
        setName(''); //PARA Q SE LIMPIE EL INPUT DSPS DE CLICKEAR
    }

    return (
        <div>
            
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Search by name...' value={name} onChange={event=>handleInputChange(event)}  />
            <button type='submit'>Search</button>

        </form>
            
        </div>
    )

}


// ASI HIXO EL RETURN SELSENE:
// return (
//     <div>
        
//     {/* <form> */}
//         <input type='text' placeholder='Search by name...' value={name} onChange={event=>handleInputChange(event)}  />
//         <button type='submit' onClick={event=>handleSubmit(event)}>Search</button>

//     {/* </form> */}
        
//     </div>
// )

// }
