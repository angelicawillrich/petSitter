import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo_white.svg'
import Menu from '../menu'
import { StoreContext } from '../../context/context'

const Header = () => {
  const { loggedInUser } = useContext(StoreContext)
  const navigate = useNavigate()

  const redirect = () => {
    if (loggedInUser?.isPetSitter) {
      navigate(`/homepetsitter/${loggedInUser?._id}`)
    } else {
      navigate('/')
    }
  }
  return (
    <div className="flex w-full items-center justify-center p-2 bg-purple-900 flex-col max-w-6xl relative">
      <button type="button" onClick={() => redirect()}>
        <img src={Logo} className="h-8" alt="logo" />
      </button>
      <Menu />
    </div>
  )
}

export default Header
