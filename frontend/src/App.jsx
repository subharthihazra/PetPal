import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdoptSearch from './pages/AdoptSearch'
import Upload from './pages/Upload'
import PrivateRouter from './Hooks/PrivateRouter'


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Routes >
      <Route path='/' element={<Home />} />
      <Route path= '/login' element={<Login />} />
      <Route path= '/signup' element={<Signup />} />
      <Route path='/adopt' element={<AdoptSearch />} />
      <Route
          path="/rehome"
          element={
            <PrivateRouter>
              <Upload />
            </PrivateRouter>
          }
        />
      <Route path="/rehome" element={<Upload />} />
    </Routes>
    </>
  );
}

export default App;
