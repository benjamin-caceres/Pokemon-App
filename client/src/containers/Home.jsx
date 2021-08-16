import CardsPokemon from "../components/CardsPokemon";
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { getPokemon } from "../actions/pokemon";
import Pagination from "../components/Pagination";
import { getTypes } from "../actions/types";

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonPerPage = 9;

    const pokemons = useSelector((state) => state.pokemons);
    const filtered = useSelector((state) => state.filteredPokemon);
    const filteredBy = useSelector((state) => state.filtered_by);
    const orderedBy = useSelector((state) => state.ordered_by);

    const [allPokemons, setAllPokemons] = useState([]);
    
    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const pokemonsPerPage = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(getPokemon());
        dispatch(getTypes());
        console.log('filters',  filtered, filteredBy);
            if (filteredBy === 'All' && orderedBy === "All") {
                setAllPokemons(pokemons?.slice());
            } else {
                setAllPokemons(filtered?.slice());
            }
        
      
    }, [filteredBy, orderedBy, pokemons, filtered]);
    
   return ( <>
        <Layout />
        <CardsPokemon pokemons={pokemonsPerPage} />
        <Pagination
                pokemonPerPage={pokemonPerPage}
                totalPokemon={allPokemons.length}
                paginate={paginate}
            />
    </>)
};

export default Home;