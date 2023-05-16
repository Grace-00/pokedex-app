import axios from 'axios'
import { Pokemon, Sprites } from '../types'

export const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'
export const pokemonInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon',
})

export interface PokemonPage {
  allPokemonInfo: {
    name: string
    url: string
    sprites: Sprites
  }[]
  nextPage: string | null
  prevPage: string | null
}

export const getPokemonListFromCurrentPage = async (
  currentPageUrl: string,
  limit = 20,
  offset = 0
): Promise<PokemonPage> => {
  try {
    const response = await axios.get(currentPageUrl, {
      params: { limit, offset },
    })
    const { results, next, previous } = response.data

    const pokemonDetailPromises = results.map((pokemon: Pokemon) =>
      axios.get(pokemon.url).then((response) => response.data)
    );
    const allPokemonDetail = await Promise.all(pokemonDetailPromises);

    const allPokemonInfo = results.map((pokemon: Pokemon, index: number) => ({
      ...pokemon,
      ...allPokemonDetail[index],
    }))

    return { allPokemonInfo, nextPage: next, prevPage: previous }
  } catch (error) {
    throw new Error('Failed to get Pokemon list.')
  }
}

export const getPokemonDetail = async (name: string) => {
  if (name !== undefined) {
    return await pokemonInstance.get(`${name}`)
  }
}

export const getFavourites = (): Pokemon[] => {
  const favourites = localStorage.getItem('favourites')
  return favourites ? JSON.parse(favourites) : []
}

export const toggleFavourite = (pokemon: Pokemon): void => {
  const favourites = getFavourites()
  const pokemonIndex = favourites.findIndex(
    (favPokemon) => favPokemon.name === pokemon.name
  )

  if (pokemonIndex !== -1) {
    favourites.splice(pokemonIndex, 1)
  } else {
    favourites.push(pokemon)
  }

  localStorage.setItem('favourites', JSON.stringify(favourites))
}