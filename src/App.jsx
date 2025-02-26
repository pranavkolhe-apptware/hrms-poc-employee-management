import { useState } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Clients from './pages/Clients'
import People from './pages/People'
import Projects from './pages/Projects'

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
        <Route path="/dashboard/people" element={
            <Dashboard>
              <People/>
            </Dashboard>
          } 
        />
        <Route path="/dashboard/projects" element={
            <Dashboard>
              <Projects/>
            </Dashboard>
          } 
        />
        <Route path="/dashboard/clients" element={
            <Dashboard>
              <Clients/>
            </Dashboard>
          } 
        />


      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
