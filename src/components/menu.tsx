import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdLogout } from 'react-icons/md'
import { StoreContext } from '../context/context'
import { generateInitialsAvatar } from '../utils'
import { path } from '../shared'
import { logout } from '../api/user.api'
import useOutsideClick from '../hooks'

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigate = useNavigate()

  const { loggedInUser } = useContext(StoreContext)

  const componentRef = useRef<HTMLInputElement>(null)

  useOutsideClick(componentRef.current, () => {
    setIsMenuOpen(false)
  })

  const handleLogout = async () => {
    await logout()
    setIsMenuOpen(false)
    navigate('/login')
  }
  return (
    loggedInUser && loggedInUser.name
      ? (
        <div
          className="flex flex-col max-w-xs absolute right-0 top-1 transition-all"
          ref={componentRef as any}
        >
          <button
            type="button"
            className="right-1 absolute w-10 h-10"
            onClick={() => setIsMenuOpen((previousState) => !previousState)}
          >
            {loggedInUser?.profilePicture
              ? (
                <img
                  src={`${path}${loggedInUser.profilePicture}`}
                  alt="Foto de perfil"
                  className="w-9 h-9 rounded-full"
                />
              )
              : generateInitialsAvatar(loggedInUser?.name || '')}
          </button>
          {isMenuOpen
      && (
      <div className="flex flex-col mt-12 shadow-md p-2 bg-white gap-3 z-50">
        {!loggedInUser.isPetSitter && (
        <button
          type="button"
          className="hover:text-gray-900 transition-all w-fit"
          onClick={() => {
            navigate('/registerpetsitter')
            setIsMenuOpen(false)
          }}
        >
          Quero ser PetSitter

        </button>
        )}
        <button
          type="button"
          className="hover:text-gray-900 transition-all w-fit"
          onClick={() => {
            navigate('/profile')
            setIsMenuOpen(false)
          }}
        >
          Editar dados pessoais

        </button>
        <button
          type="button"
          className="hover:text-gray-900 transition-all w-fit"
          onClick={() => {
            navigate('/pets')
            setIsMenuOpen(false)
          }}
        >
          Editar pets

        </button>
        <div className="h-0.5 w-full bg-purple-100" />
        <button
          type="button"
          className="flex flex-row items-center gap-2 hover:text-gray-900 transition-all"
          onClick={() => handleLogout()}
        >
          <MdLogout />
          Sair
        </button>
      </div>
      )}

        </div>
      )
      : <></>

  )
}

export default Menu
