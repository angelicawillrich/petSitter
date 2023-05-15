/* eslint-disable no-param-reassign */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Dummy1 from '../assets/dummy1.png'
import {
  calculateRatingAverage, generateInitialsAvatar, showStars,
} from '../utils'
import Accordion from '../components/baseComponents/accordion'
import { path, species } from '../shared'
import { StoreContext } from '../context/context'
import { IUser } from '../interfaces/interfaces'
import { getUserById } from '../api/user.api'

const PageUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<IUser>()

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
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserWithToken(() => navigate('/login'))
  }, [])

  useEffect(() => { getUser() }, [userId])

  const onImageError = (e: any) => {
    e.target.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D'
  }

  return (
    isLoading
      ? (<span>CARREGANDO...</span>)
      : (
        <div className="flex flex-col flex-3 w-full h-full gap-5 md:gap-10 justify-center md:flex-row">
          <div className="flex flex-col flex-1 h-full basis-3/5 divide-y divide-y-reverse divide-gray-100">
            <div>
              <div className="flex flex-row gap-4">
                <div className="flex justify-center items-center mb-3">
                  <img
                    src={`${path}${userInfo?.profilePicture}`}
                    alt="dummy1"
                    className="w-16 h-16 rounded-full mr-2"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null // prevents looping
                      currentTarget.src = Dummy1
                    }}
                  />
                  <div className="fley flex-col">
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
              <div className="flex flex-col  gap-3 mt-4 pb-3">
                {userInfo?.pets && userInfo?.pets.map((pet) => (
                  <Accordion
                    header={(
                      <div className="flex flex-row gap-2 items-center">
                        {pet.picture
                          ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={`${path}${pet.picture}`}
                              alt="Foto do pet"
                              onError={onImageError}
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
                ))}
              </div>
            </div>
            <div className="mt-3 w-full">
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
                        />
                      </div>

                    ))}
                  </div>
                )
                : <span>Usuário ainda não tem fotos.</span>}
            </div>
          </div>
          <div className="flex flex-col flex-1 h-full basis-2/5 divide-y divide-y-reverse divide-gray-100">
            <div className="mt-4">
              <h1 className="mb-3">
                Avaliações
                {' '}
                {userInfo?.ratingsReceived && userInfo?.ratingsReceived?.length > 0 && `${calculateRatingAverage(userInfo.ratingsReceived)}/5`}
              </h1>
              {userInfo?.ratingsReceived.length
                ? userInfo.ratingsReceived.map((rating) => (
                  <div key={rating._id}>
                    <div className="flex flex-col mb-4">
                      <div className="flex flex-row">
                        {showStars(rating.rating)}
                      </div>
                      <span className="text-base text-gray-900">Ótima cliente!</span>
                      <span>José da Silva</span>
                    </div>
                  </div>
                )) : (
                  <span>Este usuário ainda não recebeu avaliações.</span>
                )}
            </div>
          </div>
        </div>
      )
  )
}
export default PageUser
