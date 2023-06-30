import React, { FC, useEffect, useState } from 'react'
import './pokemonCard.css'
import { Link } from 'react-router-dom'
import { Pokemon } from '../../types'
import { Button } from '../Button'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { addFavorite, removeFavorite } from '../../redux/slices/favouritesSlice'
import { useAppDispatch, useAppSelector } from '../../redux/selectors'
export interface PokemonCardProps {
  readonly pokemon: Pokemon
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  const dispatch = useAppDispatch()
  const frontDefaultImage = pokemon.sprites?.front_default
  const favourites = useAppSelector((state) => state.favorites.favorites)
  const isFavourite = favourites.includes(pokemon)
  const [isHeartClicked, setIsHeartClicked] = useState(isFavourite)

  useEffect(() => {
    const storedIsHeartClicked =
      localStorage.getItem(`isHeartClicked-${pokemon.name}`) === 'true'
    setIsHeartClicked(storedIsHeartClicked)
  }, [pokemon.name])

  const handleFavourite = () => {
    if (!isHeartClicked) {
      dispatch(addFavorite(pokemon))
      setIsHeartClicked(true)
      localStorage.setItem(`isHeartClicked-${pokemon.name}`, 'true')
    } else {
      dispatch(removeFavorite(pokemon))
      setIsHeartClicked(false)
      localStorage.setItem(`isHeartClicked-${pokemon.name}`, 'false')
    }
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
