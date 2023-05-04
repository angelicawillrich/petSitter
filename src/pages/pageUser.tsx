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

  const { getUserWithToken } = useContext(StoreContext)
  const { id } = useParams()

  const getUser = async () => {
    try {
      setIsLoading(true)
      if (id) {
        const result = await (await getUserById(id)).data.userResult
        setUserInfo(result)
      } else {
        console.log('ELSE')
        alert('Usuário nao encontrado.')
        navigate('/')
      }
    } catch (err) {
      console.log('ERROR')
      alert('Usuário nao encontrado.')
      navigate('/')
    } finally {
      setIsLoading(false)
    }
  }

  console.log({ userInfo })

  useEffect(() => {
    getUserWithToken(() => navigate('/login'))
  }, [])

  useEffect(() => { getUser() }, [id])

  console.log({ userInfo })

  const onImageError = (e: any) => {
    e.target.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D'
  }

  return (
    isLoading
      ? (<span>LOADING...</span>)
      : (
        <div className="flex flex-col flex-3 w-full h-full gap-10 justify-center md:flex-row">
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
                    <div className="flex">{showStars(4)}</div>
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
                    key={pet.name}
                    showControllers={false}
                  >

                    <div className="flex flex-col w-full gap-1 justify-items-start mb-6 mt-4">
                      <div>
                        Ano de nascimento:
                        {' '}
                        {pet.yearBirth}
                      </div>
                      <div>
                        Peso:
                        {' '}
                        {pet.weight}
                      </div>
                      <div>
                        Espécie:
                        {' '}
                        {species.find((specie) => String(specie.id) === pet.specie)?.label }
                      </div>
                      <div>
                        Raca:
                        {' '}
                        {pet.breed}
                      </div>
                      <div>
                        Outras informacoes:
                        {' '}
                        {pet.others}
                      </div>
                    </div>
                  </Accordion>
                ))}
              </div>
            </div>
            <div>
              <div className="max-h-96 overflow-auto grid grid-cols-4 gap-2 grid-cols mt-4">
                {userInfo?.album && userInfo.album.map((photo) => (
                  <div key={photo._id} className="mb-3">
                    <img
                      src={`${path}${photo.filename}`}
                      alt=""
                      className="w-40"
                    />
                  </div>
                ))}

              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 h-full basis-2/5 divide-y divide-y-reverse divide-gray-100">
            <div className="mt-4">
              <h1 className="mb-3">
                Avaliações
                {' '}
                {userInfo?.ratingsReceived && userInfo?.ratingsReceived?.length > 0 && calculateRatingAverage(userInfo.ratingsReceived)}
                /5
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
                  <span>Este usuário ainda nao recebeu avaliações.</span>
                )}
            </div>
          </div>
        </div>
      )
  )
}
export default PageUser
