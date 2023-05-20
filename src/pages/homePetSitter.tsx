/* eslint-disable no-nested-ternary */
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineDoubleRight, AiTwotoneEdit } from 'react-icons/ai'
import { VscWarning } from 'react-icons/vsc'
import { useNavigate, useParams } from 'react-router-dom'
import AvailableDatesModal from '../modals/availableDates.modal'
import ApproveBookingModal from '../modals/approveBooking.modal'
import CancelBookingModal from '../modals/cancelBooking.modal'
import PostsModal from '../modals/posts.modal'
import RejectBookingModal from '../modals/rejectBooking.modal'
import { calculateRatingAverage, getServiceName, showStars } from '../utils'
import { StoreContext } from '../context/context'
import { IBooking } from '../interfaces/interfaces'
import { path, services, species } from '../shared'
import PetSitterCalendar from '../components/petSitterCalendar'
import { deleteAvailableDate } from '../api/user.api'

interface IBookingsConflict {
  bookingInfo: IBooking
  bookings: IBooking[]
}

const checkBookingsConflicts = ({ bookingInfo, bookings }: IBookingsConflict) => {
  let result = false
  const initialDate = new Date(bookingInfo.initialDate)
  const finalDate = new Date(bookingInfo.finalDate)

  for (let i = 0; i < bookings.length; i++) {
    if (initialDate <= new Date(bookings[i].finalDate)
      && (finalDate >= new Date(bookings[i].initialDate)
      && bookingInfo._id !== bookings[i]._id)) {
      result = true
    }
  }
  return result
}

enum Actions {
  'cancel' = 'cancel',
  'approve' = 'approve',
  'reject' = 'reject',
}

