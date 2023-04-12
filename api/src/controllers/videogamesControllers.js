const {Videogame, Genre} = require('../db');

//DIVIDI EN 3 FUNCIONES:
//1 Busca en API, da formato y crea Array
//3 Busca en DB


const getApiVideogames = async (data) =>{
    let allApiVideogames=[];
    //si funciona bien, dsps veo si le puedo aplicar destructuring
    data.forEach((videogame)=>{
        let simplifiedVideogame= {
            id: videogame.id,
            name: videogame.name,
            description: videogame.description,
            background_image: videogame.background_image,
            released: videogame.released,
            rating: videogame.rating,
            platforms: videogame.platforms.map((platform)=>platform.platform.name), //mapeo para quedare solo con las propiedades que me interesan
            genres: videogame.genres.map(g=>g={name:g.name}) //mapeo para quedare solo con las propiedades que me interesan
            
        }
        allApiVideogames.push(simplifiedVideogame);
    })
    return allApiVideogames;
    }


    const getDbVideogames=async()=>{
        const allDbVideogames= await Videogame.findAll({
            include: {
                model: Genre,
                attributes:['name'],
                through:{
                    attributes: [],
                }
            }
        });
        return allDbVideogames;
    }
    







    const videogamesFilteredByName=(name, allVideogames) =>{
        let videogameName= allVideogames.filter(videogame=>videogame.name.toLowerCase().includes(name.toLowerCase()));
        return videogameName;   
    }
    

    






    const getApiVideogameDetails = (details) =>{
    //si funciona bien, dsps veo si le puedo aplicar destructuring
    let apiVideogameDetails= {
        id: details.id,
        name: details.name,
        description: details.description,
        background_image: details.background_image,
        released: details.released,
        rating: details.rating,
        platforms: details.platforms.map((p)=>p.platform.name), //mapeo para quedare solo con las propiedades que me interesan
        genres: details.genres.map(g=>g={name:g.name}) //mapeo para quedare solo con las propiedades que me interesan
    }    
    return apiVideogameDetails
    };


//ORIGINAL:
//Busca los videogames de la API, les da formato y los pone en un array,
//Buscalosvideogames de la DB y los pone en u array,
//Une los arrays de videogames de API y DB,

// const getAllVideogames = async (data) =>{
//     let allVideogamesApi=[];
//     //si funciona bien, dsps veo si le puedo aplicar destructuring
//     data.forEach((videogame)=>{
//         let simplifiedVideogame= {
//             id: videogame.id,
//             name: videogame.name,
//             description: videogame.description,
//             background_image: videogame.background_image,
//             released: videogame.released,
//             rating: videogame.rating,
//             platforms: videogame.platforms.map((platform)=>platform.platform.name), //mapeo para quedare solo con las propiedades que me interesan
//             genres: videogame.genres.map(g=>g={name:g.name}) //mapeo para quedare solo con las propiedades que me interesan
            
//         }
//         allVideogamesApi.push(simplifiedVideogame);
//     })
//     const allVideogamesDb= await Videogame.findAll({
//         include: {
//             model: Genre,
//             attributes:['name'],
//             through:{
//                 attributes: [],
//             }
//         }
//     });
//     let allVideogames= [...allVideogamesDb,...allVideogamesApi];
//     return allVideogames;
//     }

//     // ASI ERA ORIGINALMENTE (ante de notar q los "genres" me aparecen muy raro cuando traugo allVideoames en la Home)
//     // const getAllVideogames = async (data) =>{
//     //     let allVideogamesApi=[];
//     //     //si funciona bien, dsps veo si le puedo aplicar destructuring
//     //     data.forEach((videogame)=>{
//     //         let simplifiedVideogame= {
//     //             id: videogame.id,
//     //             name: videogame.name,
//     //             description: videogame.description,
//     //             background_image: videogame.background_image,
//     //             released: videogame.released,
//     //             rating: videogame.rating,
//     //             platforms: videogame.platforms.map((platform)=>platform.platform.name), //mapeo para quedare solo con las propiedades que me interesan
//     //             genres: videogame.genres.map(g=>g={name:g.name}) //mapeo para quedare solo con las propiedades que me interesan
                
//     //         }
//     //         allVideogamesApi.push(simplifiedVideogame);
//     //     })
//         // const allVideogamesDb= await Videogame.findAll({
//         //     include: {
//         //         model: Genre,
//         //         attributes:['name'],
//         //         through: [],
//         //     }
//     //     });
//     //     let allVideogames= [...allVideogamesDb,...allVideogamesApi];
//     //     return allVideogames;
//     //     }

//     const videogamesFilteredByName=(name, allVideogames) =>{
//         let videogameName= allVideogames.filter(videogame=>videogame.name.toLowerCase().includes(name.toLowerCase()));
//         return videogameName;   
//     }
    

    
//     const getApiVideogameDetails = (details) =>{
//     //si funciona bien, dsps veo si le puedo aplicar destructuring
//     let apiVideogameDetails= {
//         id: details.id,
//         name: details.name,
//         description: details.description,
//         background_image: details.background_image,
//         released: details.released,
//         rating: details.rating,
//         platforms: details.platforms.map((p)=>p.platform.name), //mapeo para quedare solo con las propiedades que me interesan
//         genres: details.genres.map(g=>g={name:g.name}) //mapeo para quedare solo con las propiedades que me interesan
//     }    
//     return apiVideogameDetails
// };

// const allVideogamesDb= await Videogame.findAll({
    // include: {
    //     model: Genre,
    //     attributes:['name'],
    //     through:{
    //         attributes: [],
//         }
//     }
// });






//TENGO Q SACAR "createdInDB" DEL CONTROLLER?? ME PARECE Q SI... Y DE "videogameRouter"??? ME PARECE Q TAMBIEN...
const postVideogame= async (name,description,platforms,background_image,released,rating,genres)=>{
    const newVideogame= await Videogame.create({
        name,
        description,
        platforms,
        background_image,
        released,
        rating
    });
    let genresDb= await Genre.findAll({
        where: {name: genres} //ME PARECE Q ACÁ ESTÁ EL PROBLEMA!! genres VIENE COMO UN ARRAY. ESTA ES LA FORMA CORRECTA DE PONERLO??
    })
// console.log(genresDb);
    await newVideogame.addGenres(genresDb); //agrega los géneros del videogame (con esto completa la tabla intermedia)
    return newVideogame;
}


module.exports={
    getApiVideogames,
    getDbVideogames,
    getApiVideogameDetails,
    videogamesFilteredByName,
    postVideogame,
}