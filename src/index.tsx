import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import EntryPoint from './EntryPoint'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as Element)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <EntryPoint />
    </BrowserRouter>
  </React.StrictMode>
)
