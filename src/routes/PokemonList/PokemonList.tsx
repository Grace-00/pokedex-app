import React, { useState, useEffect, FC } from 'react'
import { fetchPokemonData, PokemonPage } from '../../api/api'
import { PokemonCard } from '../../components/PokemonCard'
import './pokemonList.css'
import { Button } from '../../components/Button/'
import { Pokemon } from '../../types'
import { extractOffsetFromUrl, handlePageChange } from '../../helpers'

export interface PokemonListProps {
  readonly onFavourite: (pokemon: Pokemon) => void
}

const PokemonList: FC<PokemonListProps> = (props: PokemonListProps) => {
  const [pokemonData, setPokemonData] = useState<PokemonPage>({
    results: [],
    next: null,
    previous: null,
  })
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async (offset: number) => {
    try {
      const data = await fetchPokemonData(offset)
      setPokemonData(data)
      setIsLoading(false)
    } catch (error) {
      setError('Unable to fetch Pokemon list')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData(offset)
  }, [offset])

  const handleNextPage = () => {
    if (pokemonData.next) {
      const newOffset = extractOffsetFromUrl(pokemonData.next)
      const updatedOffset = handlePageChange(newOffset, offset)
      setOffset(updatedOffset)
    }
  }

  const handlePrevPage = () => {
    if (pokemonData.previous) {
      const newOffset = extractOffsetFromUrl(pokemonData.previous)
      const updatedOffset = handlePageChange(newOffset, offset)
      setOffset(updatedOffset)
    }
  }

  if (isLoading) {
    return (
      <div className="loading-circle">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }

  if (error) {
    return <div>{error}</div>
  }
  return (
    <>
      <div className="pokemon-list-container">
        <div className="pokemon-list">
          {pokemonData.results.map((pokemon: Pokemon) => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              onFavourite={props.onFavourite}
            />
          ))}
        </div>
      </div>
      <div className="pokemon-list-btn-container">
        <Button
          onClick={handlePrevPage}
          className={'icon-arrow-back'}
          icon={`./arrow-back.svg`}
        />
        <Button
          onClick={handleNextPage}
          className={'icon-arrow-forward'}
          icon={`./arrow-forward.svg`}
        />
      </div>
    </>
  )
}

export default PokemonList
