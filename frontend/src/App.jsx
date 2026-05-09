// frontend/src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import Login from './pages/Login';

import Register from './pages/Register';

import CreateAuction from './pages/CreateAuction';

import Dashboard from './pages/Dashboard';

import Profile from './pages/Profile';

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/login' element={<Login />} />

        <Route path='/register' element={<Register />} />

        <Route path='/create-auction' element={<CreateAuction />} />

        <Route path='/dashboard' element={<Dashboard />} />

        <Route path='/profile' element={<Profile />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;