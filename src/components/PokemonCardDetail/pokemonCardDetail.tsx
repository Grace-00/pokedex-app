import React, { FC } from 'react'
import './pokemonCardDetail.css'
import { useNavigate } from 'react-router-dom'
import { Pokemon } from '../PokemonCard/pokemonCard'
import { Button } from '../Button'

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

  const { height, weight, stats, types, moves } = pokemon
  return (
    <>
      <div className="pokemon-card-detail-container">
        <Button className="pokemon-card-detail-back" onClick={handleGoBack} icon={`./icon-arrow-back.svg`} />
        <div className="pokemon-card-detail-name">
          <h1>{pokemon.name}</h1>
          <img src={frontDefaultImage} alt={`image of: ${pokemon.name}`} />
        </div>
        <div className="pokemon-card-detail-height">
          <h2>Height</h2>
          <label>{height}</label>
        </div>
        <div className="pokemon-card-detail-weight">
          <h2>Weight</h2>
          <label>{weight}</label>
        </div>
        <div className="pokemon-card-detail-types">
          <h2>Types</h2>
          <label>{types?.map((type) => type.type.name).join(' ')}</label>
        </div>
        <div className="pokemon-card-detail-stats-container">
          <h2>Stats</h2>
          <div className="pokemon-card-detail-stats-wrapper">
            {stats?.map((stat) => {
              return (
                <div key={stat.stat.name} className="pokemon-card-detail-stat">
                  <label>{stat.stat.name}</label>
                  <progress value={stat.base_stat} max="100" />
                </div>
              )
            })}
          </div>
        </div>
        <div className="pokemon-card-detail-moves">
          <h2>Moves</h2>
          <label>{moves?.map((move) => move.move.name).join(' ')}</label>
        </div>
      </div>
    </>
  )
}

export default PokemonCardDetail
