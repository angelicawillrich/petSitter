/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import Button from '../components/baseComponents/button'
import Input from '../components/baseComponents/input'
import { login } from '../api/user.api'
import { ILoginForm } from '../interfaces/interfaces'
import { StoreContext } from '../context/context'

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const [formData, setFormData] = useState<ILoginForm>(initialState)

  const navigate = useNavigate()

  const { getLoggedInUser } = useContext(StoreContext)

  const handleChange = (field: keyof ILoginForm, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await login(formData)
      localStorage.setItem('Token', response.data.token)
      await getLoggedInUser(response.data.user[0]._id)
      if (!response.data.user[0].name) {
        navigate('/profile')
      } else if (response.data.user[0]?.isPetSitter) {
        navigate(`/homepetsitter/${response.data.user[0]?._id}`)
      } else {
        navigate('/')
      }
    } catch (error:any) {
      console.error({ error })
      alert(JSON.parse(error.request.responseText).message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 justify-center items-center">
        <img src={Logo} alt="PetSitter logomarca" />
        <Input
          name="email"
          label="E-mail"
          placeholder="johndoe@example.com"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        <Input
          name="password"
          label="Senha"
          placeholder="**********"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
        />
        <Button type="submit">Entrar</Button>
        <button
          type="submit"
          className="w-fit text-base decoration-transparent border-b-[1px] p-0 m-0 leading-none"
          onClick={() => navigate('/register')}
        >
          Não possui conta? Crie uma agora!
        </button>
      </div>
    </form>
  )
}

export default Login
