import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../assets/logo.svg'
import Button from '../components/baseComponents/button'
import Input from '../components/baseComponents/input'

interface IForm {
  email: string
  password: string
}

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<IForm>(initialState)

  const handleChange = (field: keyof IForm, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await axios.post(
        'http://127.0.0.1:3000/login',
        formData,
      )

      if (!response.data.user[0].name) {
        navigate('/personal')
      } else {
        navigate('/home')
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
          type="button"
          className="w-fit text-base decoration-transparent border-b-[1px] p-0 m-0 leading-none"
          onClick={() => {}}
        >
          Esqueceu sua senha?
        </button>
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
