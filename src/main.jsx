import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import { HashRouter } from 'react-router-dom'
import UsersProvider from './Context/UsersProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <UsersProvider>
        <App />
      </UsersProvider>
    </HashRouter>
  </StrictMode>,
)
