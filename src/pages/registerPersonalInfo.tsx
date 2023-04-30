/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/baseComponents/button'
import Dropdown from '../components/baseComponents/dropdown'
import Input from '../components/baseComponents/input'
import { IUserPersonalInfo } from '../interfaces/interfaces'
import { getCities, getStates } from '../api/external.api'
import { updateUserPersonalInfo } from '../api/user.api'
import { StoreContext } from '../context/context'
import { convertBase64 } from '../utils'

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
  id: string
  value: string
  label: string
}

const initialFormState = {
  userId: '',
  name: '',
  address: '',
  district: '',
  state: '',
  city: '',
  phone: '',
  profilePicture: null,
}

const RegisterPersonalInfo = () => {
  const [formState, setFormState] = useState<IUserPersonalInfo>(initialFormState)
  const [listState, setListState] = useState<List[] | []>([])
  const [listCity, setListCity] = useState<List[] | []>([])
  const [selectedState, setSelectedState] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  console.log('formState', formState)

  const { user, getLoggedInUser, getUserWithToken } = useContext(StoreContext)
  useEffect(() => {
    if (user) {
      const userData = {
        userId: user._id,
        name: user.name,
        address: user.address,
        district: user.district,
        state: user.state,
        city: user.city,
        phone: user.phone,
        profilePicture: user.profilePicture,
      }
      setFormState(userData)
      setSelectedState(user.state)
    }
  }, [user])

  const fetchStates = async () => {
    try {
      setLoading(true)
      const statesResult = await getStates()
      const sortedList = statesResult.data.sort((a:State, b:State) => (a.nome > b.nome ? 1 : -1))
      const list: List[] | [] = sortedList.map((item: State) => ({ id: item.id, value: item.nome, label: item.nome }))
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
      const citiesResult = await getCities(id)
      const sortedList = citiesResult.data.sort((a:State, b:State) => (a.nome > b.nome ? 1 : -1))
      const list: List[] | [] = sortedList.map((item: State) => ({ id: item.id, value: item.nome, label: item.nome }))
      setListCity(list)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const onChangeForm = (field: keyof IUserPersonalInfo, value: string) => {
    setFormState((previousState) => ({ ...previousState, [field]: value }))
  }

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0]
    if (selectedImage) {
      const base64 = await convertBase64(selectedImage)
      setFormState((previousState) => ({ ...previousState, profilePicture: base64 }))
    }
  }

  useEffect(() => {
    getUserWithToken()
    fetchStates()
  }, [])

  useEffect(() => {
    if (selectedState) {
      fetchCities(Number(selectedState))
      setFormState((previousState) => ({ ...previousState, state: selectedState }))
    }
  }, [selectedState])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await updateUserPersonalInfo(formState)
      if (user?._id) {
        getLoggedInUser(user?._id)
      }
      setFormState(initialFormState)
      navigate('/pets')
    } catch (err: any) {
      console.error(err)
      alert(JSON.parse(err.request.responseText).message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  )
}

export default RegisterPersonalInfo
