// // MODULARIZAR CUANDO LA FUNCION YA ESTE OK!




// const validate = (input)=>{
//     let errors={}
//     if(!input.name){
//         errors.name='Name is required'

//     }if(!input.description){
//         errors.description='Description is required'

//     }if(input.platforms.length<1){
//         errors.platforms='Please select at least one Platform'

//     }if(!input.background_image){
//         errors.background_image='Image URL is required'

//     }if(!input.released){
//         errors.released='Please select Release Date'
        
//     }if(!input.rating || Number(input.rating)>5 || Number(input.rating)<1){
//         errors.rating='Rating must be a number between 1 and 5'

//     }if(input.genres.length<1){
//         errors.genres='Please select at least one Genre'
//     }
// // console.log(errors)
// // console.log(Object.keys(errors).length)
//     return errors;
// }

// export default validate;