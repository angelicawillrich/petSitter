/* eslint-disable no-param-reassign */
import React from 'react'
import axios from 'axios'
import {
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
    'http://127.0.0.1:3000/user/create',
    data,
  )
  return result
}

export const updateUserProfile = async (data: IUserProfile) => {
  const result = await axios.post(
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
  const result = await axios.post(
    'http://127.0.0.1:3000/user/pets',
    updatePets,
  )
  return result
}

export const updatePetSitter = async (updatedPetSitter: IUpdatePetSitter) => {
  const result = await axios.post(
    'http://127.0.0.1:3000/petSitter',
    updatedPetSitter,
  )
  return result
}

export const addPhotoAlbum = async (addData: IaddPhotoData) => {
  const result = await axios.post(
    'http://127.0.0.1:3000/user/addPhotoAlbum',
    addData,
  )
  return result
}

export const deletePhotoAlbum = async (deleteData: { userId: string, album: { filename: string, date: Date }[] }) => {
  const result = await axios.post(
    'http://127.0.0.1:3000/user/deletePhotoAlbum',
    deleteData,
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
  return result
}
