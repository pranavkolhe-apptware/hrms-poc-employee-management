import { useState } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Settings from './pages/Settings'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
            <Dashboard>
              <Home/>
            </Dashboard>
          } 
        />
        <Route path="/dashboard/settings" element={
            <Dashboard>
              <Settings/>
            </Dashboard>
          } 
        />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
