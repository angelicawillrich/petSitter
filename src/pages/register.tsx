import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import Button from '../components/baseComponents/button'
import Input from '../components/baseComponents/input'

const Register = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <img src={Logo} alt="logo" />
      <Input
        label="Informe seu e-mail"
        placeholder="johndoe@example.com"
      />
      <Input
        label="Digite uma senha"
        placeholder="**********"
        type="password"
      />
      <Input
        label="Repita a senha"
        placeholder="**********"
        type="password"
      />
      <Button>Criar conta</Button>
      <button
        type="button"
        className="w-fit text-base decoration-transparent border-b-[1px] p-0 m-0 leading-none"
        onClick={() => { navigate('/login') }}
      >
        Já possuo uma conta
      </button>
    </div>
  )
}

export default Register
