export const POKEMONS_ASC = 'POKEMONS_ASC';
export const POKEMONS_DESC = 'POKEMONS_DESC';
export const ATTACK_ASC = 'ATTACK_ASC';
export const ATTACK_DESC = 'ATTACK_DESC';
export const ONLY_API = 'ONLY_API';
export const ONLY_DB = 'ONLY_DB';
export const ALL = 'ALL';
export const BY_TYPE = 'BY_TYPE';
export const RESET = 'RESET';
export const NO_ORDER = 'NO_ORDER';

export const pokemonOrder = (by) => (dispatch, getState) => {
	const filtered = getState().filteredPokemon.slice()
	const filterBy = getState().filtered_by
	const pokemon = getState().pokemons.slice()

	switch (by) {
		case 'A-Z':
			if (filterBy === 'All') {
				const orderedPokemon = pokemon.sort(
					(a, b) => {
						if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
						if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
						return 0
					}
				);
				dispatch({
					type: POKEMONS_ASC,
					payload: {
						orderedPokemon,
						name: by
					}
				})
			}
			else {
				const orderedPokemon = filtered.sort(
					(a, b) => {
						if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
						if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
						return 0
					}
				);
				dispatch({
					type: POKEMONS_ASC,
					payload: {
						orderedPokemon,
						name: by
					}
				})
			}
			break;

		case 'Z-A':
			if (filterBy === 'All') {
				const orderedPokemon = pokemon.sort(
					(a, b) => {
						if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
						if (a.name.toLowerCase() > b.name.toLowerCase()) return -1
						return 0
					}
				);
				dispatch({
					type: POKEMONS_DESC,
					payload: {
						orderedPokemon,
						name: by
					}
				})
			} else {
				const orderedPokemon = filtered.sort(
					(a, b) => {
						if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
						if (a.name.toLowerCase() > b.name.toLowerCase()) return -1
						return 0
					}
				);
				dispatch({
					type: POKEMONS_DESC,
					payload: {
						orderedPokemon,
						name: by
					}
				})
			}
			break;

		case 'Attack Asc':
			if (filterBy === 'All') {
				const orderedPokemon = pokemon.sort(
					(a, b) => b.attack - a.attack
				)
				dispatch({
					type: ATTACK_ASC,
					payload: {
						orderedPokemon,
						name: by
					}
				})
			} else {
				const orderedPokemon = filtered.sort(
					(a, b) => b.attack - a.attack
				)
				dispatch({
					type: ATTACK_ASC,
					payload: {
						orderedPokemon,
						name: by
					}
				})
			}
			break;

		case 'Attack Des':
			if (filterBy === 'All') {
				const orderedPokemon = pokemon.sort(
					(a, b) => a.attack - b.attack
				)
				dispatch({
					type: ATTACK_DESC,
					payload: {
						orderedPokemon,
						name: by
					}
				})
			} else {
				const orderedPokemon = filtered.sort(
					(a, b) => a.attack - b.attack
				)
				dispatch({
					type: ATTACK_DESC,
					payload: {
						orderedPokemon,
						name: by
					}
				})
			}
			break;
		
		case 'All':
			dispatch({
				type: NO_ORDER,
				payload: {
					pokemon,
					name: by
				}
			})
			break

		default:
			return pokemon
	}
};

export const pokemonByOrigin = (by) => (dispatch, getState) => {
	const pokemon = getState().pokemons.slice()
	let orderedByOrigin = [];
	switch (by) {
		case 'API':
			orderedByOrigin = pokemon.filter((el) => typeof el.id === 'number');
			dispatch({
				type: ONLY_API,
				payload: {
					orderedByOrigin,
					name: by
				}
			})
			break;

		case 'DB':
			let reg_ex = /-/;
			orderedByOrigin = pokemon.filter((el) => el.id.toString().search(reg_ex) !== -1);
			dispatch({
				type: ONLY_DB,
				payload: {
					orderedByOrigin,
					name: by
				}
			})
			break;

		case 'All':
			dispatch({
				type: ALL,
				payload: {
					pokemon,
					name: by
				}
			})
			break;

		default:
			return pokemon;
	}
};
export const pokemonByType = (pokeType) => (dispatch, getState) => {
	const pokemon = getState().pokemons.slice()
	console.log('Pokemon', pokemon, pokeType);

	let arrayByType = pokemon.filter((poke) => {
		console.log('Poke', poke)

		if (poke.types.length > 0) {
			for (let index = 0; index < poke.types.length; index++) {
				const currentPoke = poke.types[index];
				if (currentPoke.hasOwnProperty('type')) {
					if (currentPoke?.type?.name === pokeType) {
						return true
					}
				} else {
					if (currentPoke?.name === pokeType) {
						return true;
					}
				}
			}

		} else {
			return false
		}
	});
	dispatch({
		type: BY_TYPE,
		payload: {
			arrayByType,
			name: pokeType
		}
	});
};