const {Genre} = require('../db');
const axios = require('axios');
const {API_KEY} = require('../db');


const getAllGenres= async (data)=>{
    const genresApi= data.map(genre=>genre.name); // Esto es una array con los names de los genres
    genresApi.forEach(genre=>{
        Genre.findOrCreate({
            where: {name: genre}
        })
    })
    const allGenres= await Genre.findAll();
    return allGenres;
}

const saveApiGenres= async ()=>{
    try {
        const response= await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const data = response.data.results;
        const allGenres= await getAllGenres(data);      
        console.log('Genres in db');
    } catch (error) {
        console.log({error: error.message});
    }
}





module.exports={
    getAllGenres,
    saveApiGenres
}