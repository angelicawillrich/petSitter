import React, { useContext, useEffect, useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { BsWhatsapp } from 'react-icons/bs'
import 'react-calendar/dist/Calendar.css'
import { useNavigate, useParams } from 'react-router-dom'
import {
  calculateRatingAverage, generateInitialsAvatar, showStars,
} from '../utils'
import SetAppointmentModal from '../modals/setAppointment.modal'
import { StoreContext } from '../context/context'
import { getPetSitterById } from '../api/user.api'
import { IUser } from '../interfaces/interfaces'
import { path, services, species } from '../shared'

import 'react-tooltip/dist/react-tooltip.css'
import Button from '../components/baseComponents/button'
import PetSitterCalendar from '../components/petSitterCalendar'

const PagePetSitter = () => {
  const [isSetAppointmentModalOpen, setIsSetAppointmentModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [petSitter, setPetSitter] = useState<IUser | undefined>()

  const navigate = useNavigate()

  const { getUserWithToken, loggedInUser } = useContext(StoreContext)
  const { petSitterId } = useParams()

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
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserWithToken(() => navigate('/login'))
  }, [])

  useEffect(() => { getPetSitter() }, [petSitterId])

  const onImageError = (e: any) => {
    e.target.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D'
  }

  return (
    isLoading
      ? (<span>CARREGANDO...</span>)
      : (
        <div className="flex flex-col flex-3 w-full h-full gap-5 md:gap-10 justify-center md:flex-row">
          {petSitter?._id && loggedInUser?._id && isSetAppointmentModalOpen
            && <SetAppointmentModal petSitterId={petSitter._id} userId={loggedInUser._id} onClose={() => setIsSetAppointmentModalOpen(false)} />}
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
                    key={specie.id}
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
                    <span className="text-gray-400 text-[8px] font-medium">{new Date(post.date).toLocaleDateString('pt-BR')}</span>
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
                onClick={() => setIsSetAppointmentModalOpen(true)}
              >
                Solicitar agendamento
              </Button>
            </div>
            <div className="mt-4">
              <h1 className="mb-3">
                Avaliações
                {' '}
                {petSitter?.ratingsReceived && petSitter?.ratingsReceived?.length > 0 && `${calculateRatingAverage(petSitter.ratingsReceived)}/5`}
              </h1>
              {petSitter?.ratingsReceived.length
                ? petSitter?.ratingsReceived.map((rating) => (
                  <div key={rating._id} className="flex flex-col mb-4">
                    <div className="flex flex-row">
                      {showStars(rating.rating)}
                    </div>
                    <span className="text-base text-gray-900 font-bold">{rating.description}</span>
                    <span>{rating.reviewerId?.name}</span>
                    <span className="text-[8px]">{new Date(rating.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                ))
                : (<span>Usuário ainda não recebeu avaliações.</span>)}

            </div>
          </div>
        </div>
      ))
}
export default PagePetSitter
