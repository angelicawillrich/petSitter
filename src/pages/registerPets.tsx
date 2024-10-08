/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineDoubleRight } from 'react-icons/ai'
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
  const [imageError, setImageError] = useState<string[]>([])

  const navigate = useNavigate()

  const { getLoggedInUser, getUserWithToken, loggedInUser } = useContext(StoreContext)

  useEffect(() => { getUserWithToken(() => navigate('/login')) }, [])

  useEffect(() => {
    if (loggedInUser?.pets) {
      setPets(loggedInUser?.pets)
    }
  }, [loggedInUser])

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
      if (!loggedInUser) return
      const updatedPets = {
        userId: loggedInUser._id,
        pets,
      }
      updatedPets.pets = updatedPets.pets.map((pet) => {
        const { localPicture, ...rest } = pet
        return rest
      })
      const response = await updateUserPets(updatedPets)
      getLoggedInUser(response.data.result._id)
      if (loggedInUser.isPetSitter === null || loggedInUser.isPetSitter === undefined) {
        navigate('/bepetsitter')
      } else if (loggedInUser.isPetSitter) {
        navigate(`/homepetsitter/${loggedInUser._id}`)
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
    <>
      { loggedInUser?.isPetSitter
        ? (
          <div className="flex flex-row w-full justify-start mb-8 items-center gap-1 px-4">
            <AiOutlineDoubleRight className="w-3 h-3 text-purple-900" />
            <button
              type="button"
              className="text-purple-900 font-bold"
              onClick={() => navigate(`/homepetsitter/${loggedInUser._id}`)}
            >
              Ir para Home PetSitter
            </button>
          </div>
        )
        : (
          <div className="flex flex-row w-full justify-start mb-8 items-center gap-1 px-4">
            <AiOutlineDoubleRight className="w-3 h-3 text-purple-900" />
            <button
              type="button"
              className="text-purple-900 font-bold"
              onClick={() => navigate('/')}
            >
              Ir para Home usuário
            </button>
          </div>
        )}
      <div className="flex flex-col w-full gap-4 justify-center items-center px-4">
        <h1>Seu(s) pet(s)</h1>
        {pets && pets.map((pet, index) => (
          <Accordion
            header={(
              <div className="flex flex-row gap-2 items-center">
                {pet.picture && (pet?.localPicture || (pet._id && !imageError.includes(pet._id)))
                  ? (
                    <img
                      src={
                      pet.picture?.split('/')[1] === 'images'
                        ? (`${path}${pet.picture}`)
                        : pet?.localPicture
                          ? (URL.createObjectURL(pet.localPicture))
                          : undefined
                    }
                      alt="Foto de perfil"
                      className="w-9 h-9 rounded-full"
                      onError={() => {
                        setImageError((previousState) => [...previousState, pet._id!])
                      }}
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
                    <b>Ano de nascimento:</b>
                    {' '}
                    {pet.yearBirth}
                  </div>
                  <div>
                    <b>Peso:</b>
                    {' '}
                    {pet.weight}
                  </div>
                  <div>
                    <b>Espécie:</b>
                    {' '}
                    {species.find((specie) => String(specie.id) === pet.specie)?.label }
                  </div>
                  <div>
                    <b>Raca:</b>
                    {' '}
                    {pet.breed}
                  </div>
                  <div>
                    <b>Outras informacoes:</b>
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
        {loggedInUser?.pets.length === 0 && (
        <button
          type="submit"
          className="w-fit text-base decoration-transparent border-b-[1px] p-0 m-0 leading-none"
          onClick={() => navigate('/')}
        >
          Continuar sem registrar pets
        </button>
        )}
      </div>
    </>
  )
}
export default RegisterPets
