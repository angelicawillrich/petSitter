/* eslint-disable no-param-reassign */
import React from 'react'
import axios from 'axios'
import {
  IAvailableDates,
  ILoginForm, IUpdatePetSitter, IUpdatedPets, IUserProfile, IaddPhotoData,
} from '../interfaces/interfaces'

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
    'http://127.0.0.1:3000/user',
    data,
  )
  return result
}

export const updateUserProfile = async (data: IUserProfile) => {
  const result = await axios.patch(
    'http://127.0.0.1:3000/user/profile',
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

export const updateUserPets = async (updatePets: IUpdatedPets) => {
  const result = await axios.patch(
    'http://127.0.0.1:3000/user/pets',
    updatePets,
  )
  return result
}

export const updatePetSitter = async (updatedPetSitter: IUpdatePetSitter) => {
  const result = await axios.patch(
    'http://127.0.0.1:3000/user/petSitter',
    updatedPetSitter,
  )
  return result
}

export const addPhotoAlbum = async (addData: IaddPhotoData) => {
  const result = await axios.patch(
    'http://127.0.0.1:3000/user/addPhotoAlbum',
    addData,
  )
  return result
}

export const deletePhotoAlbum = async (deleteDataParams: string) => {
  const result = await axios.delete(
    `http://127.0.0.1:3000/user/deletePhotoAlbum/deleteDataParams${deleteDataParams}`,
  )
  return result
}

export const fetchPetSitters = async () => {
  const result = await axios.get(
    'http://127.0.0.1:3000/petSitters',
  )
  return result
}

export const filterPetSitter = async (filter: string) => {
  const result = await axios.get(
    `http://127.0.0.1:3000/petSitters/filter${filter}`,
  )
  return result
}

export const getUserById = async (id: string) => {
  const result = await axios.get(
    `http://127.0.0.1:3000/user/${id}`,
  )
  return result.data.userResult
}

export const getPetSitterById = async (id: string) => {
  const result = await axios.get(
    `http://127.0.0.1:3000/petSitter/${id}`,
  )
  return result.data.result[0]
}

export const deletePost = async (deleteDataParams: string) => {
  const result = await axios.delete(
    `http://127.0.0.1:3000/user/deletePost/deleteDataParams${deleteDataParams}`,
  )
  return result
}

export const createPost = async (addData: { petSitterId: string, filename: string | ArrayBuffer | null, description?: string }) => {
  const result = await axios.patch(
    'http://127.0.0.1:3000/user/createPost',
    addData,
  )
  return result
}

export const createAvailableDate = async (data: { userId: string, availableDate: Omit<IAvailableDates, '_id'> }) => {
  const result = await axios.post(
    'http://127.0.0.1:3000/user/petSitter/availableDate',
    data,
  )
  return result
}

export const updateAvailableDate = async (data: { userId: string, availableDateId: string, availableDate: Omit<IAvailableDates, '_id'> }) => {
  const result = await axios.patch(
    'http://127.0.0.1:3000/user/petSitter/availableDate',
    data,
  )
  return result
}

export const deleteAvailableDate = async (availableDateParams: string) => {
  const result = await axios.delete(
    `http://127.0.0.1:3000/user/petSitter/availableDates/availableDateParams${availableDateParams}`,
  )
  return result
}
