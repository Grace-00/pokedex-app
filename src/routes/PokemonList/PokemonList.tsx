import React, { useState, useEffect } from 'react'
import { getPokemonListFromCurrentPage, PokemonPage } from '../../api/api'
import { PokemonCard } from '../../PokemonCard'

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'

const PokemonList = () => {
  const [pokemonPage, setPokemonPage] = useState<PokemonPage>({
    allPokemonInfo: [],
    nextPage: null,
    prevPage: null,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchFirstPage = async () => {
      try {
        const { allPokemonInfo, nextPage, prevPage } =
          await getPokemonListFromCurrentPage(BASE_URL)
        setPokemonPage({ allPokemonInfo, nextPage, prevPage })
        setIsLoading(false)
      } catch (err) {
        setError('Unable to fetch Pokemon list')
        setIsLoading(false)
      }
    }
    fetchFirstPage()
  }, [])

  const handleNextPage = async () => {
    const { allPokemonInfo, nextPage, prevPage } =
      await getPokemonListFromCurrentPage(pokemonPage.nextPage ?? BASE_URL)
    setPokemonPage((prevPageState) => ({
      ...prevPageState,
      allPokemonInfo: [...allPokemonInfo.slice(0, 20)],
      nextPage,
      prevPage,
    }))
  }

  const handlePrevPage = async () => {
    if (pokemonPage.prevPage) {
      const { allPokemonInfo, nextPage, prevPage } =
        await getPokemonListFromCurrentPage(pokemonPage.prevPage)
      setPokemonPage((prevPageState) => ({
        ...prevPageState,
        allPokemonInfo: allPokemonInfo.slice(-20),
        nextPage,
        prevPage,
      }))
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <div>
        {pokemonPage.allPokemonInfo.map((pokemon) => {
          return <PokemonCard key={pokemon.name} pokemon={pokemon} />
        })}
      </div>
      <button onClick={handlePrevPage}>Previous Page</button>
      <button onClick={handleNextPage}>Next Page</button>
    </>
  )
}

export default PokemonList
