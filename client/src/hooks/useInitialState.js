import { useState, useEffect } from 'react';

const useInitialState = (API) => {
  const [ pokemons, setPokemons ] = useState([]);
  useEffect(() => {
    fetch(API)
      .then(response => response.json())
      .then(data => setPokemons(data));
  }, []);
  return pokemons;
};

export default useInitialState;