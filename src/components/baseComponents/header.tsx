import React from 'react'
import Logo from '../../assets/logo_white.svg'
import Menu from '../menu'

const Header = () => {
  return (
    <div className="flex w-full items-center justify-center p-2 bg-purple-900 flex-col max-w-6xl  px-[5%] md:px-[10%] relative">
      <img src={Logo} className="h-8" alt="logo" />
      <Menu />
    </div>
  )
}

export default Header
