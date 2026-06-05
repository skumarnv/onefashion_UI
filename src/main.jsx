import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TextBox from './components/TextBox/TextBox.jsx';
import Register from './pages/Register/Register.jsx';
import AuthLanding from './pages/Login/AuthLanding.jsx';
import DashboardLayout from './pages/Dashboard/Dashboard.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
