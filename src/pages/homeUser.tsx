import React, { useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { RiStarHalfFill, RiStarFill } from 'react-icons/ri'
import { AiTwotoneEdit } from 'react-icons/ai'

import Dummy1 from '../assets/dummy1.png'
import Dummy2 from '../assets/dummy2.png'
import Dog1 from '../assets/dog1.png'
import Dog2 from '../assets/dog2.png'
import Dog3 from '../assets/dog3.png'
import Dog4 from '../assets/dog4.png'
import CancelAppointmentModal from '../modals/cancelAppointment.modal'

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

const HomeUser = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | object>({})

  const stars = 3.2

  const showStars = (stars) => {
    const starsArr = []
    for (let i = 0; i < Math.floor(stars); i++) {
      starsArr.push(<RiStarFill className="text-yellow-300 w-4 h-4" />)
    }
    if (stars > Math.floor(stars)) {
      starsArr.push(<RiStarHalfFill className="text-yellow-300 w-4 h-4" />)
    }
    return starsArr
  }

  const handleCloseAppointmentModal = () => {
    setSelectedAppointment({})
  }

  return (
    <div className="flex flex-row flex-3 w-full h-full gap-4 justify-center gap-5">
      {Object.keys(selectedAppointment).length > 0 && (
        <CancelAppointmentModal onClose={handleCloseAppointmentModal} appointment={selectedAppointment} />
      )}
      <div className="flex flex-col flex-1 h-full basis-3/5 divide-y divide-y-reverse divide-gray-100">
        <h1 className="mb-3">PetSitters recentes</h1>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col justify-center items-center mb-3">
            <img
              src={Dummy1}
              alt="dummy1"
              className="w-12 h-12"
            />
            <a href="#" className="text-base text-gray-900">Ana</a>
          </div>
          <div className="flex flex-col justify-center items-center mb-3">
            <img
              src={Dummy2}
              alt="dummy2"
              className="w-12 h-12 rounded-full"
            />
            <a href="#" className="text-base text-gray-900">Henrique</a>
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-between items-center mt-4">
            <h1 className="mb-3">Ache seu PetSitter</h1>
            <BiSearchAlt className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center mb-3 gap-3">
              <img
                src={Dummy1}
                alt="dummy1"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-2">
                  <a href="#" className="text-base text-gray-900">Ana</a>
                  <div className="flex flex-row">
                    {showStars(4)}
                  </div>
                </div>
                <span>Centro - Pelotas</span>
              </div>
            </div>
            <div className="flex flex-row items-center mb-3 gap-3">
              <img
                src={Dummy1}
                alt="dummy1"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-2">
                  <a href="#" className="text-base text-gray-900">Maria</a>
                  <div className="flex flex-row">
                    {showStars(4.6)}
                  </div>
                </div>
                <span>Laranjal - Pelotas</span>
              </div>
            </div>
            <a href="#" className="text-base mb-3">Buscar</a>
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-between mt-4">
            <h1 className="mb-3">Álbum</h1>
            <AiTwotoneEdit className="w-6 h-6" />
          </div>
          <div className="grid grid-cols-6 gap-2 grid-cols">
            <img src={Dog1} alt="" />
            <img src={Dog2} alt="" />
            <img src={Dog3} alt="" />
            <img src={Dog4} alt="" />
            <img src={Dog1} alt="" />
            <img src={Dog2} alt="" />
            <img src={Dog3} alt="" />
            <img src={Dog4} alt="" />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 h-full basis-2/5 divide-y divide-y-reverse divide-gray-100">
        <h1 className="mb-3">Sua agenda</h1>
        <div>
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex flex-col mt-3">
              <div className="flex flex-row text-base font-bold text-gray-900 items-center">
                <span>
                  {appointment.initial_date}
                  {' '}
                  {appointment.initial_time}
                  {' '}
                  -
                  {' '}
                  {appointment.final_date}
                  {' '}
                  {appointment.final_time}
                </span>
                <span className="text-gray-200 ml-1">
                  (
                  {appointment.status}
                  )
                </span>
              </div>
              <a href="#" className="text-base text-gray-900">{appointment.petSitter.name}</a>
              <span>
                {appointment.petSitter.address}
                {' '}
                -
                {' '}
                {appointment.petSitter.city}
              </span>
              <button
                type="button"
                className="w-fit text-base mb-3 decoration-transparent border-b-[1px] p-0 m-0 leading-none"
                onClick={() => {
                  setSelectedAppointment(appointment)
                }}
              >
                Cancelar
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h1 className="mb-3">Veja como você está sendo avaliado</h1>
          <div>
            <div className="flex flex-row items-center gap-2">
              <a href="#" className="text-base text-gray-900">Maria</a>
              <div className="flex flex-row">
                {showStars(4.6)}
              </div>
            </div>
            <span>Super pontual e trouxe a ração separada em porções.</span>
          </div>
          <div>
            <div className="flex flex-row items-center gap-2">
              <a href="#" className="text-base text-gray-900">Fernando</a>
              <div className="flex flex-row">
                {showStars(2.6)}
              </div>
            </div>
            <span>A cliente não veio e não entrou mais em contato.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HomeUser
