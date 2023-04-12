// import {GET_VIDEOGAMES} from './action-types';



const initialState = {
    videogames: [],          //Para guardar acá los filtrados y q me los muestre
    allVideogames: [],       //Para q siempre me muestre todos los videogames
    genres:[],
    detail: [],               //Es un array de objetos,  tienen propiedades id y name.
    // backendResponse: "Ready to create your own videogame?",     //Lo agregué para guardar las rtas del backend si algo falla
}

const Rootreducer= (state = initialState, action)=>{
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }
        case 'FILTER_BY_GENRE':
            const allVideogames=state.allVideogames;
            let genreFiltered=[];
            if(action.payload==='All') {
                genreFiltered=allVideogames;
            } else {
                genreFiltered=allVideogames.filter(v=>v.genres.find(e=>e.name===action.payload))
            }
            return {
                ...state,
                videogames: genreFiltered
            }
        case 'FILTER_CREATED':
            const allVideogamesii=state.allVideogames;
            const createdFilter= action.payload==='Created' ? allVideogamesii.filter(v=>v.createdInDB) : allVideogamesii.filter(v=>!v.createdInDB)
// console.log(allVideogamesii)         
// console.log(createdFilter)
            return {
                ...state,
                videogames: action.payload==='All' ? allVideogamesii : createdFilter
            }
            case 'SORT_BY_NAME':
                let sortedArr= action.payload==='nameA-Z'
                ? state.videogames.sort(function(a,b) {
                    if(a.name>b.name){
                        return 1;
                    }
                    if(b.name>a.name){
                        return -1;
                    }
                    return 0
                })
                : state.videogames.sort(function(a,b) {
                    if(a.name>b.name){
                        return -1;
                    }
                    if(b.name>a.name){
                        return 1;
                    }
                    return 0
                })
            return {
                ...state,
                videogames: sortedArr
            }
        case 'SORT_BY_RATING':
            let sortedArrByRating= action.payload==='rating1-5'
                ? state.videogames.sort(function(a,b) {
                    if(a.rating>b.rating){
                        return 1;
                    }
                    if(b.rating>a.rating){
                        return -1;
                    }
                    return 0
                })
                : state.videogames.sort(function(a,b) {
                    if(a.rating>b.rating){
                        return -1;
                    }
                    if(b.rating>a.rating){
                        return 1;
                    }
                    return 0
                })
            return {
                ...state,
                videogames: sortedArrByRating
            }
        case 'GET_NAME_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload
            }

    //SELENE DIJO Q EL POST NO HACE NADA PORQUE VA A CREARLO EN UNA RUTA NUEVA. Ella hizo q el return sea igual q el de default: Solamente devolver la copia de state (...state).
    //PODRIA ENTONCES NO PONERLO, Y Q ENTRE EN EL "DEFAULT" Y LISTO, NO?
        case 'POST_VIDEOGAME':
            return {
                ...state,
            }

        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }
        case 'CLEAR_DETAIL':
            return {
                ...state,
                detail: []
            }

        default:
            return {
                ...state
            }         
    }
}

export default Rootreducer;