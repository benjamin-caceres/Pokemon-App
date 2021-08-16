import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/components/FilterPokemon.css'
import { pokemonOrder, pokemonByOrigin, pokemonByType } from '../actions/filterActions';

const FilterPokemon = ({ types, pokemons, pokemonByType, pokemonByOrigin, pokemonOrder }) => {

    const handleByType = (e) => {
		pokemonByType(e.target.value, pokemons);
	};

	const handleByOrigin = (e) => {
		pokemonByOrigin(e.target.value, pokemons);
	};

	const handleOrder = (e) => {
        console.log(e.target.value);
		pokemonOrder(e.target.value, pokemons);
	};

	const handleChange = (e) => {
		if(e.target.value === 'API' || e.target.value === 'DB' || e.target.value === 'All'){
			handleByOrigin(e);
		} else {
			handleByType(e);
		}
	}

    return (
    <>
        <h4 className="filter-order">Filtrado por</h4>
        <div className="orden-filtro">
            <button onClick={handleOrder} value="All">Todos</button>
            <button onClick={handleOrder} value="Attack Asc">Mas Fuerte</button>
            <button onClick={handleOrder} value="Attack Des">Mas Debil</button>
            <button onClick={handleOrder} value="A-Z">A a la  Z</button>
            <button onClick={handleOrder} value="Z-A">Z a la A</button>
            <Link to={'/form'} >Crea Tu Pokemon</Link>
            <select name="Tipo" id="" onChange={handleChange}>
                <optgroup label="Origen">
                    <option default value='All'>All</option>
                    <option value="API" group="origin">Originales</option>
                    <option value="DB" group="origin">Creado</option>
                </optgroup>
                <optgroup label="By type">
                    {/* <option default>All</option> */}
                     {types &&
                        types.map((type, i) => (
                            <option key={i} value={type.name}>
                                {type.name}
                            </option>
                        ))}
                </optgroup>
            </select>
        </div>
    </>
)};



const mapStateToProps = (state) => {
	return {
		types: state.types,
		pokemons: state.pokemons
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		pokemonByType: (type, pokemons) => dispatch(pokemonByType(type, pokemons)),
		pokemonByOrigin: (by, pokemons) => dispatch(pokemonByOrigin(by, pokemons)),
		pokemonOrder: (by, pokemons) => dispatch(pokemonOrder(by, pokemons)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPokemon);