videogamesRouter.get('/', async (req,res)=>{
    try {
        const {name} = req.query;
    
        //ORGINAL: Problema: cada vez q llamo a getAllVideogames(), me agrega los de la db (entonces me los agrega 4 veces).
        const response1= await axios(`https://api.rawg.io/api/games?page_size=25&page=1&key=${API_KEY}`);
        const data1 = response1.data.results;
        const allVideogames1= await getAllVideogames(data1);

        const response2= await axios(`https://api.rawg.io/api/games?page_size=25&page=2&key=${API_KEY}`);
        const data2 = response2.data.results;
        const allVideogames2= await getAllVideogames(data2);

        const response3= await axios(`https://api.rawg.io/api/games?page_size=25&page=3&key=${API_KEY}`);
        const data3 = response3.data.results;
        const allVideogames3= await getAllVideogames(data3);

        const response4= await axios(`https://api.rawg.io/api/games?page_size=25&page=4&key=${API_KEY}`);
        const data4 = response4.data.results;
        const allVideogames4= await getAllVideogames(data4);

        const allVideogames=[...allVideogames1,...allVideogames2,...allVideogames3,...allVideogames4]

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