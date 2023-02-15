import React, { useEffect, useState } from 'react'
import Button from '../components/button'
import Dropdown from '../components/dropdown'
import Input from '../components/input'
import TextArea from '../components/textArea'

const especies = [{ id: 0, value: 'cachorro' }, { id: 1, value: 'gato' }, { id: 3, value: 'pássaro' }]

const RegisterPets = () => (
  <div className="flex flex-col gap-4 justify-center items-center">
    <h1>Cadastre seu(s) pet(s)</h1>
    <Input
      label="Nome*"
    />
    <div className="flex gap-2">
      <Input
        label="Ano de nascimento*"
      />
      <Input
        label="Peso*"
      />
    </div>
    <div className="flex w-full gap-2">
      <Dropdown
        id="especie"
        label="Espécie*"
        list={especies}
        onChange={() => {}}
      />
      <Input
        label="Raca*"
      />
    </div>
    <Input
      label="Foto"
      type="file"
      accept="image/*"
    />
    <TextArea
      label="Outras informacoes"
      rows={4}
    />
    <Button primary={false}>Adicionar + 1 pet</Button>
    <Button>Continuar</Button>
    <a href="#">Continuar sem registrar pets</a>
  </div>
)

export default RegisterPets
