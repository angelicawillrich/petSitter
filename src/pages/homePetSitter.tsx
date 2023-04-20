import moment from 'moment'
import React, { useState } from 'react'
import { AiTwotoneEdit } from 'react-icons/ai'
import { VscWarning } from 'react-icons/vsc'
import AppointmentsModal from '../modals/appointments.modal'
import ApproveAppointmentModal from '../modals/approveAppointment.modal'
import CancelAppointmentModal from '../modals/cancelAppointment.modal'
import PostsModal from '../modals/posts.modal'
import RejectAppointmentModal from '../modals/rejectAppointment.modal'
import { getServiceName, showStars } from '../utils'

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
    service: '0',
    initial_date: '2023-12-20',
    initial_time: '10:00',
    final_date: '2023-12-21',
    final_time: '18:00',
    user: {
      name: 'Maria',
      address: 'Rua 1, nro 10',
      city: 'Pelotas',
    },
    petSitter: {
      name: 'Maria',
      address: 'Rua 1, nro 10',
      city: 'Pelotas',
    },
    status: 'confirmed',
  },
  {
    id: 1,
    service: '1',
    initial_date: '2023-12-20',
    initial_time: '08:00',
    final_date: '2023-12-25',
    final_time: '16:00',
    user: {
      name: 'Maria',
      address: 'Rua 1, nro 10',
      city: 'Pelotas',
    },
    petSitter: {
      name: 'Maria',
      address: 'Rua 1, nro 10',
      city: 'Pelotas',
    },
    status: 'confirmed',
  },
  {
    id: 2,
    service: '2',
    initial_date: '2023-12-25',
    initial_time: '10:00',
    final_date: '2023-12-26',
    final_time: '16:00',
    user: {
      name: 'Bruno',
      address: 'Rua 1, nro 10',
      city: 'Pelotas',
    },
    petSitter: {
      name: 'Bruno',
      address: 'Rua 1, nro 10',
      city: 'Pelotas',
    },
    status: 'on_hold',
  },
  {
    id: 2,
    service: '2',
    initial_date: '2023-12-26',
    initial_time: '10:00',
    final_date: '2023-12-25',
    final_time: '16:00',
    user: {
      name: 'Bruno',
      address: 'Rua 1, nro 10',
      city: 'Pelotas',
    },
    petSitter: {
      name: 'Bruno',
      address: 'Rua 1, nro 10',
      city: 'Pelotas',
    },
    status: 'rejected',
  },
]

export interface Appointment {
  id: string
  service: string
  initial_date: string
  initial_time: string
  final_date: string
  final_time: string
  user: {
    name: string
    address: string
    city: string
  },
  petSitter: {
    name: string
    address: string
    city: string
  },
  status: string
}

const checkAppointmentConflicts = (id: number) => {
  const date = new Date(appointments[id].initial_date)
  return appointments.filter(
    (appointment) => (date >= new Date(appointment.initial_date) || date <= new Date(appointment.final_date)) && appointments[id].status === 'confirmed',
  ).length > 0
}

enum Actions {
  'cancel' = 'cancel',
  'approve' = 'approve',
  'reject' = 'reject',
}

