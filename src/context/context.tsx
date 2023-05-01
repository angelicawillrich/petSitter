import React, {
  createContext,
  useMemo,
  useState,
} from 'react'
import { fetchLoggedInUser, verifyToken } from '../api/user.api'

interface IAllowedPets {
  petId: string
}

interface IServices {
  serviceId: string,
  price: number,
  currency: string
}

interface IPetSitterInfo {
  allowedPets: IAllowedPets[],
  services: IServices[]
  others: string
}

interface IWeekDaysAndTime {
  weekday: string;
  initialTime: string;
  finalTime: string
}

interface IAvailableDates {
  id: string;
  initialDate: Date;
  finalDate: Date;
  weekDaysAndTime: IWeekDaysAndTime[]
}

interface IPet {
  id: string;
  name: string;
  yearBirth: number;
  specie: string;
  breed: string;
  age: number;
  weight: number;
  picture: string | null;
  others: string;
}

interface IAlbum {
  id: string;
  filename: string;
  date: Date;
}

interface IPost {
  id: string;
  filename: string;
  description: string;
  date: Date;
}

export interface IUser {
  _id: string
  email: string;
  password: string;
  name: string;
  address: string;
  district: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  profilePicture: string;
  pets: IPet[];
  album: IAlbum[];
  posts: IPost[];
  isPetSitter: boolean;
  petSitterInfo: IPetSitterInfo;
  availableDates: IAvailableDates[]
  createdAt: Date;
  ratingsReceived: string;
  bookings: string;
}

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
