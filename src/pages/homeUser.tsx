/* eslint-disable no-param-reassign */
import React, {
  useContext, useEffect, useMemo, useState,
} from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { AiTwotoneEdit } from 'react-icons/ai'

import { useNavigate } from 'react-router-dom'
import CancelAppointmentModal from '../modals/cancelAppointment.modal'
import SearchPetSitterModal from '../modals/searchPetSitter.modal'
import AlbumModal from '../modals/album.modal'
import { calculateRatingsStars, showStars } from '../utils'
import { StoreContext } from '../context/context'
import { appointmentStatus, path } from '../shared'
import {
  IAppointment, IBooking, IBookingPersonalData, IRating,
} from '../interfaces/interfaces'
import Dummy2 from '../assets/dummy2.png'

const HomeUser = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | undefined>()
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false)

  const navigate = useNavigate()

  const {
    getUserWithToken, user, fetchPetSittersList, petSittersList,
  } = useContext(StoreContext)

  useEffect(() => {
    getUserWithToken(() => navigate('/login'))
    fetchPetSittersList()
  }, [])

  const handleCloseAppointmentModal = () => {
    setSelectedAppointment(undefined)
  }

  const recentPetSitters = useMemo(() => {
    if (user) {
      const petSitters = user?.bookings.reduce((acc: IBookingPersonalData[], current:IBooking) => {
        if (!acc.find((item) => item._id === current.petSitterId?._id)) {
          acc.push(current.petSitterId as IBookingPersonalData)
        }
        return acc
      }, [])
      return petSitters
    }
    return []
  }, [user])

  return (
    <div className="flex flex-col flex-3 w-full h-full gap-10 justify-center md:flex-row">
      {selectedAppointment && Object.keys(selectedAppointment).length > 0 && (
        <CancelAppointmentModal onClose={handleCloseAppointmentModal} appointment={selectedAppointment} />
      )}
      {isSearchModalOpen && <SearchPetSitterModal onClose={() => setIsSearchModalOpen(false)} />}
      {isAlbumModalOpen && <AlbumModal photos={user?.album} user={user} onClose={() => setIsAlbumModalOpen(false)} />}
      <div className="flex flex-col flex-1 h-full basis-3/5 divide-y divide-y-reverse divide-gray-100">
        <h1 className="mb-3">PetSitters recentes</h1>
        <div className="flex flex-row gap-4 mb-3 items-center">
          { recentPetSitters?.length
            ? (
              recentPetSitters?.map((petSitter) => (
                <div key={petSitter._id} className="flex flex-col justify-center items-center mb-3">
                  {petSitter.profilePicture && (
                  <img
                    src={`${path}${petSitter.profilePicture}`}
                    alt="Foto do PetSitter"
                    className="w-12 h-12 rounded-full mb-2"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null // prevents looping
                      currentTarget.src = Dummy2
                    }}
                  />
                  )}
                  <button
                    type="button"
                    className="w-fit text-base text-gray-900 decoration-transparent border-b-[1px] p-0 m-0 leading-none hover:text-gray-600"
                    onClick={() => navigate('/')}
                  >
                    {petSitter.name}
                  </button>
                </div>
              )))
            : (
              <span>Você ainda nao conhece nenhum PetSitter.</span>
            )}
        </div>
        <div>
          <div className="flex flex-row justify-between items-center mt-4">
            <h1 className="mb-3">Ache outro PetSitter</h1>
            <BiSearchAlt className="w-6 h-6 cursor-pointer hover:text-gray-600" onClick={() => { setIsSearchModalOpen(true) }} />
          </div>
          <div className="flex flex-col gap-2">
            {petSittersList && petSittersList.map((petSitter) => (
              (
                <div key={petSitter._id} className="flex flex-row items-center mb-3 gap-3">
                  <img
                    src={`${path}${petSitter.profilePicture}`}
                    alt="Foto do PetSitter"
                    className="w-12 h-12 rounded-full"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null // prevents looping
                      currentTarget.src = Dummy2
                    }}
                  />
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-2">
                      <button
                        type="button"
                        className="w-fit text-base text-gray-900 decoration-transparent border-b-[1px] p-0 m-0 leading-none hover:text-gray-600"
                        onClick={() => {}}
                      >
                        {petSitter.name}
                      </button>
                      <div className="flex flex-row">
                        {calculateRatingsStars(petSitter.ratingsReceived)}
                      </div>
                    </div>
                    <span>
                      {petSitter.district}
                      {' '}
                      -
                      {' '}
                      {petSitter.cityName}
                    </span>
                  </div>
                </div>
              )
            ))}
            <button
              type="button"
              className="w-fit text-base mb-3 decoration-transparent border-b-[1px] p-0 m-0 leading-none hover:text-gray-600"
              onClick={() => {
                setIsSearchModalOpen(true)
              }}
            >
              Buscar
            </button>
          </div>
        </div>
        <div className="pb-3">
          <div className="flex flex-row justify-between mt-4">
            <h1 className="mb-3">Álbum</h1>
            <AiTwotoneEdit
              className="w-6 h-6 cursor-pointer hover:text-gray-600"
              onClick={() => setIsAlbumModalOpen(true)}
            />
          </div>
          {user?.album && user?.album.length > 0
            ? (
              <div className="max-h-80 overflow-auto grid grid-cols-3 gap-2 grid-cols">

                {user.album.map((photo) => <img key={photo._id} src={`${path}${photo.filename}`} alt="" />)}

              </div>
            )
            : <span>Você ainda nao possui fotos</span>}
        </div>
      </div>
      <div className="flex flex-col flex-1 h-full basis-2/5 divide-y divide-y-reverse divide-gray-100">
        <h1 className="mb-3">Sua agenda</h1>
        <div>
          {user?.bookings.map((appointment) => (
            <div key={appointment._id} className="flex flex-col mt-3">
              <div className="flex flex-row text-base font-bold text-gray-900 items-center">
                <span>
                  {new Date(appointment.initialDate).toLocaleDateString('pt-BR')}
                  {' '}
                  {appointment.initialTime}
                  {' '}
                  -
                  {' '}
                  {new Date(appointment.finalDate).toLocaleDateString('pt-BR')}
                  {' '}
                  {appointment.finalTime}
                </span>
                <span className="text-gray-200 ml-1">
                  (
                  {appointmentStatus.find((status) => status.id === String(appointment.status))?.label}
                  )
                </span>
              </div>
              <button
                type="submit"
                className="w-fit text-base text-gray-900 decoration-transparent border-b-[1px] p-0 m-0 leading-none hover:text-gray-600"
                onClick={() => {}}
              >
                {appointment?.petSitterId?.name}
              </button>
              <span>
                {appointment.petSitterId?.address}
                {' '}
                -
                {' '}
                {appointment.petSitterId?.cityName}
              </span>
              <button
                type="button"
                className="w-fit text-base mb-3 decoration-transparent border-b-[1px] p-0 m-0 leading-none hover:text-gray-600"
                onClick={() => setSelectedAppointment(appointment)}
              >
                Cancelar
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h1 className="mb-3">Veja como você está sendo avaliado</h1>
          {user?.ratingsReceived.length
            ? user.ratingsReceived.map((rating: IRating) => (
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
            )) : (
              <span>Você ainda não recebeu avaliações.</span>
            )}
        </div>
      </div>
    </div>
  )
}
export default HomeUser
