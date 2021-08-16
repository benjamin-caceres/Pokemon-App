import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/components/Search.css';
import FilterPokemon from './Filter';

const Search = ()=> {
    const [name, setName] = useState('');
    let history = useHistory();


    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name) {
            history.push(`/pokemon/${name}`);
            setName({})
        }
    };

    return (
    <>
    <form  className="search-input" onSubmit={handleSubmit}>
         <input type="search" placeholder="Buscar Pokemon Por Nombre"                        
         onChange={handleChange} />
    </form>
    <FilterPokemon />
    </>

)};

export default Search;
