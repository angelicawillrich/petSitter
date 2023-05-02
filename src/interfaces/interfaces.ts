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
  weekday: string;
  initialTime: string;
  finalTime: string
}

export interface IAvailableDates {
  id: string;
  initialDate: Date;
  finalDate: Date;
  weekDaysAndTime: IWeekDaysAndTime[]
}

export interface IPet {
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

export interface IAlbum {
  _id: string;
  id: string;
  filename: string;
  date: Date;
}

export interface IPost {
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
  album?: IAlbum[];
  posts: IPost[];
  isPetSitter: boolean;
  petSitterInfo: IPetSitterInfo;
  availableDates: IAvailableDates[]
  createdAt: Date;
  ratingsReceived: string;
  bookings: string;
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
  state: string
  city: string
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
    allowedPets: string[];
    services: Service[];
    others: string;
  }
  userId: string;
  _id?: string;
}

export interface IaddPhotoData {
  photo: string | ArrayBuffer | null;
  userId: string;
}
