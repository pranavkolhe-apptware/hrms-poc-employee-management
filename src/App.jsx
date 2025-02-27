import { useState } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Clients from './pages/Clients'
import People from './pages/People'
import Projects from './pages/Projects'
import ClientDetails from "./pages/ClientDetails";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Login />} />
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
<Route path="/clients/:clientId" element=
{
  <Dashboard>
<ClientDetails />
</Dashboard>
} />

      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
