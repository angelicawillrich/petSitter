import React, {
  useContext, useEffect, useState,
} from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { BsWhatsapp } from 'react-icons/bs'
import 'react-calendar/dist/Calendar.css'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import { AiOutlineDoubleRight } from 'react-icons/ai'
import {
  calculateRatingAverage, generateInitialsAvatar, searchFilteredBookings, showStars,
} from '../utils'
import CreateBookingModal from '../modals/createBooking.modal'
import { StoreContext } from '../context/context'
import { getPetSitterById } from '../api/user.api'
import { IBooking, IRating, IUser } from '../interfaces/interfaces'
import { path, services, species } from '../shared'

import 'react-tooltip/dist/react-tooltip.css'
import Button from '../components/baseComponents/button'
import PetSitterCalendar from '../components/petSitterCalendar'

const PagePetSitter = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [petSitter, setPetSitter] = useState<IUser | undefined>()
  const [userRating, setUserRating] = useState<IRating | null>(null)
  const [missingRatingBooking, setMissingRatingBookings] = useState<IBooking[]>()

  const navigate = useNavigate()

  const { getUserWithToken, loggedInUser } = useContext(StoreContext)
  const { petSitterId } = useParams()

  useEffect(() => {
    if (petSitterId && loggedInUser && petSitterId === loggedInUser._id) {
      navigate('/home')
    }
  }, [loggedInUser, petSitterId])

  const getPetSitter = async () => {
    try {
      setIsLoading(true)
      if (petSitterId) {
        const result = await (await getPetSitterById(petSitterId))
        setPetSitter(result)
      } else {
        alert('PetSitter não encontrado.')
        navigate('/')
      }
    } catch (error: any) {
      console.error(error)
      alert(JSON.parse(error.request.responseText).message)
      navigate('/')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserWithToken(() => navigate('/login'))
  }, [])

  useEffect(() => { getPetSitter() }, [petSitterId])

  const getMissingBookingsRating = async () => {
    if (petSitterId && loggedInUser?._id) {
      const filter = new URLSearchParams({ petSitterId, userId: loggedInUser?._id, status: 'approved' })
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
    if (loggedInUser && petSitterId) {
      result = petSitter?.ratingsReceived.filter((rating) => rating.reviewerId._id === loggedInUser._id
        && rating.reviewedByPetSitter === false)[0]
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
  }, [loggedInUser, petSitterId])

  const onImageError = (e: any) => {
    e.target.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D'
  }

  return (
    isLoading
      ? (<span>CARREGANDO...</span>)
      : (
        <>
          <div className="flex flex-row w-full justify-start mb-4 items-center gap-1">
            <AiOutlineDoubleRight className="w-3 h-3 text-purple-900" />
            <button
              type="button"
              className="text-purple-900 font-bold"
              onClick={() => navigate('/')}
            >
              Home usuário
            </button>
          </div>
          <div className="flex flex-col flex-3 w-full h-full gap-5 md:gap-10 justify-center md:flex-row">
            {petSitter?._id && loggedInUser?._id && isCreateModalOpen
            && <CreateBookingModal petSitterId={petSitter._id} userId={loggedInUser._id} onClose={() => setIsCreateModalOpen(false)} />}
            <div className="flex flex-col flex-1 h-full basis-3/5 divide-y divide-y-reverse divide-gray-100">
              <div>
                <div className="flex flex-row gap-4">
                  <div className="flex justify-center items-center mb-3">
                    {petSitter?.profilePicture
                      ? (
                        <img
                          src={`${path}${petSitter?.profilePicture}`}
                          alt="dummy1"
                          className="w-16 h-16 rounded-full"
                          onError={onImageError}
                        />
                      )
                      : (generateInitialsAvatar(petSitter?.name || ''))}

                    <div className="fley flex-col ml-2">
                      <h1>{petSitter?.name}</h1>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col text-gray-900 text-base mb-3">
                  <span>{petSitter?.address}</span>
                  <span>
                    {petSitter?.district}
                    {' '}
                    -
                    {' '}
                    {petSitter?.cityName}
                    {' '}
                    -
                    {' '}
                    {petSitter?.stateName}
                  </span>
                  <div className="flex flex-row items-center gap-2">
                    {' '}
                    <HiOutlineMail className="w-4 h-4" />
                    <span>
                      {petSitter?.email}
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <BsWhatsapp className="w-4 h-4" />
                    <span>
                      {petSitter?.phone}
                    </span>
                  </div>

                </div>
              </div>
              <div />
              <div className="mt-4 pb-3">
                <h1>Conheça este(a) PetSitter</h1>
                <span>
                  {petSitter?.petSitterInfo?.others || ''}
                </span>
              </div>
              <div className="mt-4 pb-3">
                <h1>Serviços e preços</h1>
                {petSitter?.petSitterInfo.services.length
                  ? petSitter.petSitterInfo.services.map((petSitterService) => (
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
              <div className="flex flex-col mt-4 pb-3">
                <h1>Animais aceitos</h1>
                <div className="flex flex-row">
                  {species.map((specie) => (
                    <specie.icon
                      key={`specie_${specie.id}`}
                      className={`w-12 h-12 m-4 transition-all
                      ${petSitter?.petSitterInfo.allowedPets.includes(specie.id)
                        ? 'text-purple-900 hover:scale-110'
                        : 'text-gray-100'}`}
                    />
                  ))}
                </div>

              </div>
              <div className="pb-3">
                <div className="flex flex-row justify-between mt-4">
                  <h1 className="mb-3">Posts</h1>
                </div>
                <div className="max-h-96 overflow-auto grid grid-cols-4 gap-2 grid-cols">
                  {petSitter?.posts.map((post) => (
                    <div key={post._id} className="flex flex-col">
                      <img
                        src={`${path}${post?.filename}`}
                        alt=""
                        className="w-40"
                      />
                      <span className="text-gray-400 text-xs font-medium">{post.description}</span>
                      <span className="text-gray-400 text-[9px] font-medium">{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  ))}

                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 h-full basis-2/5 divide-y divide-y-reverse divide-gray-100">
              <h1 className="mb-3">Agenda</h1>
              <div className="w-full">
                <PetSitterCalendar petSitter={petSitter} />
                <Button
                  className="mb-3"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  Solicitar agendamento
                </Button>
              </div>
              <div className="flex flex-col mt-4 gap-3 pb-3">
                <h1 className="mb-3">
                  Avaliações
                  {' '}
                  {petSitter?.ratingsReceived && petSitter?.ratingsReceived?.length > 0 && `${calculateRatingAverage(petSitter.ratingsReceived)}/5`}
                </h1>
                {userRating && !missingRatingBooking
                && (
                <div className="flex flex-col bg-purple-50 rounded p-3">
                  <span className="font-bold mb-2">Esta é a sua avaliaçao para este PetSitter:</span>
                  <div className="flex flex-row">
                    {showStars(userRating.rating)}
                  </div>
                  <span>{userRating.description}</span>
                  <span className="text-[9px]">{new Date(userRating.createdAt).toLocaleDateString('pt-BR')}</span>
                  <button
                    type="button"
                    className="w-fit mt-2 text-base text-gray-900 decoration-transparent border-b-[1px] p-0 m-0 leading-none hover:text-gray-600"
                    onClick={() => navigate(`/rating/${userRating._id}`)}
                  >
                    Editar
                  </button>
                </div>
                )}
                {missingRatingBooking && !userRating
                && (
                  <div className="flex flex-col bg-purple-50 rounded p-3">
                    <span className="font-bold">Você ainda não avaliou este PetSitter.</span>
                    <button
                      type="button"
                      className="w-fit mt-2 text-base text-gray-900 decoration-transparent border-b-[1px] p-0 m-0 leading-none hover:text-gray-600"
                      onClick={() => navigate(`/rating/${false}/${loggedInUser?._id}/${petSitterId}`)}
                    >
                      Avalie agora
                    </button>
                  </div>
                )}
                {petSitter?.ratingsReceived.length
                  ? petSitter?.ratingsReceived.map((rating) => (
                    rating._id === userRating?._id
                      ? <React.Fragment key={rating._id} />
                      : (
                        <div key={rating._id} className="flex flex-col mb-4">
                          <div className="flex flex-row">
                            {showStars(rating.rating)}
                          </div>
                          <span className="text-base text-gray-900 font-bold">{rating.description}</span>
                          <span>{rating.reviewerId?.name}</span>
                          <span className="text-[9px]">{new Date(rating.createdAt).toLocaleDateString('pt-BR')}</span>
                        </div>
                      )
                  ))
                  : (<span>Usuário ainda não recebeu avaliações.</span>)}

              </div>
            </div>
          </div>
        </>
      ))
}
export default PagePetSitter
