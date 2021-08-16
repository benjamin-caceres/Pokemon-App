import React from 'react';
import pokemonintro from '../static/pokemonintro.png';
import go from '../static/go.png';
import '../styles/components/Landing.css';
import { Link } from 'react-router-dom';

const Landing = () => (
    <div className="main-container">
    <div className="bg-image">
        <img src={pokemonintro} alt="" />
    </div>
    <h3>PRESIONA "GO" PARA INICIAR</h3>
    <div className="buton-main">
        <Link to="/home">
            <img src={go} alt="buton-go" />

            </Link>
    </div>
    
</div>
);

export default Landing;