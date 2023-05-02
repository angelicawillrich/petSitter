import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/baseComponents/button'
import { StoreContext } from '../context/context'

const WannaBePetSitter = () => {
  const navigate = useNavigate()

  const { getUserWithToken } = useContext(StoreContext)

  useEffect(() => { getUserWithToken(() => navigate('/login')) }, [])

  return (
    <div className="flex flex-col w-full max-w-xs gap-4 justify-center items-center">
      <span>Se você quiser oferecer seus servicos como PetSitter, clique em “Quero ser PetSitter”.</span>
      <Button primary={false} onClick={() => navigate('/registerpetsitter')}>Quero ser PetSitter</Button>
      <Button onClick={() => navigate('/')}>Finalizar cadastro</Button>
    </div>
  )
}

export default WannaBePetSitter
