import React, { useEffect, useState } from 'react'
import Accordion from '../components/accordion'
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
  picture: File | null
  others: string
}

const formStateInitialState = {
  name: '',
  yearBirth: '',
  weight: '',
  specie: '0',
  breed: '',
  picture: null,
  others: '',
}

interface PetFormProps {
  formState: FormState
  onChangeForm: (field: keyof FormState, value: string) => void
  handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSavePet: () => void
}

const PetForm = ({
  formState, onChangeForm, handleImageSelect, handleSavePet,
}: PetFormProps) => {
  const disableAddPetButton = !formState.name || !formState.yearBirth || !formState.weight || !formState.specie || !formState.breed

  return (
    <div className="flex flex-col gap-2">
      <Input
        id="name"
        value={formState.name}
        label="Nome*"
        onChange={(e) => onChangeForm('name', e.target.value)}
      />
      <div className="flex gap-2">
        <Input
          value={formState.yearBirth}
          label="Ano de nascimento*"
          onChange={(e) => onChangeForm('yearBirth', e.target.value)}
        />
        <Input
          value={formState.weight}
          label="Peso*"
          onChange={(e) => onChangeForm('weight', e.target.value)}
        />
      </div>
      <div className="flex w-full gap-2">
        <Dropdown
          id="especie"
          value={formState.specie}
          label="Espécie*"
          list={especies}
          onChange={(e) => onChangeForm('specie', e.target.value)}
        />
        <Input
          value={formState.breed}
          label="Raca*"
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
        Salvar Pet
      </Button>
    </div>
  )
}

const RegisterPets = () => {
  const [formState, setFormState] = useState<FormState>(formStateInitialState)
  const [pets, setPets] = useState<FormState[]>([])
  const [selectedPet, setSelectedPet] = useState<number | undefined>()

  const onChangeForm = (field: keyof FormState, value: string) => {
    setFormState((previousState) => ({ ...previousState, [field]: value }))
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0]
    if (selectedImage) {
      setFormState((previousState) => ({ ...previousState, picture: selectedImage }))
    }
  }

  const handleSavePet = () => {
    if (selectedPet !== undefined) {
      const tempPets = pets
      tempPets[selectedPet] = formState
      setPets([...tempPets])
    } else {
      setPets((previousState) => [...previousState, formState])
    }
    setSelectedPet(undefined)
    setFormState(formStateInitialState)
  }

  const onEdit = (index: number) => () => {
    const value = selectedPet === index ? undefined : index
    setSelectedPet(value)

    if (value !== undefined) {
      setFormState({ ...pets[index] })
    } else {
      setFormState(formStateInitialState)
    }
  }

  const onDelete = (index: number) => () => {
    setPets([...pets.filter((pet, idx) => idx !== index)])
    setSelectedPet(undefined)
  }

  const disableContinueButton = pets.length === 0

  return (
    <div className="flex flex-col w-[420px] gap-4 justify-center items-center">
      <h1>Seu(s) pet(s)</h1>
      {pets && pets.map((pet, index) => (
        <Accordion
          header={(
            <div className="flex flex-row gap-2">
              {pet.picture
              && <img className="h-10 w-10 rounded-full object-cover" src={URL.createObjectURL(pet.picture)} alt="Foto do pet" />}
              {pet.name}
            </div>
)}
          key={pet.name}
          onEdit={onEdit(index)}
          onDelete={onDelete(index)}
        >
          {selectedPet === index
            ? <PetForm formState={formState} onChangeForm={onChangeForm} handleImageSelect={handleImageSelect} handleSavePet={handleSavePet} />
            : (
              <div className="flex flex-col w-full gap-1 justify-items-start mb-6 mt-4">
                <div>
                  Ano de nascimento:
                  {' '}
                  {pet.yearBirth}
                </div>
                <div>
                  Peso:
                  {' '}
                  {pet.weight}
                </div>
                <div>
                  Espécie:
                  {' '}
                  {especies.find((specie) => String(specie.id) === pet.specie)?.label }
                </div>
                <div>
                  Raca:
                  {' '}
                  {pet.breed}
                </div>
                <div>
                  Outras informacoes:
                  {' '}
                  {pet.others}
                </div>
              </div>
            )}
        </Accordion>
      ))}
      {selectedPet === undefined && <PetForm formState={formState} onChangeForm={onChangeForm} handleImageSelect={handleImageSelect} handleSavePet={handleSavePet} />}
      <Button
        disabled={disableContinueButton}
        title={disableContinueButton ? 'Adicione um pet para continuar.' : ''}
      >
        Continuar
      </Button>
      <a href="#">Continuar sem registrar pets</a>
    </div>
  )
}
export default RegisterPets
