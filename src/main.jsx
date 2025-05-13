import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TextBox from './components/textbox/textbox.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TextBox />
  </StrictMode>,
)
