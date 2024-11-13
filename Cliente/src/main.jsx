import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import { Mrutas } from './Mrutas'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
  <Mrutas></Mrutas>
  </StrictMode>
  </BrowserRouter>,
)
