import React, { FC } from 'react'
import './pokemonCard.css'
import { Sprites } from '../api/api'

export interface PokemonCardProps {
  pokemon: Pokemon
}

interface Pokemon {
  name: string
  url: string
  sprites: Sprites
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  const img = pokemon.sprites?.front_default || 'img not found'
  return (
    <main className="pokemonList">
      <h1>{pokemon.name}</h1>
      <img src={img} />
    </main>
  )
}

export default PokemonCard
