import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes >
      <Route path='/' element={<Home />} />
      <Route path= '/login' element={<Login />} />
      <Route path= '/login' element={<Signup />} />
    </Routes>
    </>
  )
}

export default App
