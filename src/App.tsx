import React from 'react'
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom'
import Layout from './components/layout'
import HomePetSitter from './pages/homePetSitter'
import HomeUser from './pages/homeUser'
import Login from './pages/login'
import PagePetSitter from './pages/pagePetSitter'
import PageUser from './pages/pageUser'
import Register from './pages/register'
import RegisterProfile from './pages/registerProfile'
import RegisterPets from './pages/registerPets'
import RegisterPetSitter from './pages/registerPetSitter'
import WannaBePetSitter from './pages/wannaBePetsitter'
import { ContextProvider } from './context/context'

const App = () => {
  return (

    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<RegisterProfile />} />
            <Route path="/pets" element={<RegisterPets />} />
            <Route path="/bepetsitter" element={<WannaBePetSitter />} />
            <Route path="/registerpetsitter" element={<RegisterPetSitter />} />
            <Route path="/" element={<HomeUser />} />
            <Route path="/homepetsitter/:petSitterId" element={<HomePetSitter />} />
            <Route path="/user/:userId" element={<PageUser />} />
            <Route path="/petsitter/:petSitterId" element={<PagePetSitter />} />
            <Route path="*" element={<HomeUser />} />
          </Route>
        </Routes>
      </ContextProvider>
    </BrowserRouter>

  )
}

export default App
