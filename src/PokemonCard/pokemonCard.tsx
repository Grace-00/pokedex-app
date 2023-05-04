import React, { FC } from 'react'
import './pokemonCard.css'


export interface PokemonCardProps {
  name: string
  url: string
}

const PokemonCard: FC<PokemonCardProps> = ({name, url}) => {

  return (
    <main className='pokemonList'>
      <h1>{name}</h1>
    </main>
  );
};

export default PokemonCard