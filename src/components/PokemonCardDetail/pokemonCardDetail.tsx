import React, { FC } from 'react'
import './pokemonCardDetail.css'
import { useNavigate } from 'react-router-dom'
import { Pokemon } from '../PokemonCard/pokemonCard'

export interface PokemonCardDetailProps {
  pokemon: Pokemon
}

const PokemonCardDetail: FC<PokemonCardDetailProps> = ({ pokemon }) => {
  const frontDefaultImage =
    pokemon.sprites?.front_default || `image of ${pokemon.name} not found`

  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }
  console.log(pokemon)
  const { height, weight, stats, types, moves } = pokemon
  return (
    <>
      <button onClick={handleGoBack}>Back</button>
      <div className="pokemon-card-detail">
        <h1>{pokemon.name}</h1>
        <img src={frontDefaultImage} alt={`image of: ${pokemon.name}`} />
      </div>
      <>
        <div>
          <h2>Height:</h2>
          <label>{height}</label>
        </div>
        <div>
          <h2>Weight:</h2>
          <label>{weight}</label>
        </div>
        <div>
          <h2>Types:</h2>
          <label>
            {types?.map((type) => type.type.name).join(' ')}
          </label>
        </div>
        <div>
          <h2>Stats</h2>
          <label>
            {stats?.map((stat) => {
              return (
                <div key={stat.stat.name}>
                  <label>{stat.stat.name}</label>
                  <progress value={stat.base_stat} max="100"></progress>
                </div>
              )
            })}
          </label>
        </div>
        <div>
          <h2>Moves:</h2>
          <label>
            {moves?.map((move) => move.move.name).join(' ')}
          </label>
        </div>
      </>
    </>
  )
}

export default PokemonCardDetail
