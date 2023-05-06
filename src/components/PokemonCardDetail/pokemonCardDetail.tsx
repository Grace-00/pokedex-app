import React, { FC } from 'react'
import './pokemonCardDetail.css'
import { Sprites } from '../../api/api'
import { Link } from 'react-router-dom'

export interface PokemonCardProps {
  pokemon: Pokemon
}

export interface Pokemon {
  name: string
  url: string
  sprites: Sprites
}

const PokemonCardDetail: FC<PokemonCardProps> = ({ pokemon }) => {
  console.log(pokemon)
  const frontDefaultImage = pokemon.sprites?.front_default || 'img not found'
  return (
    <div className="pokemon-card-detail">
      <h1>{pokemon.name}</h1>
      <img src={frontDefaultImage} alt={`image of: ${pokemon.name}`} />
    </div>
  )
}

export default PokemonCardDetail
