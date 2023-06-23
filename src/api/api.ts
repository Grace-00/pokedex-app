import axios from 'axios'
import { Pokemon, PokemonPage } from '../types'

export const pokemonInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon',
})

export const fetchPokemonData = async (offset = 0): Promise<PokemonPage> => {
  try {
    const response = await pokemonInstance.get<PokemonPage>(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      pokemonInstance.defaults.baseURL!,
      { params: { limit: 20, offset } }
    )

    const { results, next, previous, count } = response.data

    const pokemonDetailPromises = results.map((pokemon: Pokemon) =>
      axios.get(pokemon.url).then((response) => response.data)
    )
    const allPokemonDetail = await Promise.all(pokemonDetailPromises)

    const allPokemonInfo = results.map((pokemon: Pokemon, index: number) => ({
      ...pokemon,
      ...allPokemonDetail[index],
    }))

    return { results: allPokemonInfo, next, previous, count }
  } catch (error) {
    throw new Error('Failed to fetch Pokemon data')
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
