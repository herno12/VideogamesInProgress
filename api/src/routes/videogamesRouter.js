const axios = require('axios');
const videogamesRouter = require('express').Router();
const {API_KEY} = require('../db');
const {getAllVideogames,getApiVideogames,getDbVideogames,videogamesFilteredByName,getApiVideogameDetails,postVideogame} = require('../controllers/videogamesControllers');
const {Videogame, Genre} = require('../db');

 



// HECHO.
//📍 GET | /videogames/name?="..."
// Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query.
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el videojuego, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.

// Si tengo tiempo, mejorar esto para qno haya tanto código repetido.

videogamesRouter.get('/', async (req,res)=>{
    try {
        const {name} = req.query;

            const response1= await axios(`https://api.rawg.io/api/games?page_size=25&page=1&key=${API_KEY}`);
            const data1 = response1.data.results;
            const allVideogames1= await getApiVideogames(data1);
    
            const response2= await axios(`https://api.rawg.io/api/games?page_size=25&page=2&key=${API_KEY}`);
            const data2 = response2.data.results;
            const allVideogames2= await getApiVideogames(data2);
    
            const response3= await axios(`https://api.rawg.io/api/games?page_size=25&page=3&key=${API_KEY}`);
            const data3 = response3.data.results;
            const allVideogames3= await getApiVideogames(data3);
    
            const response4= await axios(`https://api.rawg.io/api/games?page_size=25&page=4&key=${API_KEY}`);
            const data4 = response4.data.results;
            const allVideogames4= await getApiVideogames(data4);
    
            const allApiVideogames=[...allVideogames1,...allVideogames2,...allVideogames3,...allVideogames4]
    
            const allDbVideogames= await getDbVideogames();
    
            const allVideogames= [...allDbVideogames,...allApiVideogames];

//Si me pasan name por query:
        if(name){
            let videogameName= videogamesFilteredByName(name, allVideogames);
// console.log(name)
            // videogameName.length ?
            // res.status(200).json(videogameName) :
            // res.status(404).json({error: 'Videogame not found'});
            if(videogameName.length){
                if (videogameName.length>15){
                    res.status(200).json(videogameName.slice(0,16))
            } else {
                res.status(200).json(videogameName)
            }
//No hay videogameName:
            } else {
                res.status(404).json({error: 'Videogame not found'});
            }
//Si no me pasan name por query:
        } else{
            res.status(200).json(allVideogames);
        }     
    } catch (error) {
        res.status(400).json({error: error.message});    
    }
});





// La ruta GET por ID utilizada para mostrar el detalle de cada elemento debe traer sólo los datos pedidos en la ruta de detalle (según lo indicado en el README).
// 📍 GET | /videogames/:idVideogame
// Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego.
// El videojuego es recibido por parámetro (ID).
// Tiene que incluir los datos del género del videojuego al que está asociado.
// Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.



videogamesRouter.get('/:idVideogame', async (req,res)=>{
    
    const {idVideogame} = req.params;

    //Buscar en API:
    try {
        const response= await axios(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
        const details = response.data;
        const apiVideogameDetails= getApiVideogameDetails(details)
        res.status(200).json(apiVideogameDetails)
        
    } catch (err) {
        if (err){
            try {
                const dbVideogameDetails= await Videogame.findByPk(idVideogame,{
                    include: {
                        model: Genre,
                        attributes:['name'],
                        through:{
                            attributes: [],
                        }
                    }})
                res.status(200).json(dbVideogameDetails)
            } catch (erro) {
                res.status(404).json(erro)   
            }
        }    
    }
})





// Para traer los details, había hecho q filtre en el toal de games x id. PEEERO, resulta q en el total de games, no está la propiedad "description", así q voy a tener q hacer q llame a la API x id.
// videogamesRouter.get('/:idVideogame', async (req,res)=>{

//     try {
//         const {idVideogame} = req.params;
//         const response= await axios(`https://api.rawg.io/api/games?key=${API_KEY}`);
//         const data = response.data.results;
//         const allVideogames= await getAllVideogames(data);
        
//             let videogameDetails= getVideogameDetailsById(idVideogame, allVideogames);
//             videogameDetails.length ?
//             res.status(200).json(videogameDetails) :
//             res.status(404).json({error: 'ID not found'});    
//     } catch (error) {
//         res.status(404).json({error: error.message});    
//     }
    
//     })



//ME FALTA HACER Q BUSQUE EN LA API ANTES DE AGREGARLO.
//         📍 POST | /videogames
// Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados.
// Toda la información debe ser recibida por body.
// Debe crear un videojuego en la base de datos, y este debe estar relacionado con sus géneros indicados (al menos uno):
// await newVideogame.addGenres(genres) --> LO HICE EN EL CONTROLLER.


videogamesRouter.post('/',async (req,res)=>{
    try {
       const {name,description,platforms,background_image,released,rating,genres} = req.body;
        // console.log(name)
        // console.log(description)
        // console.log(background_image)
        // console.log(released)
        // console.log(rating)
        // console.log(genres)
        // console.log(platforms)

        if (!name || !description || platforms.length<1 || !background_image || !released || !rating || genres.length<1){ 
            throw new Error('Information missing. Please provide all the required information');
        } else {
            //Antes de crearlo, me fijo si ya existe en la API o en l db:
            const response= await axios(`https://api.rawg.io/api/games?key=${API_KEY}`);
            const data = response.data.results;
            const apiVideogames= await getApiVideogames(data);
            const dbVideogames= await getDbVideogames();
            const allVideogames= [...dbVideogames,...apiVideogames]
            let videogameName= videogamesFilteredByName(name, allVideogames);
            if(videogameName.length>0){
                res.status(400).json('Error: Videogame already in API or created by user');
             }else {         
                    const newVideogame= await postVideogame(name,description,platforms,background_image,released,rating,genres);
                    res.status(200).json('Videogame created succesfully');
                    // res.status(200).json(`New videogame ${newVideogame.name} has been created succesfully`);
        }
        
        }
    } catch (error) {
        res.status(404).json(error.message);
        // res.status(404).json({error: error.message});   
    }
})




module.exports=videogamesRouter;