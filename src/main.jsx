import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import { BrowserRouter } from 'react-router-dom'
import UsersProvider from './Context/UsersProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UsersProvider>
        <App />
      </UsersProvider>
    </BrowserRouter>
  </StrictMode>,
)
