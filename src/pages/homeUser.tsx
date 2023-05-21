/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import React, {
  useContext, useEffect, useMemo, useState,
} from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { AiOutlineDoubleRight, AiTwotoneEdit } from 'react-icons/ai'

import { useNavigate } from 'react-router-dom'
import CancelBookingModal from '../modals/cancelBooking.modal'
import SearchPetSitterModal from '../modals/searchPetSitter.modal'
import AlbumModal from '../modals/album.modal'
import { calculateRatingAverage, calculateRatingsStars, showStars } from '../utils'
import { StoreContext } from '../context/context'
import { bookingStatus, path } from '../shared'
import {
  IBooking, IBookingPersonalData, IRating,
} from '../interfaces/interfaces'
import Dummy2 from '../assets/dummy2.png'

const HomeUser = () => {
  const [selectedBooking, setSelectedBooking] = useState<IBooking | undefined>()
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false)

  const navigate = useNavigate()

  const {
    getUserWithToken, loggedInUser, fetchPetSittersList, petSittersList,
  } = useContext(StoreContext)

  useEffect(() => {
    getUserWithToken(() => navigate('/login'))
    fetchPetSittersList()
  }, [])

  const handleCloseBookingModal = () => {
    setSelectedBooking(undefined)
  }

  const recentPetSitters = useMemo(() => {
    if (loggedInUser) {
      const petSitters = loggedInUser?.bookings.reduce((acc: IBookingPersonalData[], current:IBooking) => {
        if (!acc.find((item) => item._id === current.petSitterId?._id)) {
          acc.push(current.petSitterId as IBookingPersonalData)
        }
        return acc
      }, [])
      return petSitters
    }
    return []
  }, [loggedInUser])

  return (
    !loggedInUser
      ? (<span>CARREGANDO...</span>)
      : (
        <>
          {loggedInUser.isPetSitter
          && (
          <div className="flex flex-row w-full justify-start mb-8 items-center gap-1">
            <AiOutlineDoubleRight className="w-3 h-3 text-purple-900" />
            <button
              type="button"
              className="text-purple-900 font-bold"
              onClick={() => navigate(`/homepetsitter/${loggedInUser._id}`)}
            >
              Ir para Home PetSitter
            </button>
          </div>
          )}
          <div className="flex flex-col flex-3 w-full h-full gap-5 md:gap-10 justify-center md:flex-row">
            {selectedBooking && Object.keys(selectedBooking).length > 0 && (
            <CancelBookingModal onClose={handleCloseBookingModal} booking={selectedBooking} />
            )}
            {isSearchModalOpen && <SearchPetSitterModal onClose={() => setIsSearchModalOpen(false)} />}
            {isAlbumModalOpen && <AlbumModal photos={loggedInUser?.album} user={loggedInUser} onClose={() => setIsAlbumModalOpen(false)} />}
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
                          onClick={() => navigate(`/petSitter/${petSitter._id}`)}
                        >
                          {petSitter.name}
                        </button>
                      </div>
                    )))
                  : (
                    <span>Você ainda não conhece nenhum PetSitter.</span>
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
                              onClick={() => navigate(`/petSitter/${petSitter._id}`)}
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
                {loggedInUser?.album && loggedInUser?.album.length > 0
                  ? (
                    <div className="max-h-80 overflow-auto grid grid-cols-3 gap-2 grid-cols">

                      {loggedInUser.album.map((photo) => <img key={photo._id} src={`${path}${photo.filename}`} alt="" />)}

                    </div>
                  )
                  : <span>Você ainda não possui fotos</span>}
              </div>
            </div>
            <div className="flex flex-col flex-1 h-full basis-2/5 divide-y divide-y-reverse divide-gray-100">
              <h1 className="mb-3">Sua agenda</h1>
              {loggedInUser?.bookings.length === 0
                ? <span>Você não tem agendamentos.</span>
                : (
                  <>
                    <div className="max-h-96 overflow-auto">
                      {loggedInUser?.bookings.map((booking) => (
                        <div key={booking._id} className="flex flex-col mt-3">
                          <div className="flex flex-row text-base font-bold text-gray-900 items-center">
                            <span>
                              {new Date(booking.initialDate).toLocaleDateString('pt-BR')}
                              {' '}
                              {booking.initialTime}
                              {' '}
                              -
                              {' '}
                              {new Date(booking.finalDate).toLocaleDateString('pt-BR')}
                              {' '}
                              {booking.finalTime}
                            </span>
                          </div>
                          <span
                            className={`${booking.status === 'rejected' || booking.status === 'canceled'
                              ? 'text-red-300'
                              : booking.status === 'approved'
                                ? 'text-green-300'
                                : 'text-gray-200'}`}
                          >
                            Status:
                            {' '}
                            {bookingStatus.find((status) => status.id === String(booking.status))?.label}
                          </span>
                          <button
                            type="submit"
                            className="w-fit text-base text-gray-900 decoration-transparent border-b-[1px] p-0 m-0 leading-none hover:text-gray-600"
                            onClick={() => navigate(`/petsitter/${booking.petSitterId?._id}`)}
                          >
                            {booking?.petSitterId?.name}
                          </button>
                          <span>
                            {booking.petSitterId?.address}
                            {' '}
                            -
                            {' '}
                            {booking.petSitterId?.cityName}
                          </span>
                          <button
                            type="button"
                            className="w-fit text-base mb-3 decoration-transparent border-b-[1px] p-0 m-0 leading-none hover:text-gray-600"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            Cancelar
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              <div className="mt-4">
                <h1 className="mb-3">
                  Veja como você está sendo avaliado
                  {' '}
                  {loggedInUser?.ratingsReceived && loggedInUser?.ratingsReceived?.length > 0 && `${calculateRatingAverage(loggedInUser.ratingsReceived)}/5`}
                </h1>
                {loggedInUser?.ratingsReceived.length
                  ? loggedInUser.ratingsReceived.map((rating: IRating) => (
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
        </>
      )
  )
}
export default HomeUser
