import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import Cookies from 'js-cookie';
import LoginPage from './LoginPage.js';
import Register from './Register.js';
import Home from './Home.js';
import Inventory from './Inventory.js';
import Indevidual from './Individual.js';


export const AuthContext = React.createContext();

function App() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      setAuth(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <PrimeReactProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/registration" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/inventory" element={auth ? <Inventory /> : <Navigate to='/home' />} />
            <Route path="/individual/:itemname" element={<Indevidual />} />
          </Routes>
        </PrimeReactProvider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;