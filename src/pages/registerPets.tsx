/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Accordion from '../components/baseComponents/accordion'
import Button from '../components/baseComponents/button'
import { path, species } from '../shared'
import { IPetFormState } from '../interfaces/interfaces'
import PetForm from './petForm'
import { updateUserPets } from '../api/user.api'
import { StoreContext } from '../context/context'
import { convertBase64, generateInitialsAvatar } from '../utils'

const formStateInitialState = {
  name: '',
  yearBirth: 2023,
  weight: 0,
  specie: '0',
  breed: '',
  picture: null,
  localPicture: null,
  others: '',
}

const RegisterPets = () => {
  const [formState, setFormState] = useState<IPetFormState>(formStateInitialState)
  const [pets, setPets] = useState<IPetFormState[]>([])
  const [selectedPet, setSelectedPet] = useState<number | undefined>()

  const navigate = useNavigate()

  const { getLoggedInUser, getUserWithToken, user } = useContext(StoreContext)

  useEffect(() => { getUserWithToken(() => navigate('/login')) }, [])

  useEffect(() => {
    if (user?.pets) {
      setPets(user?.pets)
    }
  }, [user])

  const onChangeForm = (field: keyof IPetFormState, value: string) => {
    setFormState((previousState) => ({ ...previousState, [field]: value }))
  }

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0]
    if (selectedImage) {
      let image: any = selectedImage
      if (typeof selectedImage === 'object') {
        image = await convertBase64(selectedImage)
        setFormState((previousState) => ({ ...previousState, localPicture: selectedImage }))
      }
      setFormState((previousState) => ({ ...previousState, picture: image }))
    }
  }

  const handleSavePet = () => {
    if (selectedPet !== undefined) {
      const tempPets = pets
      tempPets[selectedPet] = formState
      setPets([...tempPets])
    } else {
      const temp = formState
      setPets((previousState) => [...previousState, temp])
    }
    setSelectedPet(undefined)
    setFormState(formStateInitialState)
    alert('Não esqueça de salvar antes de sair!')
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      if (!user) return
      const updatedPets = {
        userId: user._id,
        pets,
      }
      updatedPets.pets = updatedPets.pets.map((pet) => {
        const { localPicture, ...rest } = pet
        return rest
      })
      const response = await updateUserPets(updatedPets)
      getLoggedInUser(response.data.result)
      if (user.isPetSitter === null || user.isPetSitter === undefined) {
        navigate('/bepetsitter')
      } else {
        navigate('/')
      }
    } catch (error:any) {
      console.error({ error })
      alert(JSON.parse(error.request.responseText).message)
    }
  }

  const disableContinueButton = pets.length === 0

  return (
    <div className="flex flex-col w-1/2 gap-4 justify-center items-center">
      <h1>Seu(s) pet(s)</h1>
      {pets && pets.map((pet, index) => (
        <Accordion
          header={(
            <div className="flex flex-row gap-2 items-center">
              {pet.picture
                ? (
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={
                      pet.picture?.split('/')[1] === 'images'
                        ? (`${path}${pet.picture}`)
                        : pet?.localPicture
                          ? (URL.createObjectURL(pet.localPicture))
                          : undefined
                    }
                    alt="Foto do pet"
                  />
                )
                : (generateInitialsAvatar(pet.name))}
              {pet.name}
            </div>
)}
          key={pet.name}
          onEdit={onEdit(index)}
          onDelete={onDelete(index)}
          isSelected={index === selectedPet}
        >
          {selectedPet === index
            ? (
              <PetForm
                formState={formState}
                onChangeForm={onChangeForm}
                handleImageSelect={handleImageSelect}
                handleSavePet={handleSavePet}
                haSelectedPet={!!selectedPet}
              />
            )
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
                  {species.find((specie) => String(specie.id) === pet.specie)?.label }
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
      {selectedPet === undefined
        && (
          <div className="w-full">
            {pets.length > 0 && <div className="w-full h-3 border-t-2" />}
            <PetForm
              formState={formState}
              onChangeForm={onChangeForm}
              handleImageSelect={handleImageSelect}
              handleSavePet={handleSavePet}
              haSelectedPet={!!selectedPet}
            />
          </div>
        )}
      <Button
        type="button"
        disabled={disableContinueButton}
        title={disableContinueButton ? 'Adicione um pet para continuar.' : ''}
        onClick={(event) => handleSubmit(event)}
      >
        Salvar
      </Button>
      {user?.pets.length === 0 && (
      <button
        type="submit"
        className="w-fit text-base decoration-transparent border-b-[1px] p-0 m-0 leading-none"
        onClick={() => navigate('/')}
      >
        Continuar sem registrar pets
      </button>
      )}
    </div>
  )
}
export default RegisterPets
