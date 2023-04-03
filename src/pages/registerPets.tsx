import React, { useState } from 'react'
import Button from '../components/button'
import Dropdown from '../components/dropdown'
import Input from '../components/input'
import TextArea from '../components/textArea'
import { especies } from '../shared'

interface FormState {
  name: string
  yearBirth: string
  weight: string
  specie: string
  breed: string
  picture: string
  others: string
}

const formStateInitialState = {
  name: '',
  yearBirth: '',
  weight: '',
  specie: '0',
  breed: '',
  picture: '',
  others: '',
}

const RegisterPets = () => {
  const [formState, setFormState] = useState<FormState>(formStateInitialState)

  const onChangeForm = (field: keyof FormState, value: string) => {
    setFormState((previousState) => ({ ...previousState, [field]: value }))
  }
  const disableButtons = !formState.name || !formState.yearBirth || !formState.weight || !formState.specie || !formState.breed
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1>Cadastre seu(s) pet(s)</h1>
      <Input
        id="name"
        label="Nome*"
        onChange={(e) => onChangeForm('name', e.target.value)}

      />
      <div className="flex gap-2">
        <Input
          label="Ano de nascimento*"
          onChange={(e) => onChangeForm('yearBirth', e.target.value)}
        />
        <Input
          label="Peso*"
          onChange={(e) => onChangeForm('weight', e.target.value)}
        />
      </div>
      <div className="flex w-full gap-2">
        <Dropdown
          id="especie"
          label="Espécie*"
          list={especies}
          onChange={(e) => onChangeForm('specie', e.target.value)}
        />
        <Input
          label="Raca*"
          onChange={(e) => onChangeForm('breed', e.target.value)}
        />
      </div>
      <Input
        label="Foto"
        type="file"
        accept="image/*"
        onChange={(e) => onChangeForm('picture', e.target.value)}
      />
      <TextArea
        label="Outras informacoes"
        rows={4}
        onChange={(e) => onChangeForm('others', e.target.value)}
      />
      <Button
        primary={false}
        disabled={disableButtons}
        title={disableButtons ? 'Preencha os campos obrigatórios.' : ''}
      >
        Adicionar + 1 pet
      </Button>
      <Button
        disabled={disableButtons}
        title={disableButtons ? 'Preencha os campos obrigatórios.' : ''}
      >
        Continuar
      </Button>
      <a href="#">Continuar sem registrar pets</a>
    </div>
  )
}
export default RegisterPets
