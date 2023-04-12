import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {postVideogame, getGenres} from "../actions/index";
// import validate from './videogameCreateValidation';
import style from "./VideogameCreate.module.css";


const validate = (input)=>{
    let errors={}
    if(!input.name){
        errors.name='Name is required'

    }if(!input.description){
        errors.description='Description is required'

    }if(input.platforms.length<1){
        errors.platforms='Please select at least one Platform'

    }if(!input.background_image){
        errors.background_image='Image URL is required'

    }if(!input.released){
        errors.released='Please select Release Date'
        
    }if(!input.rating || Number(input.rating)>5 || Number(input.rating)<1){
        errors.rating='Rating must be a number between 1 and 5'

    }if(input.genres.length<1){
        errors.genres='Please select at least one Genre'
    }
// console.log(errors)
// console.log(Object.keys(errors).length)
    return errors;
}

export default function VideogameCreate(){
    const dispatch= useDispatch();
    const history= useHistory();
    const genres= useSelector((state)=>state.genres);
// console.log(genres);
    const sortedGenresNames= genres.map((g)=>g.name).sort();
    // console.log(sortedGenresNames);



   

    const [errors, setErrors] = useState({})

    const [input, setInput]= useState({
        name: "",
        description: "",
        platforms: [],
        background_image: "",
        released: "",
        rating: "",
        genres: []
    })

     

    // ARME ESTE SOLO PARA PROBARLO, DSPS TRAERME LAS PLATFORMS CON UN FILTER Y UN SORT DE VERDAD!!
    const platformsList= 
    [ '3DO',
    'Android',
    'Apple II',
    'Atari 2600',
    'Atari 5200',
    'Atari 7800',
    'Atari 8-bit',
    'Atari Flashback',
    'Atari Lynx',
    'Atari ST',
    'Atari XEGS',
    'Classic Macintosh',
    'Commodore / Amiga',
    'Dreamcast',
    'Game Boy',
    'Game Boy Advance',
    'Game Boy Color',
    'Game Gear',
    'GameCube',
    'Genesis',
    'Jaguar',
    'Linux',
    'NES',
    'Neo Geo',
    'Nintendo 3DS',
    'Nintendo 64',
    'Nintendo DS',
    'Nintendo DSi',
    'Nintendo Switch',
    'PC',
    'PS Vita',
    'PSP',
    'PlayStation',
    'PlayStation 2',
    'PlayStation 3',
    'PlayStation 4',
    'PlayStation 5',
    'SEGA 32X',
    'SEGA CD',
    'SEGA Master System',
    'SEGA Saturn',
    'SNES',
    'Wii',
    'Wii U',
    'Xbox',
    'Xbox 360',
    'Xbox One',
    'Xbox Series S/X',
    'iOS',
    'macOS' ]
    

    const handleChange = (event)=>{
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
        }));
// console.log(input)
    }


    const handleCheck=(event)=>{
        if(event.target.checked){
            setInput({
                ...input,
                genres: [...input.genres,event.target.value]
            })
        }
        if (!event.target.checked){
            const filtererdGenres= input.genres.filter(g=>g!==event.target.value)
            setInput({
                ...input,
                genres: filtererdGenres
            })

        }
        
        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
        }));
// console.log(Object.values(input))
// console.log(Object.values(input).length)
// console.log(input);
    }



    const handleSelect=(event)=>{
        setInput({
            ...input,
            platforms: [...input.platforms,event.target.value]
        });
        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
        }));
    }


    const handleDeletePlatform=(pl)=>{
        setInput({
            ...input,
            platforms: input.platforms.filter(p=>p!==pl)
        })
    }
   

    const handleDisabledButton = ()=>{
        if(Object.values(input)[0]==="") {
            return true;
        }else if (Object.keys(errors).length>0) {
            return true
        } else{
            return false;
        }
    }

    // const backendResponse =  useSelector((state)=>state.backendResponse);


    const handleSubmit=  (event)=>{
        try {
            event.preventDefault();
           dispatch(postVideogame(input));

           setInput({
            name: "",
            description: "",
            platforms: [],
            background_image: "",
            released: "",
            rating: "",
            genres: []
        });
        setTimeout(()=>history.push("/home"),2000)

        } catch (err) {
            console.log(err)
        }

           
    }



// handleSubmit ORIGINAL Q FUNCIONA, PERO:
// Me tira el alert "Videogame created succesfully!" aunque no se haya creado.
//No me trae los mensajes de error q armé en el back
//     const handleSubmit= (event)=>{
//         try {
            
