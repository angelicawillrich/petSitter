import React, {
  createContext,
  useMemo,
  useState,
} from 'react'
import {
  fetchLoggedInUser, fetchPetSitters, getPetSitterById, verifyToken,
} from '../api/user.api'
import { IUser } from '../interfaces/interfaces'

interface IContext {
  loggedInUser?: IUser,
  loggedInPetSitter?: IUser,
  petSittersList: IUser[],
  getUserWithToken: (onError: () => void) => void
  getLoggedInUser: (id: string) => void
  getLoggedInPetSitter: (id: string) => void
  fetchPetSittersList: () => void
}

export const StoreContext = createContext<IContext>({
  loggedInUser: undefined,
  loggedInPetSitter: undefined,
  petSittersList: [],
  getLoggedInUser: () => {},
  getLoggedInPetSitter: () => {},
  getUserWithToken: () => {},
  fetchPetSittersList: () => {},
})

export const ContextProvider = ({ children }: any) => {
  const [loggedInUser, setLoggedInUser] = useState<IUser | undefined>()
  const [loggedInPetSitter, setLoggedInPetSitter] = useState<IUser | undefined>()
  const [petSittersList, setPetSittersList] = useState<IUser[]>([])

  const getLoggedInUser = async (id: string) => {
    try {
      const result = await fetchLoggedInUser(id)
      setLoggedInUser(result.data.userResult)
    } catch (error: any) {
      console.error(error)
      alert(JSON.parse(error.request.responseText).message)
    }
  }

  const getLoggedInPetSitter = async (id: string) => {
    try {
      const result = await getPetSitterById(id)
      setLoggedInPetSitter(result)
    } catch (error: any) {
      console.error(error)
      alert(JSON.parse(error.request.responseText).message)
    }
  }

  const getUserWithToken = async (onError: () => void) => {
    try {
      const result = await verifyToken()
      if (result.data.user) {
        setLoggedInUser(result.data.user)
      }
    } catch (error) {
      onError()
    }
  }

  const fetchPetSittersList = async () => {
    try {
      const result = await fetchPetSitters()
      if (result.data.result) {
        const list = result.data.result.filter((petSitter:IUser) => petSitter._id !== loggedInUser?._id)
        setPetSittersList(list)
      }
    } catch (error: any) {
      console.error(error)
      alert(JSON.parse(error.request.responseText).message)
    }
  }

  const valueContext = useMemo(() => {
    return {
      loggedInUser,
      loggedInPetSitter,
      petSittersList,
      getLoggedInUser,
      getLoggedInPetSitter,
      getUserWithToken,
      fetchPetSittersList,
    }
  }, [loggedInUser, loggedInPetSitter, petSittersList, getLoggedInUser, getLoggedInPetSitter, getUserWithToken, fetchPetSittersList])

  return (
    <StoreContext.Provider value={valueContext}>
      {children}
    </StoreContext.Provider>
  )
}
