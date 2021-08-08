const axios = require('axios');
const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
const { Pokemons, Types } = require('../db');

//obetener pokemons en home de la api y de la db
router.get('/', async (req, res, next) => {
    if (req.query.name) {
        console.log(req.query.name);
        try {
            const pokeDBName = await Pokemons.findOne({
                where: {
                    name: req.query.name
                },
                include: Types  
            })

            if (pokeDBName !== null) {
                let pokeFoundName = {
                    id: pokeDBName.id,
                    img: pokeDBName.img,
                    name: pokeDBName.name,
                    hp: pokeDBName.hp,
                    attack: pokeDBName.attack,
                    defense: pokeDBName.defense,
                    speed: pokeDBName.speed,
                    height: pokeDBName.height,
                    weight: pokeDBName.weight,
                    types: pokeDBName.types
                };
               
                if (pokeFoundName.name === req.query.name) return res.json(pokeFoundName);
            }
            if (pokeDBName === null) {
                let pokemonFromApi = await axios(`https://pokeapi.co/api/v2/pokemon/${req.query.name}`)
                console.log(pokemonFromApi);
                if (pokemonFromApi.data === 'Not Found') return res.json({});
                if (pokemonFromApi.data.name) {
                    let pokeFound = {
                        id: pokemonFromApi.data.id,
                        name: pokemonFromApi.data.name,
                        hp: pokemonFromApi.data.stats[0].base_stat,
                        attack: pokemonFromApi.data.stats[1].base_stat,
                        defense: pokemonFromApi.data.stats[2].base_stat,
                        speed: pokemonFromApi.data.stats[5].base_stat,
                        height: pokemonFromApi.data.height,
                        weight: pokemonFromApi.data.weight,
                        img: pokemonFromApi.data.sprites.other.dream_world.front_default ?
                            pokemonFromApi.data.sprites.other.dream_world.front_default :
                            pokemonFromApi.data.sprites.other['official-artwork'].front_default,
                        types: pokemonFromApi.types
                    }
                    return res.json(pokeFound)
                }
            } 
            else return res.json({});
 
        } catch (error) {
            res.status(500).send("No se ha encontrado un pokemon con ese nombre.", error);
        }
    } else {
        try {
            const pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=9');
            let infoPokemons = [];
            let pokemonsFromDB = await Pokemons.findAll({
                include: {
                    model: Types,
                }
            });
            for (let index = 0; index < pokemons.data.results.length; index++) {
                const p = pokemons.data.results[index];
                await axios.get(p.url)
                    .then(result => {
                        infoPokemons.push(
                            {
                                name: result.data.name,
                                id: result.data.id,
                                types: result.data.types,
                                img: result.data.sprites?.other.dream_world.front_default
                            }
                        )
                    })
                    .catch(error => console.log(error))

            }
            let results = infoPokemons.concat(pokemonsFromDB);
            res.json(results)
        } catch (error) {
            next(error)
            res.status(500).send('Server Error')
        }
    }
})
//*****fin******

//obtener pokemon tanto de api como creado con sus detalles
router.get('/:idPokemon', async (req, res, next) => {
    const idPokemon = req.params.idPokemon
    if (!idPokemon) {
        return next({ msg: 'No me mandaste el id', status: 500 })
    }
    try {
        if (idPokemon.length > 5) {
            let pokemonFromDB = await Pokemons.findOne({
                where: {
                    id: idPokemon
                },
                include: Types
            })
            console.log(pokemonFromDB);
            let pokemonFound = {
                id: pokemonFromDB.id,
                img: pokemonFromDB.img,
                name: pokemonFromDB.name,
                hp: pokemonFromDB.hp,
                attack: pokemonFromDB.attack,
                defense: pokemonFromDB.defense,
                speed: pokemonFromDB.speed,
                height: pokemonFromDB.height,
                weight: pokemonFromDB.weight,
                types: pokemonFromDB.types
            };

            res.json(pokemonFound);

        } else {
            const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
            res.json({
                name: pokemon.data.name,
                id: pokemon.data.id,
                types: pokemon.data.types,
                img: pokemon.data.sprites?.other.dream_world.front_default,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat


            })
        }

    } catch (error) {
        next(error)
    }
})
//******fin*******

//Crear nuevo pokemon: con id unico y que devuelva el pokemon creado
router.post('/', async function (req, res) {
    const id = uuidv4(); // generamos un ID random unico con la dependecia uuid
    console.log('ID Generado', id);
    let data = { ...req.body, id };
    if (!req.body.name) return res.status(400).send('El nombre del pokemon es mandatorio!');
    try {
        const createdPoke = await Pokemons.create(data);
        await createdPoke.addTypes(req.body.type1, { through: 'pokemon_type' });
        const poke_type = await Pokemons.findOne({
            where: { name: req.body.name },
            include: Types
        });
        return res.json(poke_type);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error, No se pudo crear el nuevo pokemon');
    }
})



module.exports = router