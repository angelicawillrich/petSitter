import React from 'react'
import axios from 'axios'
import { ILoginForm } from '../interfaces/interfaces'

export const login = async (formData: ILoginForm) => {
  const result = await axios.post(
    'http://127.0.0.1:3000/login',
    formData,
  )
  return result
}

export const createUser = async (data: { email: string, password: string }) => {
  const result = await axios.post(
    'http://127.0.0.1:3000/user/create',
    data,
  )
  return result
}
