/* eslint-disable max-len */
import React, { useMemo, useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import { GoPlus } from 'react-icons/go'
import { BsTrash } from 'react-icons/bs'
import Button from '../components/baseComponents/button'
import Dropdown from '../components/baseComponents/dropdown'
import Input from '../components/baseComponents/input'
import TextArea from '../components/baseComponents/textArea'
import { especies, services } from '../shared'
import { getServiceName } from '../utils'

interface Service {
  id: string
  price: string
}

interface FormState {
  selectedPets: string[]
  servicesAndPrice: Service[]
  aboutYou: string
}

const formStateInitialState = {
  selectedPets: [],
  servicesAndPrice: [],
  aboutYou: '',
}

const selectedServiceInitialState:Service = {
  id: '',
  price: '',
}

const RegisterPetSitter = () => {
  const [formState, setFormState] = useState<FormState>(formStateInitialState)
  const [selectedService, setSelectedService] = useState<Service>(selectedServiceInitialState)

  const listOfSelectableServices = useMemo(() => services.filter((service) => !formState.servicesAndPrice.some((item) => Number(item.id) === service.id)), [services, formState.servicesAndPrice])

  const onSelectPets = (event: []) => {
    setFormState((previousState) => ({ ...previousState, selectedPets: event }))
  }

  const onChangeService = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setSelectedService((previousState) => ({ ...previousState, id: e.target.value }))
    }
  }

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length) {
      setSelectedService((previousState) => ({ ...previousState, price: e.target.value }))
    }
  }

  const onAddService = () => {
    if (selectedService.id.trim().length === 0 || selectedService.price.trim().length === 0) return
    const updatedServiceAndPrice = { id: selectedService.id, price: selectedService.price }
    setFormState((previousState) => ({ ...previousState, servicesAndPrice: [...previousState.servicesAndPrice, updatedServiceAndPrice] }))
    setSelectedService(selectedServiceInitialState)
  }

  const onRemoveService = (id: string) => {
    const updatedServiceAndPrice = formState.servicesAndPrice.filter((item) => item.id !== id)
    setFormState((previousState) => ({ ...previousState, servicesAndPrice: updatedServiceAndPrice }))
  }

  const onChangeAboutYou = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState((previousState) => ({ ...previousState, aboutYou: e.target.value }))
  }

  console.log(formState)

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1>Cadastro de PetSitter</h1>
      <div className="flex flex-1 flex-col w-full">
        <span className="text-base">Selecione os tipos de pets que você cuidará*</span>
        <MultiSelect
          options={especies}
          value={formState.selectedPets}
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
            create: 'Criar',
          }}
        />
      </div>
      {listOfSelectableServices?.length > 0 && (
        <div className="flex gap-2 items-end">
          <Dropdown
            id="servico"
            label="Serviço*"
            list={listOfSelectableServices}
            onChange={onChangeService}
            value={selectedService.id}
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
            disabled={selectedService.id.trim().length === 0 || selectedService.price.trim().length === 0}
            onClick={onAddService}
            className="disabled:opacity-20"
          >
            <GoPlus size={40} />
          </button>
        </div>
      )}
      <div className="flex flex-col w-full">
        {formState.servicesAndPrice?.map((service) => (
          <div
            key={service.id}
            className="flex flex-row w-full"
          >
            <div className="w-full font-semibold">
              {getServiceName(service.id)}
            </div>
            <div className="flex w-full justify-end font-semibold">
              R$
              {' '}
              {service.price}
            </div>
            <button
              type="button"
              disabled={selectedService.id.trim().length === 0 || selectedService.price.trim().length === 0}
              onClick={onAddService}
            >
              <BsTrash
                size={15}
                className="ml-5"
                onClick={() => onRemoveService(service.id)}
              />
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full">
        <TextArea
          label="Sobre você"
          rows={4}
          maxLength={400}
          onChange={(e) => onChangeAboutYou(e)}
        />
        <span className="text-xs self-end">Máx. 400 caracteres</span>
      </div>
      <Button
        disabled={formState.selectedPets.length === 0 || formState.servicesAndPrice.length === 0}
      >
        Salvar
      </Button>
    </div>
  )
}

export default RegisterPetSitter
