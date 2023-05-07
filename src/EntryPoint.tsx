import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { PokemonList } from './routes/PokemonList'
import { Pages } from './types'
import { Header } from './components/Header'
import { PokemonDetail } from './routes/Detail'
import { NotFound } from './routes/NotFound'

const EntryPoint = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={Pages.PokemonList} element={<PokemonList />} />

        <Route path={Pages.PokemonCard} element={<PokemonDetail />} />
        <Route path={Pages.NotFound} element={<NotFound />} />
      </Routes>
    </>
  )
}

export default EntryPoint
