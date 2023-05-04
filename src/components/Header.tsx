import React from 'react'
import { Link } from 'react-router-dom';
import { Pages } from '../types';
import './header.css'

const Header = () => {
  return (
    <header className='header'>
      <Link to={Pages.Home} className='header-link'>
          <h1>Pokedex</h1>
      </Link>
    </header>
  );
};

export default Header