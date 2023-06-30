import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import EntryPoint from './EntryPoint'
import './index.css'
import { store } from '../store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root') as Element)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter
        basename={document.baseURI.substring(
          document.baseURI.indexOf(window.location.origin) +
            window.location.origin.length,
          document.baseURI.lastIndexOf('/')
        )}
      >
        <EntryPoint />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
