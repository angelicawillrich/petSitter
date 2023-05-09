import { IconType } from 'react-icons'
import {
  GiAquarium, GiBirdCage, GiCat, GiSittingDog,
} from 'react-icons/gi'

export const species: { id: string, label: string, value: string, icon: IconType }[] = [
  {
    id: '0', value: '0', label: 'cachorro', icon: GiSittingDog,
  },
  {
    id: '1', value: '1', label: 'gato', icon: GiCat,
  },
  {
    id: '2', value: '2', label: 'pássaro', icon: GiBirdCage,
  },
  {
    id: '3', value: '3', label: 'peixe', icon: GiAquarium,
  },
]

export const services = [
  { id: '0', value: 'hospedagem', label: 'hospedagem' },
  { id: '1', value: 'levar para passear', label: 'levar para passear' },
  { id: '2', value: 'cuidar em casa', label: 'cuidar em casa' },
]

export const searchRatings = [
  { id: '0', value: '5', label: '5 estrelas' },
  { id: '1', value: '4', label: '5 à 4 estrelas' },
  { id: '2', value: '3', label: '5 à 3 estrelas' },
  { id: '3', value: '2', label: '5 à 2 estrelas' },
  { id: '4', value: '1', label: 'Todos' },
]

export const path = 'http://localhost:3000'

export const appointmentStatus = [
  { id: 'confirmed', label: 'confirmado' },
  { id: 'pending', label: 'Aguardando' },
  { id: 'canceled', label: 'cancelado' },
  { id: 'rejected', label: 'rejeitado' },
]

export const weekDays = [
  { id: '0', value: '0', label: 'Domingos' },
  { id: '1', value: '1', label: 'Segundas' },
  { id: '2', value: '2', label: 'Tercas' },
  { id: '3', value: '3', label: 'Quartas' },
  { id: '4', value: '4', label: 'Quintas' },
  { id: '5', value: '5', label: 'Sextas' },
  { id: '6', value: '6', label: 'Sábados' },
]
