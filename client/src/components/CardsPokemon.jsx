import React from 'react';
import '../styles/components/CardsPokemon.css';
import { Link } from 'react-router-dom';
// import useInitialState from '../hooks/useInitialState';
import loading from '../static/loading.gif';

// const API = 'http://localhost:3001/pokemons'

const CardsPokemon = ({ pokemons }) => {
    // const pokemons = useInitialState(API);
    return pokemons.length === 0 ? <img className="loader" src={loading} height="150px"></img> : (
    <div className="cards">
        {pokemons.map(pokemon =>
            <Link to={`/detail/${pokemon.id}`} key={pokemon.id}>
                <div className="card">
                    <img src={pokemon.img ? pokemon.img : 'https://purepng.com/public/uploads/large/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-17015278256953yfbq.png'} alt="" />
                    <div className="frame">
                        <p className="number">#{pokemon.id}</p>
                        <p className="name">{pokemon.name}</p>
                    </div>
                    <div className="frame">
                        <p className="type-pokemon">{pokemon.types.map(type =>
                            <span key={type?.slot || type?.id}>{type?.type?.name || type?.name}  </span>
                        
                            )}</p>
                    </div>
                </div>
            </Link>     
        )}
    </div>

    );
};

export default CardsPokemon;