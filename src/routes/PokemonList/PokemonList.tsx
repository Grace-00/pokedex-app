import React, { useState, useEffect, FC } from 'react'
import { fetchPokemonData } from '../../api/api'
import { PokemonCard } from '../../components/PokemonCard'
import './pokemonList.css'
import { Button } from '../../components/Button/'
import { Pokemon, PokemonPage } from '../../types'
import {
  extractOffsetFromUrl,
  handlePageChange,
  useLoadingState,
} from '../../helpers'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'

const PokemonList: FC = () => {
  const [pokemonData, setPokemonData] = useState<PokemonPage>({
    results: [],
    next: null,
    previous: null,
    count: 0,
  })
  const [offset, setOffset] = useState(0)
  const { isLoading, setIsLoading } = useLoadingState()
  const [error, setError] = useState('')

  const fetchData = async (offset: number) => {
    try {
      const data = await fetchPokemonData(offset)
      setPokemonData(data)
      setIsLoading(!isLoading)
    } catch (error) {
      setError('Unable to fetch Pokemon list')
      setIsLoading(!isLoading)
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
    setIsLoading(!isLoading)
  }

  const handlePrevPage = () => {
    if (pokemonData.previous) {
      const newOffset = extractOffsetFromUrl(pokemonData.previous)
      const updatedOffset = handlePageChange(newOffset, offset)
      setOffset(updatedOffset)
    }
    setIsLoading(!isLoading)
  }

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
