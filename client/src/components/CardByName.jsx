import React, { useEffect } from 'react';
import ashpikachu from '../static/ashpikachu.png'
import '../styles/components/Card.css';
import { useParams } from 'react-router-dom';
import { getPokemonByName, getPokemonByNameReset } from "../actions/pokemon";
import { connect } from 'react-redux';
import notFound from '../static/notfound.gif'


const CardByName = ({ pokemon, getPokemonByName, getPokemonByNameReset })  => {
    const { name } = useParams()
    useEffect(() => {
        getPokemonByName(name)
        return () => { getPokemonByNameReset() }
      }, [])
    return <>
            {pokemon.name ?
                <>
                    <div className="pokemon-detalle-numero from-search">
                        <p className="numero-poke">#{pokemon.id}</p>
                        <p className="nombre-poke">{pokemon.name}</p>
                    </div>
                    <div className="card-detail">
                    <img src={pokemon.img ? pokemon.img : 'https://purepng.com/public/uploads/large/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-17015278256953yfbq.png'} alt="" />
                    </div>
                    <div className="pokemon-skills">
                        <div className="row-skills">
                            <div className="grilla-skills">
                                <h3>Altura</h3>
                                <p>{pokemon.height}</p>
                            </div>
                            <div className="grilla-skills">
                                <h3>Peso</h3>
                                <p>{pokemon.weight}</p>
                            </div>
                            <div className="grilla-skills">
                                <h3>Tipo</h3>
                                <p>{pokemon.types?.map(type =>
                            <span key={type?.slot || type?.id}>{type?.type?.name || type?.name}  </span>
                            )}</p>
                            </div>
                            <div className="grilla-skills">
                                <h3>Hp</h3>
                                <p>{pokemon.hp}</p>
                            </div>
                        </div>
                        <div className="row-skills">
                            <div className="grilla-skills">
                                <h3>Defensa</h3>
                                <p>{pokemon.defense}</p>
                            </div>
                            <div className="grilla-skills">
                                <h3>Velocidad</h3>
                                <p>{pokemon.speed}</p>
                            </div>

                        </div>
                        <div className="row-skills">
                            <div className="grilla-skills">
                                <h3>Ataque</h3>
                                <p>{pokemon.attack}</p>
                            </div>
                            <div className="grilla-skills">
                            </div>
                            <div className="grilla-skills">
                                <img src={ashpikachu} alt="" />
                            </div>
                        </div>

                    </div>
                    </>
                  : <div className="notFoundWrapper">
                      <h2>Pokemon not found</h2>
                      <img src={notFound} />
                </div>}
      
    </>
};

function mapStateToProps(state) {
    return {
      pokemon: state.pokemon_search,
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
        getPokemonByName: (pokemon) => dispatch(getPokemonByName(pokemon)),
        getPokemonByNameReset: () => dispatch(getPokemonByNameReset())
        };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CardByName);

