import React  from 'react';
import '../styles/components/NotFound.css';
import pokemon from '../static/pokemon.png';
import vamo from '../static/vamo.png';
import { Link } from 'react-router-dom';


const NotFound = () => (
    <header>
        <div class="style-logo">
            <Link to="/home">
                <img src={pokemon} alt="pokemon-classic" />
            </Link>
        </div>
        <div class="not-found">
            <div class="error-404-text">
                <h1>ERROR 404 NOT FOUND</h1>
            </div>
            <div class="squirtle-vamo">
                <img src={vamo} alt="" />
                <h1>VAMO A CALMARNO</h1>
            </div>
        </div>
    </header> 
);

export default NotFound;