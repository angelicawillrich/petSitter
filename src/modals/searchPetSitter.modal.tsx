import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from '../components/baseComponents/button'
import Dropdown from '../components/baseComponents/dropdown'
import Input from '../components/baseComponents/input'
import Modal from '../components/baseComponents/modal'
import { especies, ratings } from '../shared'

interface SearchPetSitter {
  onClose: () => void
}

interface CityState {
  id: number
  nome: string
}

interface State {
  id: number
  nome: string
  municipio: CityState
}

interface List {
  id: any
  value: any
}

interface FormState {
  name: string
  city: string
  state: string
  species: string
  rating: string
}

const initialFormState = {
  name: '',
  city: '',
  state: '',
  species: '',
  rating: '',
}

const SearchPetSitterModal = ({ onClose }: SearchPetSitter) => {
  const [loading, setLoading] = useState(false)
  const [formState, setFormState] = useState<FormState>(initialFormState)
  const [listState, setListState] = useState<List[] | []>([])
  const [listCity, setListCity] = useState<List[] | []>([])
  const [selectedState, setSelectedState] = useState<string | undefined>()

  const onSearchPetSitter = () => {
    console.log('search PetSitter')
    onClose()
  }

  const onCancelAction = () => {
    onClose()
  }

  const onChangeForm = (field: keyof FormState, value: string) => {
    setFormState((previousState) => ({ ...previousState, [field]: value }))
  }

  const fetchStates = () => {
    setLoading(true)
    const baseUrl = 'https://servicodados.ibge.gov.br/'
    const url = `${baseUrl}api/v1/localidades/estados`
    axios.get(url)
      .then((result) => {
        const sortedList = result.data.sort((a:State, b:State) => (a.nome > b.nome ? 1 : -1))
        const list: List[] | [] = sortedList.map((item: State) => ({ id: item.id, value: item.nome }))
        setListState(list)
        if (!selectedState) {
          setSelectedState(list[0].id)
        }
      })
      .catch((error) => {
        console.error(error)
      }).finally(() => {
        setLoading(false)
      })
  }

  const fetchCities = (id: number) => {
    setLoading(true)
    const baseUrl = 'https://servicodados.ibge.gov.br/api/v1/'
    const url = `${baseUrl}localidades/estados/${id}/municipios`
    axios.get(url)
      .then((result) => {
        const sortedList = result.data.sort((a:State, b:State) => (a.nome > b.nome ? 1 : -1))
        const list: List[] | [] = sortedList.map((item: State) => ({ id: item.id, value: item.nome }))
        setListCity(list)
      })
      .catch((error) => {
        console.error(error)
      }).finally(() => {
        setLoading(false)
      })
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
      <div className="flex flex-col p-4 gap-2 justify-center items-center">
        <Input
          label="Nome"
          value={formState.name}
          onChange={(e) => onChangeForm('name', e.target.value)}
        />
        <div className="flex gap-2">
          <Dropdown
            id="estado"
            label="Estado"
            list={listState}
            onChange={(e) => {
              setSelectedState(e.target.value)
              onChangeForm('state', e.target.value)
            }}
            value={formState.state}
          />
          <Dropdown
            id="city"
            label="Cidade"
            list={listCity}
            disabled={loading}
            value={formState.city}
            onChange={(e) => onChangeForm('city', e.target.value)}
          />
        </div>
        <Dropdown
          id="species"
          label="Espécie"
          list={especies}
          disabled={loading}
          value={formState.species}
          onChange={(e) => onChangeForm('species', e.target.value)}
        />
        <Dropdown
          id="rating"
          label="Avaliacoes"
          list={ratings}
          value={formState.rating}
          onChange={(e) => onChangeForm('rating', e.target.value)}
        />
        <div
          className=""
        >
          <Button onClick={onSearchPetSitter}>Buscar</Button>
        </div>
      </div>
    </Modal>
  )
}

export default SearchPetSitterModal
