import React from 'react'
import { RiStarHalfFill, RiStarFill } from 'react-icons/ri'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Dummy1 from '../assets/dummy1.png'
import Button from '../components/button'
import { showStars } from '../utils'

export interface Appointment {
  id: string
  initial_date: string
  initial_time: string
  final_date: string
  final_time: string
  petSitter: {
    name: string
    address: string
    city: string
  },
  status: string
}

const posts = [
  { id: 0, imageUrl: 'src/assets/dog1.png', text: 'Oi! Esta é a Mione!' },
  { id: 1, imageUrl: 'src/assets/dog2.png', text: 'Essa é a Cacau!' },
  { id: 2, imageUrl: 'src/assets/dog3.png', text: 'Bom dia!' },
  { id: 3, imageUrl: 'src/assets/dog4.png', text: 'Essa é a Cacau!' },
  { id: 4, imageUrl: 'src/assets/dog1.png', text: 'Oie!' },
  { id: 5, imageUrl: 'src/assets/dog2.png', text: 'Essa é a Cacau!' },
  { id: 6, imageUrl: 'src/assets/dog3.png', text: 'Oi! Esta é a Mione!' },
  { id: 7, imageUrl: 'src/assets/dog4.png', text: 'Essa é a Cacau!' },
]

const appointments = [
  {
    id: 0,
    initial_date: '20.12',
    initial_time: '10:00',
    final_date: '21.12',
    final_time: '18:00',
    petSitter: {
      name: 'Maria',
      address: 'Rua 1, nro 10',
      city: 'Pelotas',
    },
    status: 'confirmado',
  },
  {
    id: 1,
    initial_date: '25.12',
    initial_time: '08:00',
    final_date: '25.12',
    final_time: '16:00',
    petSitter: {
      name: 'Maria',
      address: 'Rua 1, nro 10',
      city: 'Pelotas',
    },
    status: 'aguardando',
  },
]

const PagePetSitter = () => {
  const disabledDates = [
    new Date(2023, 4, 24),
    new Date(2023, 4, 25),
  ]
  const availabledDates = [
    new Date(2023, 4, 9),
    new Date(2023, 4, 10),
    new Date(2023, 4, 11),
    new Date(2023, 4, 12),
    new Date(2023, 4, 13),
    new Date(2023, 4, 14),
  ]
  const occupiedDates = [
    new Date(2023, 4, 9),
    new Date(2023, 4, 10),
  ]

  const tileDisabled = ({ date }) => {
    let result = false
    if (date < new Date() || disabledDates.some((disabledDate) => date.getFullYear() === disabledDate.getFullYear()
              && date.getMonth() === (disabledDate.getMonth() - 1)
              && date.getDate() === disabledDate.getDate())) {
      result = true
    }
    return result
  }

  const titleClassName = ({ date }: any) => {
    let result = ''
    if (availabledDates.some((availabledDate) => date.getFullYear() === availabledDate.getFullYear()
              && date.getMonth() === (availabledDate.getMonth() - 1)
              && date.getDate() === availabledDate.getDate())) {
      result = 'available'
    }
    if (occupiedDates.some((occupiedDate) => date.getFullYear() === occupiedDate.getFullYear()
              && date.getMonth() === (occupiedDate.getMonth() - 1)
              && date.getDate() === occupiedDate.getDate())) {
      result = 'occupied'
    }
    return result
  }

  return (
    <div className="flex flex-row flex-3 w-full h-full gap-8 justify-center">
      <div className="flex flex-col flex-1 h-full basis-3/5 divide-y divide-y-reverse divide-gray-100">
        <div>
          <div className="flex flex-row gap-4">
            <div className="flex justify-center items-center mb-3">
              <img
                src={Dummy1}
                alt="dummy1"
                className="w-12 h-12"
              />
              <div className="fley flex-col">
                <h1>Maria Alves</h1>
                <div className="flex">{showStars(4)}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-gray-900 text-base">
            <span>Rua das Margaridas, nro 1</span>
            <span>
              Laranjal - Pelotas - RS
            </span>
            <span>
              maria.a@email.com.br
            </span>
            <span>
              (53) 123456789
            </span>
          </div>
        </div>
        <div />
        <div className="mt-4">
          <h1>Conheça este(a) PetSitter</h1>
          <span>
            Eu adoro animais! Eu comecei a cuidar de cachorros e gatos há 5 anos. No momento, possuo um cachorro de 10 anos. Moro em uma casa espaçosa com um jardim bem cercado, super seguro para cachorros e gatos. Caso você tenha alguma dúvida, pode me contatar por e-mail ou whtasapp.
          </span>
        </div>
        <div className="mt-4">
          <h1>Serviços e preços</h1>
          <div className="flex justify-between items-center">
            <span>Levar para passear</span>
            <span>R$30,00</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Hospedagem (por hora)</span>
            <span>R$20,00</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Hospedagem (por dia)</span>
            <span>R$100,00</span>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h1>Animais aceitos</h1>
          <span>
            Cachorro
          </span>
          <span>
            Gato
          </span>
          <span>
            Peixe
          </span>
        </div>
        <div>
          <div className="flex flex-row justify-between mt-4">
            <h1 className="mb-3">Posts</h1>
          </div>
          <div className="max-h-96 overflow-auto grid grid-cols-4 gap-2 grid-cols">
            {posts.map((post) => (
              <div key={post.id}>
                <img
                  src={post.imageUrl}
                  alt=""
                  className="w-40"
                />
                <span className="text-gray-400 text-xs font-medium">{post.text}</span>
              </div>
            ))}

          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 h-full basis-2/5 divide-y divide-y-reverse divide-gray-100">
        <h1 className="mb-3">Agenda</h1>
        <div className="w-full">

          <div className="w-fit">
            <Calendar
              tileDisabled={tileDisabled}
              tileClassName={titleClassName}
            />
            <div className="flex gap-2 mb-4">
              <span className="text-red-900 font-bold">*Ocupado</span>
              <span className="text-[#637644] font-bold">*Disponível</span>
            </div>
            <Button className="mb-3">Solicitar agendamento</Button>
          </div>
        </div>
        <div className="mt-4">
          <h1 className="mb-3">Avaliações 3.5/5</h1>
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-base text-gray-900 font-bold">Ótima PetSitter!</span>
              <div className="flex flex-row">
                {showStars(4)}
              </div>
              <span>José da Silva</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base text-gray-900 font-bold">É uma ótima cuidadora mas é muito cara.</span>
              <div className="flex flex-row">
                {showStars(3)}
              </div>
              <span>Joana Silveira</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
export default PagePetSitter
