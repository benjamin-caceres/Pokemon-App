const axios = require('axios');
const express = require('express')
// const {Episode} = require('../models/index') (base de datos)
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
        let infoPokemons = [];
        for (let index = 0; index < pokemons.data.results.length; index++) {
            const p = pokemons.data.results[index];
            await axios.get(p.url)
                .then(result => {
                    infoPokemons.push(
                        {
                            name: result.data.name,
                            id: result.data.id,
                            types: result.data.types,
                            image: result.data.sprites?.front_default
                        }
                    )
                })
                .catch(error => console.log(error))

        }
        res.json(infoPokemons)
    } catch (error) {
        next(error)
    }
})

router.get('/:idPokemon', async (req, res, next) => {
    const idPokemon = req.params.idPokemon
    if (!idPokemon) {
        return next({ msg: 'No me mandaste el id', status: 500 })
    }
    try {
        const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
        res.json({
            name: pokemon.data.name,
            id: pokemon.data.id,
            types: pokemon.data.types,
            image: pokemon.data.sprites?.front_default,
            height: pokemon.data.height,
            weight: pokemon.data.weight,
            hp: pokemon.data.stats[0].base_stat,
            attack: pokemon.data.stats[1].base_stat,
            defense: pokemon.data.stats[2].base_stat,
            speed: pokemon.data.stats[5].base_stat


        })
    } catch (error) {
        next(error)
    }
})



module.exports = router