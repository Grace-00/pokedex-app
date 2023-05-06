import React, { FC } from 'react'
import './pokemonCard.css'
import { Sprites } from '../../api/api'
import { Link } from 'react-router-dom'

export interface PokemonCardProps {
  pokemon: Pokemon
}

export interface Pokemon {
  name: string
  url: string
  sprites: Sprites
  height?: number
  weight?: number
  types?: Types[]
  moves?: Moves[]
  stats?: Stats[]
}
export interface Types {
  type: {
    name: string
    url: string
  }
}

export interface Moves {
  move: {
    name: string
    url: string
  }
}

export interface Stats {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  const frontDefaultImage = pokemon.sprites?.front_default || 'img not found'
  return (
    <Link to={`/pokemon/${pokemon.name}`} className="pokemon-card-link">
      <div className="pokemon-card">
        <h1>{pokemon.name}</h1>
        <img src={frontDefaultImage} alt={`image of: ${pokemon.name}`} />
      </div>
    </Link>
  )
}

export default PokemonCard
