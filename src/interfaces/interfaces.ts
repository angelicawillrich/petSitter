export interface ILoginForm {
  email: string
  password: string
}

export interface IUserPersonalInfo {
  id?: string
  name: string
  address: string
  district: string
  state: string
  city: string
  phone: string
  profilePicture: string | ArrayBuffer | null
}
