import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TextBox from './components/textbox/textbox.jsx';
import Register from './container/register/register.jsx';
import AuthLanding from './container/login/authlanding.jsx';
import DashboardLayout from './container/dashboard/dashboard.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <TextBox /> */}
    <DashboardLayout />
    {/* <AuthLanding/> */}
  </StrictMode>,
)