const HomePetSitter = () => {
  const [selectedBooking, setSelectedBooking] = useState<IBooking | undefined>()
  const [action, setAction] = useState<Actions | undefined>(undefined)
  const [isPostsModalOpen, setIsPostsModalOpen] = useState(false)
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false)
  const [selectedAvailableDateId, setSelectedAvailableDateId] = useState('')

  const navigate = useNavigate()

  const {
    getUserWithToken, getLoggedInPetSitter, loggedInPetSitter, loggedInUser,
  } = useContext(StoreContext)
  const { petSitterId } = useParams()

  useEffect(() => {
    getUserWithToken(() => navigate('/login'))
  }, [])

  useEffect(() => {
    if (petSitterId) {
      getLoggedInPetSitter(petSitterId)
    }
  }, [petSitterId])

  useEffect(() => {
    if (petSitterId && loggedInUser && petSitterId !== loggedInUser._id) {
      navigate('/home')
    }
  }, [petSitterId, loggedInUser])

  const handleOpenBookingModal = (booking: IBooking, selectedAction: Actions) => {
    setSelectedBooking(booking)
    setAction(selectedAction)
  }
  const handleCloseBookingModal = () => {
    setSelectedBooking(undefined)
    setAction(undefined)
  }

  const handleCloseModal = () => {
    setIsBookingsModalOpen(false)
    setSelectedAvailableDateId('')
  }

  const handleDeleteAvailableDate = async (availableDateId: string) => {
    try {
      if (!loggedInPetSitter) return
      const availableDateParams = new URLSearchParams({ userId: loggedInPetSitter._id, availableDateId })
      await deleteAvailableDate(availableDateParams.toString())
      getLoggedInPetSitter(loggedInPetSitter?._id)
      alert('Horário deletado com sucesso! Os agendamentos feitos para as datas deletadas serao mantidos.')
    } catch (error: any) {
      console.error(error)
      alert(JSON.parse(error.request.responseText).message)
    }
  }

  return (
    !loggedInPetSitter
      ? (<span>CARREGANDO...</span>)
      : (
        <>
          <div className="flex flex-row w-full justify-start mb-8 items-center gap-1">
            <AiOutlineDoubleRight className="w-3 h-3 text-purple-900" />
            <button
              type="button"
              className="text-purple-900 font-bold"
              onClick={() => navigate('/')}
            >
              Ir para Home usuário
            </button>
          </div>
          <div className="flex flex-col flex-3 w-full h-full gap-5 md:gap-10 justify-center md:flex-row">
            {isPostsModalOpen && <PostsModal onClose={() => setIsPostsModalOpen(false)} />}
            {selectedBooking && Object.keys(selectedBooking).length > 0 && action === 'cancel' && (
            <CancelBookingModal onClose={handleCloseBookingModal} booking={selectedBooking} />
            )}
            {selectedBooking && Object.keys(selectedBooking).length > 0 && action === 'approve' && (
            <ApproveBookingModal onClose={handleCloseBookingModal} booking={selectedBooking} />
            )}
            {selectedBooking && Object.keys(selectedBooking).length > 0 && action === 'reject' && (
            <RejectBookingModal onClose={handleCloseBookingModal} booking={selectedBooking} />
            )}
            {(isBookingsModalOpen || selectedAvailableDateId) && <AvailableDatesModal selectedAvailableDateId={selectedAvailableDateId} onClose={() => handleCloseModal()} />}
            <div className="flex flex-col flex-1 h-full basis-3/5 divide-y divide-y-reverse divide-gray-100">
              <h1>Sua agenda</h1>
              <div className="mt-3">
                <div className="max-h-96 overflow-auto">
                  {loggedInPetSitter?.bookings.length
                    ? loggedInPetSitter?.bookings.map((booking) => (
                      booking.status !== 'rejected'
              && (
              <div key={booking._id} className="flex flex-col mt-3">
                <div className="flex flex-row text-base font-bold text-gray-900 items-center">
                  <span>
                    {moment(new Date(booking.initialDate)).format('DD/MM/YYYY')}
                    {' '}
                    {booking.initialTime}
                    {' '}
                    -
                    {' '}
                    {moment(new Date(booking.finalDate)).format('DD/MM/YYYY')}
                    {' '}
                    {booking.finalTime}
                  </span>
                  <div className="text-base text-gray-400 font-normal ml-3">
                    {booking.status === 'approved'
                      ? (
                        <button
                          type="button"
                          className="w-fit decoration-transparent border-b-[1px] p-0 m-0 leading-none"
                          onClick={() => {
                            handleOpenBookingModal(booking, Actions.cancel)
                          }}
                        >
                          Cancelar
                        </button>
                      )
                      : booking.status !== 'canceled'
                        ? (
                          <div className="flex flex-row gap-2">
                            <button
                              type="button"
                              className="w-fit decoration-transparent border-b-[1px] border-green-900 p-0 m-0 leading-none text-green-900"
                              onClick={() => {
                                handleOpenBookingModal(booking, Actions.approve)
                              }}
                            >
                              Aprovar
                            </button>
                            <button
                              type="button"
                              className="w-fit decoration-transparent border-b-[1px] border-red-400 p-0 m-0 leading-none text-red-400"
                              onClick={() => {
                                handleOpenBookingModal(booking, Actions.reject)
                              }}
                            >
                              Rejeitar
                            </button>
                          </div>
                        )
                        : <span>cancelado</span>}
                  </div>
                </div>
                {checkBookingsConflicts({ bookingInfo: booking, bookings: loggedInPetSitter.bookings }) && (
                  <div className="flex flex-row gap-2 items-center">
                    <VscWarning size={15} color="orange" />
                    <span className="text-sm text-orange-400">Esta solicitação conflita com outra solicitação.</span>
                  </div>
                )}
                <span>{getServiceName(booking.service)}</span>
                <button
                  type="button"
                  className="w-fit text-base decoration-transparent border-b-[1px] border-gray-900 p-0 m-0 leading-none text-gray-900"
                  onClick={() => navigate(`/user/${booking.userId?._id}`)}
                >
                  {booking?.userId?.name}

                </button>
                <span>
                  {booking?.userId?.address}
                  {' '}
                  -
                  {' '}
                  {booking?.userId?.cityName}
                </span>
              </div>
              )
                    ))
                    : <span>Você nao possui agendamentos.</span>}
                </div>
              </div>
              <div className="flex flex-row justify-between items-center mt-4">
                <div className="flex flex-col gap-2 pb-3">
                  <h1>Gerencie seus horários de atendimento</h1>
                  <PetSitterCalendar petSitter={loggedInPetSitter} />
                  {loggedInPetSitter?.availableDates.length
                    ? loggedInPetSitter?.availableDates.map((availableDate) => (
                      <div key={availableDate.initialDate.toString()} className="flex flex-row gap-2">
                        <span className="font-semibold">
                          {new Date(availableDate.initialDate).toLocaleDateString('pt-BR')}
                          {' '}
                          até
                          {' '}
                          {new Date(availableDate.finalDate).toLocaleDateString('pt-BR')}
                        </span>
                        <button
                          type="button"
                          className="w-fit decoration-transparent border-b-[1px] p-0 m-0 leading-none"
                          onClick={() => setSelectedAvailableDateId(availableDate?._id)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="w-fit decoration-transparent border-b-[1px] p-0 m-0 leading-none"
                          onClick={() => handleDeleteAvailableDate(availableDate._id)}
                        >
                          Deletar
                        </button>
                      </div>
                    ))
                    : <span>Você ainda não possui horários registrado.</span>}
                  <button
                    type="button"
                    className="w-fit decoration-transparent border-b-[1px] p-0 m-0 leading-none"
                    onClick={() => setIsBookingsModalOpen(true)}
                  >
                    Adicionar horários
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
                {loggedInPetSitter?.posts.length
                  ? (
                    <div className="max-h-96 overflow-auto grid grid-cols-3 gap-2 grid-cols">
                      {loggedInPetSitter?.posts.map((post) => (
                        <div key={post._id} className="flex flex-col">
                          <img src={`${path}${post.filename}`} alt="" />
                          <span className="text-gray-400 text-xs font-medium">{post.description}</span>
                          <span className="text-gray-400 text-[8px]">{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                      ))}
                    </div>
                  )
                  : <span>Você ainda não possui posts.</span>}
              </div>
            </div>
            <div className="flex flex-col flex-1 h-full basis-2/5 divide-y divide-y-reverse divide-gray-100">
              <div>
                <div className="flex flex-row justify-between">
                  <h1 className="mb-3">Perfil</h1>
                  <AiTwotoneEdit
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => navigate('/registerpetsitter')}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900">Sobre mim</span>
                  <span className="text-justify">
                    {loggedInPetSitter?.petSitterInfo.others}
                  </span>
                </div>
                <div className="mt-4">
                  <span className="font-bold text-gray-900">Serviços e preços</span>
                  {loggedInPetSitter?.petSitterInfo.services.length
                    ? loggedInPetSitter.petSitterInfo.services.map((petSitterService) => (
                      <div key={petSitterService.serviceId} className="flex justify-between items-center">
                        <span>{services.find((service) => service.id === petSitterService.serviceId)?.label }</span>
                        <span>
                          R$
                          {petSitterService.price}
                        </span>
                      </div>
                    ))
                    : (<span>Não foi possível encontrar serviços.</span>)}
                </div>
                <div className="flex flex-col mt-4">
                  <span className="font-bold text-gray-900">Animais aceitos</span>
                  <div className="flex flex-row">
                    {species.map((specie) => (
                      <specie.icon
                        key={specie.id}
                        className={`w-12 h-12 m-4 transition-all
                      ${loggedInPetSitter?.petSitterInfo.allowedPets.includes(specie.id)
                          ? 'text-purple-900 hover:scale-110'
                          : 'text-gray-100'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div />
              <div className="mt-4">
                <h1 className="mb-3">
                  Avaliações recebidas
                  {' '}
                  {loggedInPetSitter?.ratingsReceived && loggedInPetSitter?.ratingsReceived?.length > 0 && `${calculateRatingAverage(loggedInPetSitter.ratingsReceived)}/5`}
                </h1>
                <div className="flex flex-col gap-3">
                  {loggedInPetSitter?.ratingsReceived.length
                    ? loggedInPetSitter?.ratingsReceived.map((rating) => (
                      <div key={rating._id} className="flex flex-col mb-3">
                        <div className="flex flex-row items-center gap-2">
                          <span className="text-gray-900">
                            {rating.reviewerId?.name}
                          </span>
                          <div className="flex flex-row">
                            {showStars(rating.rating)}
                          </div>
                        </div>
                        <span>{rating.description}</span>
                      </div>
                    ))
                    : (<span>Você ainda não recebeu avaliações.</span>)}

                </div>
              </div>
            </div>
          </div>
        </>
      ))
}

export default HomePetSitter
