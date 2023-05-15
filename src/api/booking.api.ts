import React from 'react'
import axios from 'axios'
import { IBooking } from '../interfaces/interfaces'

export const updateBookingStatus = async (data: { bookingId: string, status: string }) => {
  const result = await axios.patch(
    'http://127.0.0.1:3000/booking',
    data,
  )
  return result
}

export const createBooking = async (data: any) => {
  const result = await axios.post(
    'http://127.0.0.1:3000/booking',
    data,
  )
  return result
}

export const searchBookings = async (filter: string): Promise<IBooking[]> => {
  const result = await axios.get(
    `http://127.0.0.1:3000/booking/filter${filter}`,
  )
  return result?.data?.result
}
