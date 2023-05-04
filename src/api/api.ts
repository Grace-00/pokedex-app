import axios from 'axios';

export const pokemonInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon',
});

export interface PokemonPage {
    allPokemonInfo: {
      name: string
      url: string
      // additional properties about a Pokemon
    }[]
    nextPage: string | null
    prevPage: string | null
}
  

export const getPokemonListFromCurrentPage = (currentPageUrl: string): Promise<PokemonPage> =>
  pokemonInstance.get(currentPageUrl).then(async res => {
    const allPokemonInfo = [];

    const allPokemon = res.data.results;
    const nextPage = res.data.next;
    const prevPage = res.data.previous;

    for (let i = 0; i < allPokemon.length; i++) {
      const pokemonDetail = await fetch(allPokemon[i].url).then(pokemon =>
        pokemon.json(),
      );
      allPokemon[i] = {...pokemonDetail};
      allPokemonInfo.push(allPokemon[i]);
    }
    return {allPokemonInfo, nextPage, prevPage};
});

export const getPokemonDetail = async (id: number) => {
  return await pokemonInstance.get(`${id}`);
};