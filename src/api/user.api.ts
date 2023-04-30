/* eslint-disable no-param-reassign */
import React from 'react'
import axios from 'axios'
import { ILoginForm, IUserPersonalInfo } from '../interfaces/interfaces'

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('Token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

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

export const updateUserPersonalInfo = async (data: IUserPersonalInfo) => {
  const result = await axios.post(
    'http://127.0.0.1:3000/user/personalInfo',
    data,
  )
  return result
}

export const fetchLoggedInUser = async (id: string) => {
  const result = await axios.get(
    `http://127.0.0.1:3000/user/${id}`,
  )
  return result
}

export const verifyToken = async () => {
  const result = await axios.get(
    'http://127.0.0.1:3000/verifyToken',
  )
  return result
}
