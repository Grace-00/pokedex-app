import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Pages } from '../../types'
import './header.css'

export interface HeaderProps {
  readonly hasFavourites: boolean
}

const Header: FC<HeaderProps> = (props: HeaderProps) =>  {
  return (
    <header className="header">
      <Link to={Pages.PokemonList} className="header-link">
        <h1>Pokedex</h1>
      </Link>
      {props.hasFavourites && (
        <Link to={Pages.Favourites} className="header-link">
          <h1>Favourites</h1>
        </Link>
      )}
    </header>
  )
}

export default Header
