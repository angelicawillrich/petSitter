/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, {
  useContext, useEffect, useMemo, useState,
} from 'react'
import { MultiSelect, Option } from 'react-multi-select-component'
import { GoArrowSmallRight, GoPlus } from 'react-icons/go'
import { BsTrash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { AiOutlineDoubleRight } from 'react-icons/ai'
import Button from '../components/baseComponents/button'
import Dropdown from '../components/baseComponents/dropdown'
import Input from '../components/baseComponents/input'
import TextArea from '../components/baseComponents/textArea'
import { species, services } from '../shared'
import { getServiceName } from '../utils'
import { StoreContext } from '../context/context'
import { Service } from '../interfaces/interfaces'
import { updatePetSitter } from '../api/user.api'

interface FormState {
  allowedPets: Option[]
  services: Service[]
  others: string
  _id?: string
}

const formStateInitialState = {
  allowedPets: [],
  services: [],
  others: '',
}

const selectedServiceInitialState = {
  serviceId: '',
  price: '',
}

const RegisterPetSitter = () => {
  const [formState, setFormState] = useState<FormState>(formStateInitialState)
  const [selectedService, setSelectedService] = useState<Service>(selectedServiceInitialState)

  const navigate = useNavigate()

  const {
    loggedInUser, getUserWithToken, getLoggedInUser, getLoggedInPetSitter,
  } = useContext(StoreContext)

  useEffect(() => {
    if (loggedInUser?.petSitterInfo) {
      const selectedPets = species.filter((specie) => loggedInUser.petSitterInfo.allowedPets.includes(specie.value))
      const petSitterData = { ...loggedInUser.petSitterInfo, allowedPets: selectedPets.filter((pet) => pet !== undefined) }
      setFormState(petSitterData)
    }
  }, [loggedInUser])

  useEffect(() => { getUserWithToken(() => navigate('/login')) }, [])

  const listOfSelectableServices = useMemo(() => services.filter((service) => !formState.services.some((item) => item.serviceId === service.id)), [services, formState.services])

  const onSelectPets = (selectedOptions: Option[]) => {
    setFormState((previousState) => ({ ...previousState, allowedPets: selectedOptions }))
  }

  const onChangeService = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setSelectedService((previousState) => ({ ...previousState, serviceId: e.target.value }))
    }
  }

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length) {
      setSelectedService((previousState) => ({ ...previousState, price: e.target.value }))
    }
  }

  const onAddService = () => {
    if (selectedService.serviceId.trim().length === 0 || selectedService.price.trim().length === 0) return
    const ServiceAndPriceToAdd = { serviceId: selectedService.serviceId, price: selectedService.price }
    setFormState((previousState) => ({ ...previousState, services: [...previousState.services, ServiceAndPriceToAdd] }))
    setSelectedService(selectedServiceInitialState)
  }

  const onRemoveService = (id: string) => {
    const updatedServiceAndPrice = formState.services.filter((item) => item.serviceId !== id)
    setFormState((previousState) => ({ ...previousState, services: updatedServiceAndPrice }))
  }

  const onChangeAboutYou = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState((previousState) => ({ ...previousState, others: e.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      if (!loggedInUser) return
      const updatedPetSitter = {
        petSitterInfo: {
          allowedPets: formState.allowedPets.map((pet) => (String(pet.value))),
          services: formState.services,
          others: formState.others,
        },
        userId: loggedInUser._id,
      }
      await updatePetSitter(updatedPetSitter)
      await getLoggedInUser(loggedInUser._id)
      await getLoggedInPetSitter(loggedInUser._id)
      navigate(`/homepetsitter/${loggedInUser._id}`)
    } catch (error:any) {
      console.error({ error })
      alert(JSON.parse(error.request.responseText).message)
    }
  }

  return (
    <>
      { loggedInUser?.isPetSitter
        ? (
          <div className="flex flex-row w-full justify-start mb-8 items-center gap-1">
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
          <div className="flex flex-row w-full justify-start mb-8 items-center gap-1">
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
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1>Cadastro de PetSitter</h1>
          <div className="flex flex-1 flex-col w-full">
            <span className="text-base">Selecione os tipos de pets que você cuidará*</span>
            <MultiSelect
              options={species}
              value={formState.allowedPets}
              onChange={(event: []) => onSelectPets(event)}
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
              }}
            />
          </div>
          {listOfSelectableServices?.length > 0 && (
          <div className="grid grid-cols-9 w-full gap-2 items-end">
            <div className="col-span-4">
              <Dropdown
                id="servico"
                label="Serviço*"
                list={listOfSelectableServices}
                onChange={onChangeService}
                value={selectedService.serviceId}
              />
            </div>
            <div className="col-span-4">
              <Input
                label="Valor R$*"
                value={selectedService.price}
                type="number"
                min="1"
                step="any"
                onChange={onChangePrice}
              />
            </div>
            <div className="flex items-center col-span-1 pb-1">
              <button
                type="button"
                disabled={selectedService.serviceId.trim().length === 0 || selectedService.price.trim().length === 0}
                onClick={onAddService}
                className="disabled:opacity-20 w-full"
              >
                <GoPlus size={40} className="cursor-pointer" />
              </button>
            </div>
          </div>
          )}
          <div className="flex flex-col w-full">
            {formState.services?.map((service) => (
              <div
                key={service.serviceId}
                className="flex flex-row w-full"
              >
                <div className="flex flex-row w-full items-center font-semibold">
                  <GoArrowSmallRight className="h-6 w-6" />
                  {getServiceName(service.serviceId)}
                </div>
                <div className="flex w-full justify-end font-semibold">
                  R$
                  {' '}
                  {service.price}
                </div>
                <button
                  type="button"
                  disabled={selectedService.serviceId.trim().length === 0 || selectedService.price.trim().length === 0}
                  onClick={onAddService}
                >
                  <BsTrash
                    size={15}
                    className=" text-red-600 cursor-pointer ml-5"
                    onClick={() => onRemoveService(service.serviceId)}
                  />
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col w-full">
            <TextArea
              label="Sobre você*"
              value={formState.others}
              rows={4}
              maxLength={400}
              onChange={(e) => onChangeAboutYou(e)}
              required
            />
            <span className="text-xs self-end">Máx. 400 caracteres</span>
          </div>
          <Button
            disabled={formState.allowedPets.length === 0 || formState.services.length === 0 || !formState.others}
            type="submit"
          >
            Salvar
          </Button>
        </div>
      </form>
    </>
  )
}

export default RegisterPetSitter
