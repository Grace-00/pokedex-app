import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Pages } from '../../types'
import './header.css'
import { useAppSelector } from '../../redux/selectors'

const Header: FC = () => {
  const favorites = useAppSelector((state) => state.favorites.favorites)

  return (
    <header className="header">
      <Link to={Pages.PokemonList} className="header-link">
        <h1>Pokedex</h1>
      </Link>
      {favorites.length > 0 && (
        <Link to={Pages.Favourites} className="header-link">
          <h1>Favourites</h1>
        </Link>
      )}
    </header>
  )
}

export default Header
