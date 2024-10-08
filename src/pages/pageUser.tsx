/* eslint-disable no-param-reassign */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineDoubleRight } from 'react-icons/ai'
import moment from 'moment'
import ImageNotFound from '../assets/not_found.png'
import {
  calculateRatingAverage, generateInitialsAvatar, searchFilteredBookings, showStars,
} from '../utils'
import Accordion from '../components/baseComponents/accordion'
import { path, species } from '../shared'
import { StoreContext } from '../context/context'
import { IBooking, IRating, IUser } from '../interfaces/interfaces'
import { getUserById } from '../api/user.api'
import RatingModal from '../modals/rating.modal'

const PageUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<IUser>()
  const [userRating, setUserRating] = useState<IRating | null>(null)
  const [missingRatingBooking, setMissingRatingBookings] = useState<IBooking[]>()
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)
  const [imageError, setImageError] = useState<string[]>([])

  const navigate = useNavigate()

  const { getUserWithToken, loggedInUser } = useContext(StoreContext)
  const { userId } = useParams()

  useEffect(() => {
    if (userId && loggedInUser && userId === loggedInUser._id) {
      navigate('/home')
    }
  }, [loggedInUser, userId])

  const getUser = async () => {
    try {
      setIsLoading(true)
      if (userId) {
        const result = await (await getUserById(userId))
        setUserInfo(result)
      } else {
        alert('Usuário não encontrado.')
        navigate('/')
      }
    } catch (error: any) {
      console.error(error)
      alert(JSON.parse(error.request.responseText).message)
      navigate(-1)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserWithToken(() => navigate('/login'))
  }, [])

  useEffect(() => { getUser() }, [userId, isRatingModalOpen])

  const getMissingBookingsRating = async () => {
    if (userId && loggedInUser?._id) {
      const filter = new URLSearchParams({ userId, petSitterId: loggedInUser?._id, status: 'approved' })
      const result = await searchFilteredBookings(filter.toString())

      const missingRatingsBookingsResult = result.filter((booking) => {
        return moment(booking.finalDate).format('YYYY-MM-DD') < moment(new Date()).format('YYYY-MM-DD')
      })

      if (!userRating) {
        setMissingRatingBookings(missingRatingsBookingsResult)
        setUserRating(null)
      } else {
        setMissingRatingBookings(undefined)
      }
    }
  }

  const getUserRating = async () => {
    let result = null
    if (loggedInUser && userId) {
      result = userInfo?.ratingsReceived.filter((rating) => rating.reviewerId._id === loggedInUser._id
        && rating.reviewedByPetSitter === true)[0]
    }

    if (result) {
      setUserRating(result)
      setMissingRatingBookings(undefined)
    } else {
      getMissingBookingsRating()
    }
  }

  useEffect(() => {
    getUserRating()
  }, [loggedInUser, userId, userInfo])

  return (
    isLoading
      ? (<span>CARREGANDO...</span>)
      : (
        <>
          {loggedInUser?.isPetSitter
          && (
          <div className="flex flex-row w-full justify-start mb-8 items-center gap-1">
            <AiOutlineDoubleRight className="w-3 h-3 text-purple-900" />
            <button
              type="button"
              className="text-purple-900 font-bold"
              onClick={() => navigate(`/homepetsitter/${loggedInUser?._id}`)}
            >
              Ir para Home PetSitter
            </button>
          </div>
          )}
          <div className="flex flex-col flex-3 w-full h-full gap-5 md:gap-10 justify-center md:flex-row">
            {isRatingModalOpen
            && (
              <RatingModal
                onClose={() => setIsRatingModalOpen(false)}
                reviewedName={userInfo?.name || ''}
                ratingId={userRating ? userRating._id : undefined}
                reviewedByPetSitter
                reviewedId={userRating ? undefined : userInfo?._id}
                reviewerId={userRating ? undefined : loggedInUser?._id}
              />
            )}
            <div className="flex flex-col flex-1 h-full basis-3/5 divide-y divide-y-reverse divide-gray-100">
              <div>
                <div className="flex flex-row gap-4">
                  <div className="flex justify-center items-center mb-3">
                    {userInfo?.profilePicture && !imageError.includes(userInfo._id)
                      ? (
                        <img
                          src={`${path}${userInfo.profilePicture}`}
                          alt="Foto de perfil"
                          className="w-16 h-16 rounded-full"
                          onError={() => {
                            setImageError((previousState) => [...previousState, userInfo._id])
                          }}
                        />
                      )
                      : generateInitialsAvatar(userInfo?.name || '')}
                    <div className="fley flex-col ml-2">
                      <h1>{userInfo?.name}</h1>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col text-gray-900 text-base mb-3">
                  <span>{userInfo?.address}</span>
                  <span>
                    {userInfo?.district}
                    {' '}
                    -
                    {' '}
                    {userInfo?.cityName}
                    {' '}
                    -
                    {' '}
                    {userInfo?.stateName}
                  </span>
                  <span>
                    {userInfo?.email}
                  </span>
                  <span>
                    {userInfo?.phone}
                  </span>
                </div>
              </div>
              <div />
              <div className="flex flex-col gap-3 mt-4 pb-3">
                <h1>Pets</h1>
                <div className="flex flex-col gap-3">
                  {userInfo?.pets && userInfo?.pets.length > 0
                    ? userInfo?.pets.map((pet) => (
                      <Accordion
                        header={(
                          <div className="flex flex-row gap-2 items-center">
                            {pet.picture && !imageError.includes(pet._id)
                              ? (
                                <img
                                  src={`${path}${pet.picture}`}
                                  alt="Foto de perfil"
                                  className="w-9 h-9 rounded-full"
                                  onError={() => {
                                    setImageError((previousState) => [...previousState, pet._id])
                                  }}
                                />
                              )
                              : (generateInitialsAvatar(pet.name))}
                            {pet.name}
                          </div>
                    )}
                        key={pet._id}
                        showControllers={false}
                      >

                        <div className="flex flex-col w-full gap-1 justify-items-start mb-6 mt-4">
                          <div>
                            <b>Ano de nascimento:</b>
                            {' '}
                            {pet.yearBirth}
                          </div>
                          <div>
                            <b>Peso:</b>
                            {' '}
                            {pet.weight}
                          </div>
                          <div>
                            <b>Espécie:</b>
                            {' '}
                            {species.find((specie) => String(specie.id) === pet.specie)?.label }
                          </div>
                          <div>
                            <b>Raca:</b>
                            {' '}
                            {pet.breed}
                          </div>
                          <div>
                            <b>Outras informacoes:</b>
                            {' '}
                            {pet.others}
                          </div>
                        </div>
                      </Accordion>
                    ))
                    : <span>Usuário nao registrou pets.</span>}
                </div>
              </div>
              <div className="mt-3 w-full mb-3">
                <h1 className="mb-3">Álbum</h1>
                {userInfo?.album && userInfo?.album?.length > 0
                  ? (
                    <div className="max-h-96 overflow-auto grid grid-cols-4 gap-2 grid-cols mt-4 mb-3">
                      {userInfo.album.map((photo) => (
                        <div key={photo._id} className="mb-3">
                          <img
                            src={`${path}${photo.filename}`}
                            alt=""
                            className="w-40"
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null // prevents looping
                              currentTarget.src = ImageNotFound
                            }}
                          />
                        </div>

                      ))}
                    </div>
                  )
                  : (
                    <div className="mb-3">
                      <span>Usuário ainda não tem fotos.</span>
                    </div>
                  )}
              </div>
            </div>
            <div className="flex flex-col flex-1 h-full basis-2/5 divide-y divide-y-reverse divide-gray-100">
              <div className="mt-4">
                <h1 className="mb-3">
                  Avaliações
                  {' '}
                  {userInfo?.ratingsReceived && userInfo?.ratingsReceived?.length > 0 && `${calculateRatingAverage(userInfo.ratingsReceived)}/5`}
                </h1>
                {userRating && (!missingRatingBooking || missingRatingBooking?.length === 0)
                && (
                <div className="flex flex-col bg-purple-50 rounded p-3">
                  <span className="font-bold mb-2">Esta é a sua avaliaçao para este usuário:</span>
                  <div className="flex flex-row">
                    {showStars(userRating.rating)}
                  </div>
                  <span>{userRating.description}</span>
                  <span className="text-[9px]">{new Date(userRating.createdAt).toLocaleDateString('pt-BR')}</span>
                  <button
                    type="button"
                    className="w-fit mt-2 text-base text-gray-900 decoration-transparent border-b-[1px] p-0 m-0 leading-none hover:text-gray-600"
                    onClick={() => setIsRatingModalOpen(true)}
                  >
                    Editar
                  </button>
                </div>
                )}
                {missingRatingBooking && missingRatingBooking.length > 0 && !userRating
                && (
                  <div className="flex flex-col bg-purple-50 rounded p-3">
                    <span className="font-bold">Você ainda não avaliou este usuário.</span>
                    <button
                      type="button"
                      className="w-fit mt-2 text-base text-gray-900 decoration-transparent border-b-[1px] p-0 m-0 leading-none hover:text-gray-600"
                      onClick={() => setIsRatingModalOpen(true)}
                    >
                      Avalie agora
                    </button>
                  </div>
                )}
                {userInfo?.ratingsReceived && userInfo?.ratingsReceived.length > 0
                  ? userInfo.ratingsReceived.map((rating) => (
                    rating._id === userRating?._id
                      ? <React.Fragment key={rating._id} />
                      : (
                        <div key={rating._id}>
                          <div className="flex flex-col mb-4">
                            <div className="flex flex-row">
                              {showStars(rating.rating)}
                            </div>
                            <span className="text-base text-gray-900">{rating.rating}</span>
                            <span>{rating.reviewerId.name}</span>
                          </div>
                        </div>
                      )
                  )) : (
                    <span>Este usuário ainda não recebeu avaliações.</span>
                  )}
              </div>
            </div>
          </div>
        </>
      )
  )
}
export default PageUser
