/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/baseComponents/button'
import Dropdown from '../components/baseComponents/dropdown'
import Input from '../components/baseComponents/input'
import { IUserProfile } from '../interfaces/interfaces'
import { getCitiesByState, getStates } from '../api/external.api'
import { updateUserProfile } from '../api/user.api'
import { StoreContext } from '../context/context'
import { convertBase64 } from '../utils'

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

const initialFormState = {
  userId: '',
  name: '',
  address: '',
  district: '',
  stateId: '',
  stateName: '',
  cityId: '',
  cityName: '',
  phone: '',
  profilePicture: null,
}

const RegisterProfile = () => {
  const [formState, setFormState] = useState<IUserProfile>(initialFormState)
  const [listState, setListState] = useState<IList[] | []>([])
  const [listCity, setListCity] = useState<IList[] | []>([])
  const [selectedState, setSelectedState] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { user, getLoggedInUser, getUserWithToken } = useContext(StoreContext)
  useEffect(() => {
    if (user) {
      const userData = {
        userId: user._id,
        name: user.name,
        address: user.address,
        district: user.district,
        stateId: user.stateId,
        stateName: user.stateName,
        cityId: user.cityId,
        cityName: user.cityName,
        phone: user.phone,
        profilePicture: user.profilePicture,
      }
      setFormState(userData)
      setSelectedState(user.stateId)
    }
  }, [user])

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

  const onChangeForm = (field: keyof IUserProfile, value: string) => {
    setFormState((previousState) => ({ ...previousState, [field]: value }))
    if (field === 'cityId') {
      const cityName = listCity.find((city) => String(city.id) === String(value))?.label
      if (cityName) {
        setFormState((previousState) => ({ ...previousState, cityName }))
      }
    }

    if (field === 'stateId') {
      const stateName = listState.find((state) => String(state.id) === String(value))?.label
      if (stateName) {
        setFormState((previousState) => ({ ...previousState, stateName }))
      }
    }
  }

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0]
    if (selectedImage) {
      const base64 = await convertBase64(selectedImage)
      setFormState((previousState) => ({ ...previousState, profilePicture: base64 }))
    }
  }

  useEffect(() => {
    getUserWithToken(() => navigate('/login'))
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
      await updateUserProfile(formState)
      if (user?._id) {
        await getLoggedInUser(user?._id)
      }
      setFormState(initialFormState)
      if (user?.pets.length === 0) {
        navigate('/pets')
      } else {
        navigate('/')
      }
    } catch (err: any) {
      console.error(err)
      alert(JSON.parse(err.request.responseText).message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
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
        <div className="flex w-full gap-2">
          <Dropdown
            id="estado"
            label="Estado*"
            list={listState}
            onChange={(e) => {
              setSelectedState(e.target.value)
              onChangeForm('stateId', e.target.value)
            }}
            value={formState.stateId}
          />
          <Dropdown
            id="city"
            label="Cidade*"
            list={listCity}
            disabled={loading}
            value={formState.cityId}
            onChange={(e) => onChangeForm('cityId', e.target.value)}
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

export default RegisterProfile
