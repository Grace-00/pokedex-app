import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { PokemonList } from './routes/PokemonList'
import { Pages } from './types'
import { Header } from './components/Header'
import { PokemonDetail } from './routes/PokemonDetail'
import { NotFound } from './routes/NotFound'
import { Favourites } from './routes/Favourites'

const EntryPoint = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={Pages.PokemonList} element={<PokemonList />} />

        <Route path={Pages.PokemonCard} element={<PokemonDetail />} />
        <Route path={Pages.Favourites} element={<Favourites />} />
        <Route path={Pages.NotFound} element={<NotFound />} />
      </Routes>
    </>
  )
}

export default EntryPoint
