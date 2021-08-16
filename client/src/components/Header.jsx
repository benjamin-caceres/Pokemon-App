import React from 'react';
import '../styles/components/Header.css';
import pokemon from '../static/pokemon.png';
import { Link } from 'react-router-dom';

const Header = () => (
    <header>
            <div className="style-logo">
                <Link to="/home">
                    <img src={pokemon} alt="pokemon-classic" />
                </Link>
            </div>    
    </header>
);

export default Header;
