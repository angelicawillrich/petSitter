/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import Button from '../components/baseComponents/button'
import Dropdown from '../components/baseComponents/dropdown'
import Input from '../components/baseComponents/input'
import Modal from '../components/baseComponents/modal'
import { species, searchRatings, path } from '../shared'
import { getCitiesByState, getStates } from '../api/external.api'
import { IFilterPetSitter, IUser } from '../interfaces/interfaces'
import { fetchPetSitters, filterPetSitter } from '../api/user.api'
import { calculateRatingAverage, calculateRatingsStars } from '../utils'
import Dummy2 from '../assets/dummy2.png'

interface ISearchPetSitter {
  onClose: () => void
}

interface ICityState {
  id: number
  nome: string
}

interface IState {
  id: number
  nome: string
  municipio: ICityState
}

interface IList {
  id: string
  value: string
  label: string
}

interface IPetSitterData {
  name: string
  cityName: string
  stateName: string
  district: string
  profilePicture: string
  ratingsReceived: any
}

const initialFormState = {
  name: '', cityId: '', stateId: '', specie: '', rating: '',
}

const SearchPetSitterModal = ({ onClose }: ISearchPetSitter) => {
  const [loading, setLoading] = useState(false)
  const [formState, setFormState] = useState<IFilterPetSitter>(initialFormState)
  const [listState, setListState] = useState<IList[] | []>([])
  const [listCity, setListCity] = useState<IList[] | []>([])
  const [selectedState, setSelectedState] = useState<string | undefined>()
  const [listOfPetSitters, setListOfPetSitters] = useState<IPetSitterData[]>([])

  const onSearchPetSitter = async () => {
    const selectedItems = formState
    const filteredItems = Object.fromEntries(Object.entries(selectedItems).filter(([key, value]) => value !== '' && key !== 'rating' && key !== 'specie'))
    const searchParams = new URLSearchParams(filteredItems)
    const petSitterResult = Object.keys(filteredItems).length
      ? await (await filterPetSitter(searchParams.toString())).data.result
      : await (await fetchPetSitters()).data.result

    let updatedPetSitter = petSitterResult

    if (formState.rating) {
      const formRating = Number(formState.rating)
      const selectedRating = Number(searchRatings[formRating].value)

      updatedPetSitter = updatedPetSitter.filter((petSitter: IUser) => calculateRatingAverage(petSitter.ratingsReceived) >= selectedRating)
    }

    if (formState.specie) {
      const selectedSpecies = formState.specie
      updatedPetSitter = updatedPetSitter.filter((petSitter: IUser) => petSitter.petSitterInfo.allowedPets.includes(selectedSpecies))
    }
    setListOfPetSitters(updatedPetSitter)
    if (updatedPetSitter.length === 0) {
      alert('Não foi possível encontrar PetSitters.')
    }
  }

  const onChangeForm = (field: keyof IFilterPetSitter, value: string) => {
    setFormState((previousState) => ({ ...previousState, [field]: value }))
  }

  const fetchStates = async () => {
    try {
      setLoading(true)
      const statesResult = await getStates()
      const sortedList = statesResult.data.sort((a:IState, b:IState) => (a.nome > b.nome ? 1 : -1))
      const list: IList[] | [] = sortedList.map((item: IState) => ({ id: item.id, value: item.nome, label: item.nome }))
      setListState(list)
      if (selectedState !== undefined) {
        setSelectedState(list[0].id)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const fetchCities = async (id: number) => {
    try {
      setLoading(true)
      const citiesResult = await getCitiesByState(id)
      const sortedList = citiesResult.data.sort((a:IState, b:IState) => (a.nome > b.nome ? 1 : -1))
      const list: IList[] | [] = sortedList.map((item: IState) => ({ id: item.id, value: item.nome, label: item.nome }))
      setListCity(list)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStates()
  }, [])

  useEffect(() => {
    if (selectedState) {
      fetchCities(Number(selectedState))
    }
  }, [selectedState])

  return (
    <Modal title="Filtro" onClose={onClose}>
      <div className="flex flex-col w-full p-4 gap-2 justify-center items-center">
        {!listOfPetSitters.length
          ? (
            <>
              <Input
                label="Nome"
                value={formState.name}
                onChange={(e) => onChangeForm('name', e.target.value)}
              />
              <div className="flex w-full gap-2">
                <Dropdown
                  id="estado"
                  label="Estado"
                  list={listState}
                  onChange={(e) => {
                    setSelectedState(e.target.value)
                    onChangeForm('stateId', e.target.value)
                  }}
                  value={formState.stateId}
                />
                <Dropdown
                  id="cityId"
                  label="Cidade"
                  list={listCity}
                  disabled={loading}
                  value={formState.cityId}
                  onChange={(e) => onChangeForm('cityId', e.target.value)}
                />
              </div>
              <Dropdown
                id="species"
                label="Espécie"
                list={species}
                disabled={loading}
                value={formState.specie}
                onChange={(e) => onChangeForm('specie', e.target.value)}
              />
              <Dropdown
                id="rating"
                label="Avaliacoes"
                list={searchRatings}
                value={formState.rating}
                onChange={(e) => onChangeForm('rating', e.target.value)}
              />
              <div
                className=""
              >
                <Button type="button" onClick={() => onSearchPetSitter()}>Buscar</Button>
              </div>
            </>
          ) : (
            listOfPetSitters.map((petSitter) => (
              <div key={petSitter.name} className="flex flex-row w-full justify-start items-center mb-3 gap-3">
                <img
                  src={`${path}${petSitter.profilePicture}`}
                  alt="Foto do PetSitter"
                  className="w-12 h-12 rounded-full"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null // prevents looping
                    currentTarget.src = Dummy2
                  }}
                />
                <div className="flex flex-col">
                  <div className="flex flex-row items-center gap-2">
                    <button
                      type="button"
                      className="w-fit text-base text-gray-900 decoration-transparent border-b-[1px] p-0 m-0 leading-none hover:text-gray-600"
                      onClick={() => {}}
                    >
                      {petSitter.name}
                    </button>
                    <div className="flex flex-row">
                      {petSitter.ratingsReceived && calculateRatingsStars(petSitter.ratingsReceived)}
                    </div>
                  </div>
                  <span>
                    {petSitter.district}
                    {' '}
                    -
                    {' '}
                    {petSitter.cityName}
                    -
                    {' '}
                    {petSitter.stateName}
                  </span>
                </div>
              </div>
            ))
          )}
      </div>
    </Modal>
  )
}

export default SearchPetSitterModal
