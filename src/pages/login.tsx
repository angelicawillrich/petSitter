import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import Button from '../components/baseComponents/button'
import Input from '../components/baseComponents/input'

const Login = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <img src={Logo} alt="PetSitter logomarca" />
      <Input
        label="E-mail"
        placeholder="johndoe@example.com"
      />
      <Input
        label="Senha"
        placeholder="**********"
        type="password"
      />
      <Button>Entrar</Button>
      <button
        type="button"
        className="w-fit text-base decoration-transparent border-b-[1px] p-0 m-0 leading-none"
        onClick={() => {}}
      >
        Esqueceu sua senha?
      </button>
      <button
        type="button"
        className="w-fit text-base decoration-transparent border-b-[1px] p-0 m-0 leading-none"
        onClick={() => { navigate('/register') }}
      >
        Nao possui conta? Crie uma agora.
      </button>
    </div>
  )
}

export default Login
