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
