import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { PokemonList } from './routes/PokemonList';
// import { Detail } from './routes/Detail';
import { Pages } from './types';
import { Header } from './components/Header';


const EntryPoint = () => {
  return (
    <>
      <Header />
       <Routes>
          <Route path={Pages.PokemonList} element={<PokemonList />} />

          {/* TO CONFIG WITH FETCHED DATA */}
          {/* <Route path={Pages.Detail} element={<Detail />} /> */} 
       </Routes>
    </>
 );
};

export default EntryPoint