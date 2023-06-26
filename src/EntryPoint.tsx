import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PokemonList } from './routes/PokemonList'
import { Pages, Pokemon } from './types'
import { Header } from './components/Header'
import { PokemonDetail } from './routes/PokemonDetail'
import { NotFound } from './routes/NotFound'
import { getFavourites, toggleFavourite } from './api/api'
import { Favourites } from './Favourites'

const EntryPoint = () => {
  const [favourites, setFavourites] = useState<Pokemon[]>([])

  const handleFavourite = (pokemon: Pokemon) => {
    try {
      toggleFavourite(pokemon)
      setFavourites(getFavourites())
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const storedFavourites = localStorage.getItem('favourites')
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites))
    }
  }, [])

  return (
    <>
      <Header hasFavourites={favourites.length > 0} />
      <Routes>
        <Route
          path={Pages.PokemonList}
          element={
            <PokemonList
              onFavourite={handleFavourite}
              favourites={favourites}
            />
          }
        />

        <Route path={Pages.PokemonCard} element={<PokemonDetail />} />
        <Route
          path={Pages.Favourites}
          element={
            <Favourites favourites={favourites} onFavourite={handleFavourite} />
          }
        />
        <Route path={Pages.NotFound} element={<NotFound />} />
      </Routes>
    </>
  )
}

export default EntryPoint
