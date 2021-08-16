import '../src/styles/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Index from './containers/Index';
import NotFound from './containers/NotFound';
import DetailPokemon from './containers/DetailPokemon';
import Form from './containers/Form';
import DetailPokemonByName from './containers/DetailPokemonByName';


const App = () => (

  <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/detail/:id" component={DetailPokemon} />
        <Route exact path="/pokemon/:name" component={DetailPokemonByName} />
        <Route exact path="/form" component={Form} />
        <Route component={NotFound} />
      </Switch>
  </BrowserRouter>
)



export default App;
