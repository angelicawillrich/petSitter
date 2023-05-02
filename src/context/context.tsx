import React, {
  createContext,
  useMemo,
  useState,
} from 'react'
import { fetchLoggedInUser, verifyToken } from '../api/user.api'
import { IUser } from '../interfaces/interfaces'

interface IContext {
  user?: IUser,
  getUserWithToken: (onError: () => void) => void
  getLoggedInUser: (id: string) => void
}

export const StoreContext = createContext<IContext>({
  user: undefined,
  getLoggedInUser: () => {},
  getUserWithToken: () => {},
})

export const ContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUser | undefined>()

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

  const valueContext = useMemo(() => {
    return {
      user,
      getLoggedInUser,
      getUserWithToken,
    }
  }, [user, getLoggedInUser, getUserWithToken])

  return (
    <StoreContext.Provider value={valueContext}>
      {children}
    </StoreContext.Provider>
  )
}
