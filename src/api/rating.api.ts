import React from 'react'
import axios from 'axios'

export interface IVerifyRating {
  reviewerId: string
  reviewedId: string
  rating: number
  description: string
  reviewedByPetSitter: boolean
  _id: string
  createdAt: Date
  updatedAt: Date
}

export interface IUpdateRating {
  rating: number
  description: string
  _id: string
}

export const createRating = async (data: Omit<IVerifyRating, '_id'>) => {
  const result = await axios.post(
    'http://127.0.0.1:3000/rating',
    data,
  )
  return result
}

export const updateRating = async (data: IUpdateRating) => {
  const result = await axios.patch(
    'http://127.0.0.1:3000/rating',
    data,
  )
  return result
}

export const filterRating = async (filter: string): Promise<IVerifyRating> => {
  const result = await axios.get(
    `http://127.0.0.1:3000/rating/filter${filter}`,
  )
  return result?.data?.result?.[0]
}
