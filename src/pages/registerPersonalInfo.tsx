import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../components/button'
import Dropdown from '../components/dropdown'
import Input from '../components/input'

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

const RegisterPersonalInfo = () => {
  const [listState, setListState] = useState<List[] | []>([])
  const [listCity, setListCity] = useState<List[] | []>([])
  const [selectedState, setSelectedState] = useState<string | undefined>()
  const [selectedCity, setSelectedCity] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

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
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1>Complete o seu cadastro</h1>
      <Input
        label="Nome*"
      />
      <Input
        label="Endereco*"
      />
      <Input
        label="Bairro*"
      />
      <div className="flex gap-2">
        <Dropdown
          id="estado"
          label="Estado*"
          list={listState}
          onChange={(e) => setSelectedState(e.target.value)}
        />
        <Dropdown
          id="city"
          label="Cidade*"
          list={listCity}
          disabled={loading}
        />
      </div>
      <Input
        label="Fone*"
      />
      <Input
        label="Foto de perfil"
        type="file"
        accept="image/*"
      />
      <Button>Criar conta</Button>
      <a href="#">Já possuo uma conta</a>
    </div>
  )
}

export default RegisterPersonalInfo
