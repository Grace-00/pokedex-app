import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Home } from './routes/Home';
// import { Detail } from './routes/Detail';
import { Pages } from './types';


const EntryPoint = () => {
  return (
    <>
       <Routes>
          <Route path={Pages.Home} element={<Home />} />

          {/* TO CONFIG WITH FETCHED DATA */}
          {/* <Route path={Pages.Detail} element={<Detail />} /> */} 
       </Routes>
    </>
 );
};

export default EntryPoint