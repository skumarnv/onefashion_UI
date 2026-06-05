import { useState } from 'react';
import './App.css';
import AuthLanding from './pages/Login/AuthLanding.jsx';
import DashboardLayout from './pages/Dashboard/Dashboard.jsx';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    console.log('User logged in:', userData);
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      {user ? (
        <DashboardLayout user={user} onLogout={handleLogout} />
      ) : (
        <AuthLanding onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
