import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../assets/logo.svg'
import Button from '../components/baseComponents/button'
import Input from '../components/baseComponents/input'

interface IForm {
  email: string
  password: string
  passwordConfirmation: string
}

const initialState = {
  email: '',
  password: '',
  passwordConfirmation: '',
}

const Register = () => {
  const [formData, setFormData] = useState<IForm>(initialState)
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const handleChange = (field: keyof IForm, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (formData.password !== formData.passwordConfirmation) {
      setError(true)
      return
    }
    setError(false)

    try {
      const data = { email: formData.email, password: formData.password }
      await axios.post(
        'http://127.0.0.1:3000/user/create',
        data,
      )
      navigate('/login')
      setFormData(initialState)
      alert('Usuário criado com sucesso!')
    } catch (err: any) {
      console.error(error)
      alert(JSON.parse(err.request.responseText).message)
    }
  }

  return (
    <form onSubmit={onSubmit}>

      <div className="flex flex-col gap-4 justify-center items-center">
        <img src={Logo} alt="logo" />
        <Input
          name="email"
          label="Informe seu e-mail"
          placeholder="johndoe@example.com"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />
        <Input
          name="password"
          label="Digite uma senha"
          placeholder="**********"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          required
        />
        <div className="w-full">
          <Input
            label="Repita a senha"
            placeholder="**********"
            type="password"
            value={formData.passwordConfirmation}
            onChange={(e) => handleChange('passwordConfirmation', e.target.value)}
            required
          />
          {error && <span className="text-red-700 text-xs">Senhas não conferem.</span>}
        </div>
        <Button
          type="submit"
          disabled={!formData.email || !formData.password || !formData.passwordConfirmation}
        >
          Criar conta
        </Button>
        <button
          type="button"
          className="w-fit text-base decoration-transparent border-b-[1px] p-0 m-0 leading-none"
          onClick={() => navigate('/login')}
        >
          Já possuo uma conta
        </button>
      </div>
    </form>

  )
}

export default Register
