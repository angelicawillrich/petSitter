import React, {
  createContext,
  useMemo,
  useState,
} from 'react'
import { fetchLoggedInUser, fetchPetSitters, verifyToken } from '../api/user.api'
import { IUser } from '../interfaces/interfaces'

interface IContext {
  user?: IUser,
  petSittersList: IUser[],
  getUserWithToken: (onError: () => void) => void
  getLoggedInUser: (id: string) => void
  fetchPetSittersList: () => void
}

export const StoreContext = createContext<IContext>({
  user: undefined,
  petSittersList: [],
  getLoggedInUser: () => {},
  getUserWithToken: () => {},
  fetchPetSittersList: () => {},
})

export const ContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUser | undefined>()
  const [petSittersList, setPetSittersList] = useState<IUser[]>([])

  const getLoggedInUser = async (id: string) => {
    try {
      const result = await fetchLoggedInUser(id)
      setUser(result.data.userResult)
    } catch (error) {
      console.error(error)
    }
  }

  const getUserWithToken = async (onError: () => void) => {
    try {
      const result = await verifyToken()
      if (result.data.user) {
        setUser(result.data.user)
      }
    } catch (error) {
      onError()
    }
  }

  const fetchPetSittersList = async () => {
    try {
      const result = await fetchPetSitters()
      if (result.data.result) {
        setPetSittersList(result.data.result)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const valueContext = useMemo(() => {
    return {
      user,
      petSittersList,
      getLoggedInUser,
      getUserWithToken,
      fetchPetSittersList,
    }
  }, [user, petSittersList, getLoggedInUser, getUserWithToken, fetchPetSittersList])

  return (
    <StoreContext.Provider value={valueContext}>
      {children}
    </StoreContext.Provider>
  )
}