//             event.preventDefault();
//             dispatch(postVideogame(input))
// console.log(input);
//             alert("Videogame created succesfully!")
//             setInput({
//                 name: "",
//                 description: "",
//                 platforms: [],
//                 background_image: "",
//                 released: "",
//                 rating: "",
//                 genres: []
//             });
//             history.push("/home"); // Dsps de q el videogame fue creado, redireccionar a Home.
//         } catch (error) {
//             console.log(error)
            
//         }
//     }

    
    useEffect(()=>{
        dispatch(getGenres())
    },[dispatch])

//VERSION LOCA PARA Q ME TRAIGA ALETS DE backendResponse (xq no me salía q me traiga los errores en el handleSubmit):
    // useEffect(()=>{
    //     dispatch(getGenres(), alert(backendResponse))
    // },[dispatch,backendResponse])

// console.log(genres); FUNCIONA OK

    return (
        <div className={style.container}>

            <Link to="/home"><button>Back to All Videogames</button></Link>
        <div className={style.formcontainer}>
            <h1>Create Your Own Videogame!</h1>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className={style.label}>Name*:</label>
                    <input type="text" value={input.name} name="name" onChange={handleChange} />
                    <p className= {!input.name? style.error : style.requirements}>Name is required</p>
                    {/* ORIGINAL */}
                    {/* {errors.name && (<p className={style.error}>{errors.name}</p>)} */}
                </div>

                <div>
                    <label htmlFor="description" className={style.label}>Description*:</label>
                    <textarea type="text" value={input.description} name="description" onChange={handleChange} />
                    <p className= {!input.description? style.error : style.requirements}>Description is required</p>
                    {/* {errors.description && (<p className={style.error}>{errors.description}</p>)} */}
                </div>

                <div>
                    <label htmlFor="background_image" className={style.label}>Image URL*:</label>
                    <input type="text" value={input.background_image} name="background_image" onChange={handleChange} />
                    <p className= {!input.background_image? style.error : style.requirements}>Image URL is required</p>
                    {/* {errors.background_image && (<p className={style.error}>{errors.background_image}</p>)} */}
                </div>

                <div>
                    <label htmlFor="platforms" className={style.label}>Platforms*:</label>
                    <select onChange={handleSelect}>
                        {
                            platformsList.map((p,i)=>{
                                return (
                                    <option value={p} key={i}>{p}</option>
                                    )
                                })
                            }
                        
                        </select>
                    <div className={style.platforms}>

                        {
                            input.platforms.map((pl,i)=>{
                                return (
                                    <>
                                    <p key={i}>{pl}</p><button className="buttonX" onClick={() => handleDeletePlatform(pl)}>x</button>
                                    </>
                                    
                                    )
                                })
                            }
                    </div>
                    
                    <p className= {input.platforms.length<1 ? style.error : style.requirements}>Please select at least one Platform</p>
                    {/* {errors.platforms && (<p className={style.error}>{errors.platforms}</p>)} */}
                </div>

                <div>
                    <label htmlFor="released" className={style.label}>Released Date*:</label>
                    <input type="date" value={input.released} name="released" onChange={handleChange} />
                    <p className= {!input.released? style.error : style.requirements}>Please select Release Date</p>
                    {/* {errors.released && (<p className={style.error}>{errors.released}</p>)} */}
                </div>

                <div>
                    <label htmlFor="rating" className={style.label}>Rating*:</label>
                    <input placeholder="1 to 5" type="number" value={input.rating} name="rating" onChange={handleChange} />
                    <p className= {!input.rating || Number(input.rating)>5 || Number(input.rating)<1? style.error : style.requirements}>Rating must be a number between 1 and 5</p>
                    {/* {errors.rating && (<p className={style.error}>{errors.rating}</p>)}    */}
                </div>
                
                <div>
                    
                    <label htmlFor="genres" className={style.label}>Genres*:</label>
                    {
                        sortedGenresNames.map((g,i)=>{
                            return (
                                <label htmlFor={g} key={i}>
                                    <input type="checkbox" id={g} value={g} name="genres" key={i} onChange={handleCheck} />{g}
                                </label> 
                            )
                        })
                    }

                    {/* ORIGINAL */}
                    {/* {
                        genres.map((g,i)=>{
                            return (
                                <label htmlFor={g.name} key={i}>
                                    <input type="checkbox" id={g.name} value={g.name} name="genres" key={i} onChange={handleCheck} />{g.name}
                                </label> 
                            )
                        })
                    } */}

                    <p className= {input.genres.length<1 ? style.error : style.requirements}>Please select at least one Genre</p>
                    {/* {errors.genres && (<p className={style.error}>{errors.genres}</p>)}    */}
                </div>

                <div>
                    <button type="submit" disabled={handleDisabledButton()}>Create Videogame</button>
                </div>



            </form>
        </div>
        </div>
    )

}