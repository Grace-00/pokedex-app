import React, { FC, useEffect } from 'react'
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
  const frontDefaultImage = pokemon.sprites?.front_default
  const favourites = useAppSelector((state) => state.favorites.favorites)
  const isFavourite = favourites.includes(pokemon)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const isFav = localStorage.getItem(`isFavourite-${pokemon.name}`)
    if (isFav !== null) {
      const storedIsFavourite = JSON.parse(isFav)
      if (storedIsFavourite !== isFavourite) {
        storedIsFavourite
          ? dispatch(addFavorite(pokemon))
          : dispatch(removeFavorite(pokemon))
      }
    }
  }, [pokemon.name, isFavourite, dispatch, pokemon])

  const handleFavourite = () => {
    if (!isFavourite) {
      dispatch(addFavorite(pokemon))
      localStorage.setItem(`isFavourite-${pokemon.name}`, 'true')
    } else {
      dispatch(removeFavorite(pokemon))
      localStorage.setItem(`isFavourite-${pokemon.name}`, 'false')
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
          isFavourite ? (
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
