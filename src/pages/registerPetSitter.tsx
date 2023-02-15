import React, { useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import Button from '../components/button'
import Dropdown from '../components/dropdown'
import Input from '../components/input'
import TextArea from '../components/textArea'
import { especies, services } from '../shared'

const RegisterPetSitter = () => {
  const [selected, setSelected] = useState([])
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1>Cadastro de PetSitter</h1>
      <div className="flex flex-1 flex-col w-full">
        <span className="text-base">Selecione os tipos de pets que você cuidará</span>
        <MultiSelect
          options={especies}
          value={selected}
          onChange={setSelected}
          labelledBy="Selecione"
          overrideStrings={{
            allItemsAreSelected: 'Todos os items foram selecionados.',
            clearSearch: 'Limpar busca',
            clearSelected: 'Limpar selecionados',
            noOptions: 'Sem opcoes',
            search: 'Busca',
            selectAll: 'Selecionar todos',
            selectAllFiltered: 'Selecionar todos (Filtrado)',
            selectSomeItems: 'Selecione...',
            create: 'Criar',
          }}
        />
      </div>
      <div className="flex gap-2">
        <Dropdown
          id="especie"
          label="Servicos*"
          list={services}
          onChange={() => {}}
        />
        <Input
          label="Valor RS*"
          className="input-symbol-euro"
          type="number"
          min="1"
          step="any"
        />
      </div>
      <div className="flex flex-col w-full">
        <TextArea
          label="Sobre você"
          rows={4}
          maxLength={200}
        />
        <span className="text-xs self-end">Máx. 200 caracteres</span>
      </div>
      <Button>Salvar</Button>
    </div>
  )
}

export default RegisterPetSitter
