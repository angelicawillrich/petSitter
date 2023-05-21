import React from 'react'
import { IPetFormState } from '../interfaces/interfaces'
import Input from '../components/baseComponents/input'
import Dropdown from '../components/baseComponents/dropdown'
import { species } from '../shared'
import TextArea from '../components/baseComponents/textArea'
import Button from '../components/baseComponents/button'

interface PetFormProps {
  formState: IPetFormState
  haSelectedPet: boolean
  onChangeForm: (field: keyof IPetFormState, value: string) => void
  handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSavePet: () => void
}

const PetForm = ({
  formState, haSelectedPet, onChangeForm, handleImageSelect, handleSavePet,
}: PetFormProps) => {
  const disableAddPetButton = !formState.name || !formState.yearBirth || !formState.weight || !formState.specie || !formState.breed

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Input
        id="name"
        value={formState.name}
        label="Nome*"
        required
        onChange={(e) => onChangeForm('name', e.target.value)}
      />
      <div className="grid grid-cols-2 w-full gap-2">
        <Input
          value={formState.yearBirth}
          label="Ano de nascimento*"
          type="number"
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault()
            }
          }}
          required
          onChange={(e) => onChangeForm('yearBirth', e.target.value)}
        />
        <Input
          value={formState.weight}
          label="Peso*"
          type="number"
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault()
            }
          }}
          min={0}
          required
          onChange={(e) => onChangeForm('weight', e.target.value)}
        />
      </div>
      <div className="flex w-full gap-2">
        <Dropdown
          id="especie"
          value={formState.specie}
          label="Espécie*"
          required
          list={species}
          onChange={(e) => onChangeForm('specie', e.target.value)}
        />
        <Input
          value={formState.breed}
          label="Raca*"
          required
          onChange={(e) => onChangeForm('breed', e.target.value)}
        />
      </div>
      <Input
        label="Foto"
        type="file"
        accept="image/*"
        onChange={(e) => handleImageSelect(e)}
      />
      <TextArea
        value={formState.others}
        label="Outras informacoes"
        rows={4}
        onChange={(e) => onChangeForm('others', e.target.value)}
      />
      <Button
        type="button"
        primary={false}
        disabled={disableAddPetButton}
        title={disableAddPetButton ? 'Preencha os campos obrigatórios.' : ''}
        onClick={handleSavePet}
      >
        {haSelectedPet ? 'Adicionar alteração' : 'Adicionar Pet'}
      </Button>
    </div>
  )
}

export default PetForm
