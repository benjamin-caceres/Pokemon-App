import '../src/styles/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Index from './containers/Index';
import NotFound from './containers/NotFound';
import DetailPokemon from './containers/DetailPokemon';


const App = () => (

  <BrowserRouter>
          <Switch>
              <Route exact path="/" component ={Index} />
              <Route path="/home" component ={Home} />
              <Route path="/detail/:id" component ={DetailPokemon} />
              <Route component={NotFound} />
          </Switch> 
  </BrowserRouter>
)
  


export default App;
