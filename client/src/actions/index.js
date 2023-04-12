import axios from 'axios';
import {GET_VIDEOGAMES} from './action-types';


export function getVideogames(){
    return async function(dispatch){
        let response = await axios('http://localhost:3001/videogames');
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: response.data
        })
    }
}



// // Pruebo primero si lo de arriba funciona bien. Si, anda, pruebo esta manera q es la q yo haría: 
// export const getVideogames = () => {
//         return async function(dispatch){ // acá interviene el thunk
//         const response = await axios('http://localhost:3001/videogames')
//         return dispatch({ type: GET_USERS, payload: response.data}) // el '.data' es porque axios nos retorna un objeto con muchas cosas y dentro de la propiedad 'data' econtramos la respuesta del servidor =)
//     }
// }


export function filterVideogamesByGenre(selectedGenre){
    return ({
        type: 'FILTER_BY_GENRE',
        payload: selectedGenre
    }
    )
}

export function filterCreated(data){
    return ({
        type: 'FILTER_CREATED',
        payload: data
    }
    )
}

export function sortByName(data){
    return ({
        type: 'SORT_BY_NAME',
        payload: data
    }
    )
}

export function sortByRating (data){
    return ({
        type: 'SORT_BY_RATING',
        payload: data
    }
    )
}


//ESTE FUNCIONA BIEN Y ME TRAE LOS ERRORES QUE ARMÉ EN EL BACK.
//COMPARAR CÓMO ESTÁ HECHO ESTE (y todo c lo q se conecta: ruta y controller) PARA VER LA DIERENCIA CON postVideogame (q n me trae los errores!)
export function getNameVideogames(name){
    return async function (dispatch){
        try {
            const response = await axios (`http://localhost:3001/videogames?name=${name}`);
            // console.log(response.data)
            return dispatch ({
                type: 'GET_NAME_VIDEOGAMES',
                payload: response.data
            })
            
        } catch (err) {
            // console.log(err)
            alert(err.response.data.error)  
        }
    }
}

export function getGenres(){
    return async function(dispatch){
        let response = await axios('http://localhost:3001/genres');
        return dispatch({
            type: 'GET_GENRES',
            payload: response.data
        })
    }
}

// // SELENE LO HIZO ASI, PERO POR QUE NO HACE DISPATC??
// //DICE Q NO HACE DISPATCH XQ VA A CREARLO EN UNA RUTA NUEVA...NO ENTENDI BIEN ESTO...
// export function postVideogame(input){
//     return async function(dispatch){
//         let response = await axios.post('http://localhost:3001/videogames', input);
//         return response;
//     }
// }


//ESTA VERSION CON FETCH:
//Me tira cuál es el error si no puede crear el Videogame (me lo trae del Back).
//Pruebo hacer la funcion "postVideogame(input)" c fetch a ver si me trae los errores q armé en el back:
// export function postVideogame (input){
//     return async function (dispatch){
//         try {
// // console.log(input)
//             const options= {
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 body:JSON.stringify(input)
//             }
//                 await fetch ('http://localhost:3001/videogames',options)

//             .then(res=>res.json())
//             .then(data=>dispatch({type: 'POST_VIDEOGAME', payload: data }))
            
//         } catch (err) {
//             console.log(err)
            
//         }
//     }
// }



//ESTA VERSION:
//Crea el vidogame si todo ok.
//No lo crea si falla algo, PEEERO no avisa nada (ni que no lo creó ni porqué. Lo bueno es no dice q lo haya creado, si no lo creó)
// export function postVideogame(input){
//     try {     
//         return async function(dispatch){
//             let response = await axios.post('http://localhost:3001/videogames',input);
//             return dispatch({
//                 type: 'POST_VIDEOGAME',
//                 payload: response.data
//             })
//         }
//     } catch (err) {
//         console.log(err)   
//     }
// }


export function postVideogame(input){
    return async function(dispatch){
        try {
            const response = await axios.post('http://localhost:3001/videogames',input);
            // console.log(response)
            alert(response.data)
            
            
        } catch (err) {
            // console.log(err)
            alert(err.response.data)
            
        }
    }
}


//FUNCIONA PERFECTO!:
// export function postVideogame(input){
//     return async function(dispatch){
//         try {
//             const response = await axios.post('http://localhost:3001/videogames',input);
//             return dispatch({
//                 type: 'POST_VIDEOGAME',
//                 payload: response.data
//             })
            
            
//         } catch (err) {
//             // console.log(err)
//             alert(err.response.data)
            
//         }
//     }
// }


export function getDetail(id){
try {
    return async function(dispatch){
        let response = await axios(`http://localhost:3001/videogames/${id}`);
        return dispatch({
            type: 'GET_DETAILS',
            payload: response.data
        })
    }
} catch (err) {
    alert(err.response.data)
}
}


export function clearDetail(){
    return ({
        type: 'CLEAR_DETAIL',
        payload: []
    }
    )
}