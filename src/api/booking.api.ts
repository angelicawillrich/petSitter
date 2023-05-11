import React from 'react'
import axios from 'axios'

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
