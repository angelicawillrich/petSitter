import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../components/button'
import Dropdown from '../components/dropdown'
import Input from '../components/input'

interface User {
  name: string
  address: string
  district: string
  state: string
  city: string
  phone: string
  picture: File | null
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

const initialFormState = {
  name: '',
  address: '',
  district: '',
  state: '',
  city: '',
  phone: '',
  picture: null,
}

const user = {
  name: 'Angélica',
  address: 'sadi escouto',
  district: '3 vendas',
  state: '43',
  city: '"4314407"',
  phone: '12345',
  picture: null,
}

const RegisterPersonalInfo = () => {
  const [formState, setFormState] = useState<User>(initialFormState)
  const [listState, setListState] = useState<List[] | []>([])
  const [listCity, setListCity] = useState<List[] | []>([])
  const [selectedState, setSelectedState] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormState({ ...user })
      setSelectedState(user.state)
    }
  }, [user])

  console.log('selectedState', selectedState)

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

  const onChangeForm = (field: keyof User, value: string) => {
    setFormState((previousState) => ({ ...previousState, [field]: value }))
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0]
    if (selectedImage) {
      setFormState((previousState) => ({ ...previousState, picture: selectedImage }))
    }
  }

  console.log('formState', formState)
  useEffect(() => {
    fetchStates()
  }, [])

  useEffect(() => {
    if (selectedState) {
      fetchCities(Number(selectedState))
    }
  }, [selectedState])

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1>Complete o seu cadastro</h1>
      <Input
        label="Nome*"
        value={formState.name}
        onChange={(e) => onChangeForm('name', e.target.value)}
      />
      <Input
        label="Endereco*"
        value={formState.address}
        onChange={(e) => onChangeForm('address', e.target.value)}
      />
      <Input
        label="Bairro*"
        value={formState.district}
        onChange={(e) => onChangeForm('district', e.target.value)}
      />
      <div className="flex gap-2">
        <Dropdown
          id="estado"
          label="Estado*"
          list={listState}
          onChange={(e) => {
            setSelectedState(e.target.value)
            onChangeForm('state', e.target.value)
          }}
          value={formState.state}
        />
        <Dropdown
          id="city"
          label="Cidade*"
          list={listCity}
          disabled={loading}
          value={formState.city}
          onChange={(e) => onChangeForm('city', e.target.value)}
        />
      </div>
      <Input
        label="Fone*"
        value={formState.phone}
        onChange={(e) => onChangeForm('phone', e.target.value)}
      />
      <Input
        label="Foto de perfil"
        type="file"
        accept="image/*"
        onChange={(e) => handleImageSelect(e)}
      />
      <Button>Salvar</Button>
      <a href="#">Já possuo uma conta</a>
    </div>
  )
}

export default RegisterPersonalInfo
