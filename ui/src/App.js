import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginPage from './LoginPage.js';
import Register from './Register.js';
import Home from './Home.js';
import Inventory from './Inventory.js';
import Indevidual from './Individual.js';
import EditItem from './EditPage.js';
import CreateItem from './CreateItem.js';
import Logout from './Logout.js';
import ManagerIndevidual from './ManagerIndiv.js';


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
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/registration" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/inventory" element={auth ? <Inventory /> : <Navigate to='/home' />} />
            <Route path="/individual/:itemname" element={<Indevidual />} />
            <Route path="/editpage/:itemname" element={auth ? <EditItem /> : <Navigate to='/home' />} />
            <Route path='/createitem' element={auth ? <CreateItem /> : <Navigate to='/home' />} />
            <Route path='/managerindiv/:itemname' element={auth ? <ManagerIndevidual /> : <Navigate to='/home' />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;