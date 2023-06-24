import React, { FC, useState } from 'react'
import './pokemonCard.css'
import { Link } from 'react-router-dom'
import { Pokemon } from '../../types'
import { Button } from '../Button'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
export interface PokemonCardProps {
  readonly pokemon: Pokemon
  readonly onFavourite: (pokemon: Pokemon) => void
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon, onFavourite }) => {
  const frontDefaultImage = pokemon.sprites?.front_default || 'img not found'
  const [isIconClicked, setIsIconClicked] = useState(false)

  const handleFavourite = () => {
    onFavourite(pokemon)
    setIsIconClicked(!isIconClicked)
  }

  return (
    <div className="pokemon-card-container">
      <Link to={`/pokemon/${pokemon.name}`} className="pokemon-card-link">
        <div className="pokemon-card">
          <h1>{pokemon.name}</h1>
          <img src={frontDefaultImage} alt={`image of: ${pokemon.name}`} />
        </div>
      </Link>
      <Button
        disabled={false}
        icon={
          isIconClicked ? (
            <AiFillHeart
              size={24}
              style={{
                animation: 'fillHeart 2s linear forwards',
              }}
            />
          ) : (
            <AiOutlineHeart size={24} fill="red" />
          )
        }
        className="pokemon-card-favourite"
        onClick={handleFavourite}
      />
    </div>
  )
}

export default PokemonCard
