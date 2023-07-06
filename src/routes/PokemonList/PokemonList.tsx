import React, { FC } from 'react'
import { PokemonCard } from '../../components/PokemonCard'
import './pokemonList.css'
import { Button } from '../../components/Button/'
import { Pokemon } from '../../types'
import { usePagination, usePokemonData } from '../../helpers'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'

const PokemonList: FC = () => {
  const { pokemonData, isLoading, error } = usePokemonData()
  const { handlePrevPage, handleNextPage } = usePagination(pokemonData)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <div className="pokemon-list-container">
        <div className="pokemon-list">
          {pokemonData.results.map((pokemon: Pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      </div>
      <div className="pokemon-list-btn-container">
        <Button
          disabled={!pokemonData.previous}
          onClick={handlePrevPage}
          className={'icon-arrow-back'}
          icon={<AiOutlineArrowLeft size={24} />}
        />
        <Button
          disabled={!pokemonData.next}
          onClick={handleNextPage}
          className={'icon-arrow-forward'}
          icon={<AiOutlineArrowRight size={24} />}
        />
      </div>
    </>
  )
}

export default PokemonList
