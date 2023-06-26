import React, { FC, useEffect, useState } from 'react'
import './pokemonCard.css'
import { Link } from 'react-router-dom'
import { Pokemon } from '../../types'
import { Button } from '../Button'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
export interface PokemonCardProps {
  readonly pokemon: Pokemon
  readonly onFavourite: (pokemon: Pokemon) => void
  readonly favourites: Pokemon[]
}

const PokemonCard: FC<PokemonCardProps> = ({
  pokemon,
  onFavourite,
  favourites,
}) => {
  const frontDefaultImage = pokemon.sprites?.front_default
  const [isHeartClicked, setIsHeartClicked] = useState(
    localStorage.getItem(`isHeartClicked${pokemon.name}`) === 'true' || false
  )

  useEffect(() => {
    if (!favourites.some((favPokemon) => favPokemon.name === pokemon.name)) {
      setIsHeartClicked(false)
    }
    localStorage.setItem(
      `isHeartClicked${pokemon.name}`,
      isHeartClicked.toString()
    )
  }, [isHeartClicked, pokemon.name, favourites])

  const handleFavourite = () => {
    onFavourite(pokemon)
    setIsHeartClicked(!isHeartClicked)
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
          isHeartClicked ? (
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
