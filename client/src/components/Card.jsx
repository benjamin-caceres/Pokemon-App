import React, { useEffect } from 'react';
import ashpikachu from '../static/ashpikachu.png'
import '../styles/components/Card.css';
import { useParams } from 'react-router-dom';
import { getPokemonDetail, getPokemonDetailReset } from "../actions/pokemon";
import { connect } from 'react-redux';


const Card = ({ pokemon_detail, getPokemonDetailReset, getPokemonDetail })  => {
    const { id } = useParams()
    useEffect(() => {
        getPokemonDetail(id)
        return () => { getPokemonDetailReset() }
      }, [])
    return <>
        <div className="pokemon-detalle-numero">
            <p className="numero-poke">#{pokemon_detail.id}</p>
            <p className="nombre-poke">{pokemon_detail.name}</p>
        </div>
        <div className="card-detail">
        <img src={pokemon_detail.img ? pokemon_detail.img : 'https://purepng.com/public/uploads/large/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-17015278256953yfbq.png'} alt="" />
        </div>
        <div className="pokemon-skills">
            <div className="row-skills">
                <div className="grilla-skills">
                    <h3>Altura</h3>
                    <p>{pokemon_detail.height}</p>
                </div>
                <div className="grilla-skills">
                    <h3>Peso</h3>
                    <p>{pokemon_detail.weight}</p>
                </div>
                <div className="grilla-skills">
                    <h3>Tipo</h3>
                    <p>{pokemon_detail.types?.map(type =>
                            <span key={type?.slot || type?.id}>{type?.type?.name || type?.name}  </span>
                            )}</p>
                </div>
                <div className="grilla-skills">
                    <h3>Hp</h3>
                    <p>{pokemon_detail.hp}</p>
                </div>
            </div>
            <div className="row-skills">
                <div className="grilla-skills">
                    <h3>Defensa</h3>
                    <p>{pokemon_detail.defense}</p>
                </div>
                <div className="grilla-skills">
                    <h3>Velocidad</h3>
                    <p>{pokemon_detail.speed}</p>
                </div>

            </div>
            <div className="row-skills">
                <div className="grilla-skills">
                    <h3>Ataque</h3>
                    <p>{pokemon_detail.attack}</p>
                </div>
                <div className="grilla-skills">
                </div>
                <div className="grilla-skills">
                    <img src={ashpikachu} alt="" />
                </div>
            </div>

        </div>
    </>
};

function mapStateToProps(state) {
    return {
      pokemon_detail: state.pokemon_detail,
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      getPokemonDetail: (pokemon) => dispatch(getPokemonDetail(pokemon)),
      getPokemonDetailReset: () => dispatch(getPokemonDetailReset())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Card);

