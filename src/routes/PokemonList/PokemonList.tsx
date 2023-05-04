import React from 'react'
import { PokemonPage, getPokemonListFromCurrentPage } from '../../api/api';
import { PokemonCard } from '../../PokemonCard';

const PokemonList = () => {
  const [pokemonPage, setPokemonPage] = React.useState<PokemonPage>({
    allPokemonInfo: [],
    nextPage: null,
    prevPage: null,
  });

  React.useEffect(() => {
    async function fetchFirstPage() {
      const { allPokemonInfo, nextPage, prevPage } = await getPokemonListFromCurrentPage(
        'https://pokeapi.co/api/v2/pokemon',
      );
      setPokemonPage({
        allPokemonInfo,
        nextPage,
        prevPage,
      });
    }
    fetchFirstPage();
  }, []);
  
  const handleLoadMore = async () => {
    const { allPokemonInfo, nextPage, prevPage } = await getPokemonListFromCurrentPage(
      pokemonPage.nextPage || 'https://pokeapi.co/api/v2/pokemon',
    );
    setPokemonPage((prevPageState) => ({
      ...prevPageState,
      allPokemonInfo: [...prevPageState.allPokemonInfo, ...allPokemonInfo],
      nextPage,
      prevPage,
    }));
  };

  return (
    <main className='pokemonList'>
      {pokemonPage.allPokemonInfo.map(pokemon => (
        <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
      ))}
      <button onClick={handleLoadMore}>Load More</button>
    </main>
  );
}

export default PokemonList