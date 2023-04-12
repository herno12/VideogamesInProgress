const axios = require('axios');
const genresRouter = require('express').Router();
const {API_KEY} = require('../db');
const {getAllGenres} = require('../controllers/genresControllers');



//HECHO 
//📍 GET | /genres
// Obtiene un arreglo con todos los géneros existentes de la API.
// En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los géneros que encuentres en la API.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.
genresRouter.get('/',async (req,res)=>{
    try {
        const response= await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const data = response.data.results;
        const allGenres= await getAllGenres(data);
        res.status(200).json(allGenres);

    } catch (error) {
        res.status(400).json({error: error.message});
    }
})







module.exports=genresRouter;