import axios from 'axios'
import { Sprites } from '../types'

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

export const getPokemonListFromCurrentPage = (
  currentPageUrl: string,
  limit = 20,
  offset = 0
): Promise<PokemonPage> =>
  pokemonInstance
    .get(currentPageUrl, { params: { limit, offset } })
    .then(async (res) => {
      const allPokemonInfo = []

      const allPokemon = res.data.results
      const nextPage = res.data.next
      const prevPage = res.data.previous

      for (let i = 0; i < allPokemon.length; i++) {
        const pokemonDetail = await fetch(allPokemon[i].url).then((pokemon) =>
          pokemon.json()
        )
        allPokemon[i] = { ...allPokemon[i], ...pokemonDetail }
        allPokemonInfo.push(allPokemon[i])
      }
      return { allPokemonInfo, nextPage, prevPage }
    })

export const getPokemonDetail = async (name: string) => {
  if (name !== undefined) {
    return await pokemonInstance.get(`${name}`)
  }
}
