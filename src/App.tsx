import React from 'react'
import Header from './components/header'
import HomeUser from './pages/homeUser'
import Login from './pages/login'
import PagePetSitter from './pages/pagePetSitter'
import Register from './pages/register'
import RegisterPersonalInfo from './pages/registerPersonalInfo'
import RegisterPets from './pages/registerPets'
import RegisterPetSitter from './pages/registerPetSitter'
import WannaBePetSitter from './pages/wannaBePetsitter'

const App = () => {
  return (
    <div className="flex flex-col flex-1 w-full">
      <Header />
      <div className="flex flex-col w-full items-center justify-center px-[10%] py-[5%]">
        <PagePetSitter />
      </div>
    </div>
  )
}

export default App
