export interface IServices {
  serviceId: string,
  price: string,
  currency: string
}

export interface IPetSitterInfo {
  allowedPets:string[],
  services: IServices[]
  others: string
  _id: string
}

export interface IWeekDaysAndTime {
  weekday: string
  initialTime: string
  finalTime: string
  _id?: string
}

export interface IAvailableDates {
  initialDate: Date
  finalDate: Date
  weekDaysAndTime: IWeekDaysAndTime[]
  _id: string
}

export interface IPet {
  _id: string
  name: string
  yearBirth: number
  specie: string
  breed: string
  age: number
  weight: number
  picture: string | null
  others: string
}

export interface IAlbum {
  _id: string
  id: string
  filename: string
  date: Date
}

export interface IPost {
  _id: string
  filename: string
  description: string
  date: Date
}

export interface IBookingPersonalData {
  address: string
  cityId: string
  cityName: string
  name: string
  profilePicture: string
  stateId: string
  stateName: string
  _id: string
}
export interface IBooking {
  finalDate: Date,
  finalTime: string,
  initialDate: Date,
  initialTime: string,
  status: string,
  userId?: IBookingPersonalData,
  petSitterId?: IBookingPersonalData,
  _id: string
  service: string
}

export interface IRating {
  reviewerId?: {
    name: string
    _id: string
  }
  reviewedId?: {
    name: string
    _id: string
  }
  rating: number
  description: string
  reviewedByPetSitter: boolean
  _id: string
  createdAt: Date
}

export interface IUser {
  _id: string
  email: string
  password: string
  name: string
  address: string
  district: string
  cityId: string
  cityName: string
  stateId: string
  stateName: string
  country: string
  phone: string
  profilePicture: string
  pets: IPet[]
  album?: IAlbum[]
  posts: IPost[]
  isPetSitter: boolean
  petSitterInfo: IPetSitterInfo
  availableDates: IAvailableDates[]
  createdAt: Date
  ratingsReceived: IRating[]
  bookings: IBooking[]
}
export interface ILoginForm {
  email: string
  password: string
}

export interface IUserProfile {
  id?: string
  name: string
  address: string
  district: string
  stateId: string
  stateName: string
  cityId: string
  cityName: string
  phone: string
  profilePicture: string | ArrayBuffer | null
}

export interface IPetFormState {
  _id?: string
  name: string
  yearBirth: number
  weight: number
  specie: string
  breed: string
  picture: string | null
  localPicture?: Blob | MediaSource | null
  others: string
}

export interface IUpdatedPets {
  userId: string
  pets: IPetFormState[]
}

export interface Service {
  serviceId: string
  price: string
  currency?: string
}

export interface IUpdatePetSitter {
  petSitterInfo: {
    allowedPets: string[]
    services: Service[]
    others: string
  }
  userId: string
  _id?: string
}

export interface IaddPhotoData {
  photo: string | ArrayBuffer | null
  userId: string
}

export interface IFilterPetSitter {
  name?: string
  cityId?: string
  stateId?: string
  specie?: string
  rating?: string
}

// export interface IBooking {
//   _id: string
//   initialDate: Date
//   initialTime: string
//   finalDate: Date
//   finalTime: string
//   petSitterId?: {
//     name: string
//     address: string
//     cityName: string
//     _id: string
//   },
//   userId?: {
//     name: string
//     address: string
//     cityName: string
//     _id: string
//   },
//   status: string
// }
