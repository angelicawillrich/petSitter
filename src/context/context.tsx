import React, {
  createContext,
  useMemo,
  useState,
} from 'react'
import axios from 'axios'

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
  specie: string;
  breed: string;
  age: number;
  weight: number;
  picture: string;
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
  email: string;
  password: string;
  name: string;
  address: string;
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
  getUser: (id: string) => void
  user?: IUser,
  updateToken: (id: string | null) => void
  token: string | null
}

export const StoreContext = createContext<IContext>({
  getUser: () => {},
  user: undefined,
  updateToken: () => {},
  token: null,
})

export const ContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUser | undefined>()
  const [token, setToken] = useState<string | null>(null)

  const getUser = async (id: string) => {
    await axios.get(`https://http://127.0.0.1:3000/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        setUser(data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const updateToken = (currentToken: string | null) => {
    setToken(currentToken)
  }

  const valueContext = useMemo(() => {
    return {
      user,
      getUser,
      token,
      updateToken,
    }
  }, [user, getUser, token, updateToken])

  return (
    <StoreContext.Provider value={valueContext}>
      {children}
    </StoreContext.Provider>
  )
}
