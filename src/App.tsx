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
import RatingPage from './pages/ratingPage'
import Register from './pages/register'
import RegisterPersonalInfo from './pages/registerPersonalInfo'
import RegisterPets from './pages/registerPets'
import RegisterPetSitter from './pages/registerPetSitter'
import WannaBePetSitter from './pages/wannaBePetsitter'

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/personal" element={<RegisterPersonalInfo />} />
          <Route path="/pets" element={<RegisterPets />} />
          <Route path="/bepetsitter" element={<WannaBePetSitter />} />
          <Route path="/regpetsitter" element={<RegisterPetSitter />} />
          <Route path="/home" element={<HomeUser />} />
          <Route path="/homepetsitter" element={<HomePetSitter />} />
          <Route path="/user" element={<PageUser />} />
          <Route path="/petsitter" element={<PagePetSitter />} />
          <Route path="/rating" element={<RatingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