const HomePetSitter = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | object>({})
  const [action, setAction] = useState<Actions | undefined>(undefined)
  const [isPostsModalOpen, setIsPostsModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isAppointmetsModalOpen, setIsAppointmentsModalOpen] = useState(false)
  console.log('action', action)
  const handleOpenAppointmentModal = (appointment: Appointment, selectedAction: Actions) => {
    setSelectedAppointment(appointment)
    setAction(selectedAction)
  }
  const handleCloseAppointmentModal = () => {
    setSelectedAppointment({})
    setAction(undefined)
  }

  return (
    <div className="flex flex-col flex-3 w-full h-full gap-8 justify-center md:flex-row">
      {isPostsModalOpen && <PostsModal onClose={() => setIsPostsModalOpen(false)} />}
      {Object.keys(selectedAppointment).length > 0 && action === 'cancel' && (
        <CancelAppointmentModal onClose={handleCloseAppointmentModal} appointment={selectedAppointment} />
      )}
      {Object.keys(selectedAppointment).length > 0 && action === 'approve' && (
        <ApproveAppointmentModal onClose={handleCloseAppointmentModal} appointment={selectedAppointment} />
      )}
      {Object.keys(selectedAppointment).length > 0 && action === 'reject' && (
        <RejectAppointmentModal onClose={handleCloseAppointmentModal} appointment={selectedAppointment} />
      )}
      {isAppointmetsModalOpen && <AppointmentsModal onClose={() => setIsAppointmentsModalOpen(false)} />}
      <div className="flex flex-col flex-1 h-full basis-3/5 divide-y divide-y-reverse divide-gray-100">
        <h1>Sua agenda</h1>
        <div className="mt-3">
          <div>
            {appointments.map((appointment) => (
              appointment.status !== 'rejected'
              && (
              <div key={appointment.id} className="flex flex-col mt-3">
                <div className="flex flex-row text-base font-bold text-gray-900 items-center">
                  <span>
                    {moment(new Date(appointment.initial_date)).format('DD/MM/YYYY')}
                    {' '}
                    {appointment.initial_time}
                    {' '}
                    -
                    {' '}
                    {moment(new Date(appointment.final_date)).format('DD/MM/YYYY')}
                    {' '}
                    {appointment.final_time}
                  </span>
                  <div className="text-base text-gray-400 font-normal ml-3">
                    {appointment.status === 'confirmed'
                      ? (
                        <button
                          type="button"
                          className="w-fit decoration-transparent border-b-[1px] p-0 m-0 leading-none"
                          onClick={() => {
                            handleOpenAppointmentModal(appointment, 'cancel')
                          }}
                        >
                          Cancelar
                        </button>
                      )
                      : (
                        <div className="flex flex-row gap-2">
                          <button
                            type="button"
                            className="w-fit decoration-transparent border-b-[1px] border-green-900 p-0 m-0 leading-none text-green-900"
                            onClick={() => {
                              handleOpenAppointmentModal(appointment, 'approve')
                            }}
                          >
                            Aprovar
                          </button>
                          <button
                            type="button"
                            className="w-fit decoration-transparent border-b-[1px] border-red-400 p-0 m-0 leading-none text-red-400"
                            onClick={() => {
                              handleOpenAppointmentModal(appointment, 'reject')
                            }}
                          >
                            Rejeitar
                          </button>
                        </div>
                      )}
                  </div>
                </div>
                {checkAppointmentConflicts(appointment.id) && (
                  <div className="flex flex-row gap-2 items-center">
                    <VscWarning size={24} color="orange" />
                    Esta solicitação conflita com outra solicitação já aprovada.
                  </div>
                )}
                <span>{getServiceName(appointment.service)}</span>
                <button
                  type="button"
                  className="w-fit text-base decoration-transparent border-b-[1px] border-gray-900 p-0 m-0 leading-none text-gray-900"
                  onClick={() => {
                    setSelectedAppointment(appointment)
                  }}
                >
                  {appointment.user.name}

                </button>
                <span>
                  {appointment.user.address}
                  {' '}
                  -
                  {' '}
                  {appointment.user.city}
                </span>
              </div>
              )
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-between items-center mt-4">
          <div>
            <h1>Gerencie seus horários de atendimento</h1>

            <button
              type="button"
              className="w-fit decoration-transparent border-b-[1px] p-0 m-0 leading-none"
              onClick={() => setIsAppointmentsModalOpen(true)}
            >
              Adicionar outras datas
            </button>
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-between mt-4">
            <h1 className="mb-3">Posts</h1>
            <AiTwotoneEdit
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsPostsModalOpen(true)}
            />
          </div>
          <div className="max-h-80 overflow-auto grid grid-cols-6 gap-2 grid-cols">
            {posts.map((post) => <img key={post.id} src={post.imageUrl} alt="" />)}
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 h-full basis-2/5 divide-y divide-y-reverse divide-gray-100">
        <div>
          <div className="flex flex-row justify-between mt-4">
            <h1 className="mb-3">Perfil</h1>
            <AiTwotoneEdit
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsProfileModalOpen(true)}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-900">Sobre mim</span>
            <span className="text-justify">
              Eu adoro animais! Eu comecei a cuidar de cachorros e gatos há 5 anos.
              No momento, possuo um cachorro de 10 anos. Moro em uma casa espaçosa com um jardim bem cercado,
              super seguro para cachorros e gatos. Caso você tenha alguma dúvida,
              pode me contatar por e-mail ou whatsapp.
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
        </div>
        <div />
        <div className="mt-4">
          <h1 className="mb-3">Veja como você está sendo avaliado</h1>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-2">
                <button
                  type="button"
                  className="w-fit decoration-transparent border-b-[1px] p-0 m-0 leading-none text-gray-900"
                  onClick={() => {}}
                >
                  Maria

                </button>
                <div className="flex flex-row">
                  {showStars(4.6)}
                </div>
              </div>
              <span>É uma ótima PetSitter!</span>
            </div>
            <div>
              <div className="flex flex-row items-center gap-2">
                <button
                  type="button"
                  className="w-fit decoration-transparent border-b-[1px] p-0 m-0 leading-none text-gray-900"
                  onClick={() => {}}
                >
                  Fernando

                </button>
                <div className="flex flex-row">
                  {showStars(2.6)}
                </div>
              </div>
              <span>É uma ótima cuidadora mas é muito cara.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePetSitter
