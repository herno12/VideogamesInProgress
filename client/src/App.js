import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import VideogameCreate from './components/VideogameCreate';
import Detail from './components/Detail';


function App() {
  return (
    // Puedo poner el BrowserRouter acá, o en index.js en volviendo al componente App (este mismo) importado.
    <BrowserRouter> 
    <div className="App">
      {/* Switch hace q usuario pueda ir solo a urls q están contenidas en él. Evita q caiga en el error de "esta pág no existe". INVESTIGAR UN POCO MÁS. */}
      <Switch>
        <Route exact path='/' component={Landing}></Route>
        <Route path='/home/:id' component={Detail}></Route>
        <Route path='/home' component={Home}></Route>
        <Route path='/createvideogame' component={VideogameCreate}></Route>
        

      </Switch>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
