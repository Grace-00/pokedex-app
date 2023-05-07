import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPokemonDetail } from '../../api/api'
import { PokemonCardDetail } from '../../components/PokemonCardDetail'
import { Pokemon } from '../../types'

const PokemonDetail = () => {
  const { pokemonName } = useParams()
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [isLoading, setIsLoading] = useState(true)
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
          setIsLoading(false)
        }
      } catch (error) {
        setError('Unable to fetch Pokemon')
        setIsLoading(false)
      }
    }

    fetchPokemon()
  }, [pokemonName])

  if (!pokemon || isLoading) {
    return (<div className="loading-circle">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    </div>)
  }

  if (error) {
    return <div>{error}</div>
  }

  return <PokemonCardDetail pokemon={pokemon} />
}

export default PokemonDetail
