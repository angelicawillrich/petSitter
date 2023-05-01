/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, {
  useContext, useEffect, useMemo, useState,
} from 'react'
import { MultiSelect, Option } from 'react-multi-select-component'
import { GoArrowSmallRight, GoPlus } from 'react-icons/go'
import { BsTrash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
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

  const { user, getUserWithToken, getLoggedInUser } = useContext(StoreContext)

  useEffect(() => {
    if (user?.petSitterInfo) {
      const selectedPets = species.filter((specie) => user.petSitterInfo.allowedPets.includes(specie.value))
      const petSitterData = { ...user.petSitterInfo, allowedPets: selectedPets.filter((pet) => pet !== undefined) }
      setFormState(petSitterData)
    }
  }, [user])

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
      if (!user) return
      const updatedPetSitter = {
        petSitterInfo: {
          allowedPets: formState.allowedPets.map((pet) => (String(pet.value))),
          services: formState.services,
          others: formState.others,
        },
        userId: user._id,
      }
      await updatePetSitter(updatedPetSitter)
      await getLoggedInUser(user._id)
      navigate('/home')
    } catch (error:any) {
      console.error({ error })
      alert(JSON.parse(error.request.responseText).message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
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
        <div className="flex w-full gap-2 items-end">
          <Dropdown
            id="servico"
            label="Serviço*"
            list={listOfSelectableServices}
            onChange={onChangeService}
            value={selectedService.serviceId}
          />
          <Input
            label="Valor R$*"
            value={selectedService.price}
            type="number"
            min="1"
            step="any"
            onChange={onChangePrice}
          />
          <button
            type="button"
            disabled={selectedService.serviceId.trim().length === 0 || selectedService.price.trim().length === 0}
            onClick={onAddService}
            className="disabled:opacity-20"
          >
            <GoPlus size={40} className="cursor-pointer" />
          </button>
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
  )
}

export default RegisterPetSitter
