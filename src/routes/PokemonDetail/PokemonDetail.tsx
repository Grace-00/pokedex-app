import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPokemonDetail } from '../../api/api'
import { PokemonCardDetail } from '../../components/PokemonCardDetail'
import { Pokemon } from '../../types'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { useLoadingState } from '../../helpers'

const PokemonDetail = () => {
  const { pokemonName } = useParams()
  const [pokemon, setPokemon] = useState<Pokemon>()
  const { isLoading, setIsLoading } = useLoadingState()
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        if (pokemonName) {
          const response = await getPokemonDetail(pokemonName)
          if (response) {
            const pokemonData = response.data
            setPokemon(pokemonData)
          }
          setIsLoading(!isLoading)
        }
      } catch (error) {
        setError('Unable to fetch Pokemon')
      }
      setIsLoading(!isLoading)
    }

    fetchPokemon()
  }, [pokemonName])

  if (!pokemon || isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <div>{error}</div>
  }

  return <PokemonCardDetail pokemon={pokemon} />
}

export default PokemonDetail
