//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {saveApiGenres} = require ('../api/src/controllers/genresControllers');

// Syncing all the models at once.
conn.sync({ force: false }).then(async() => {
  await saveApiGenres();
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  })
}).catch((error) =>     {
  console.log(error);
})



// // // ORIGINAL:
// conn.sync({ force: false }).then(() => {
//   server.listen(3001, () => {
//     //PONER ACA LA FUNCION PARA Q BAJE TODOS LOS GENRES DE LA API, CUANDO LEVANTA EL SERVIDOR: es la ruta GET de generRouter, + la fn getAllGenres de genresController.
//     //No lo hago ahora para no "gastar" innecesariamente la cant de requests q pedo hacerle a la API. Dejé el force: false paq no me borre las tablas cada vez q reinicia, y listo.
//     console.log('%s listening at 3001'); // eslint-disable-line no-console
//   });
// });
