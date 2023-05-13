import React from 'react'
import axios from 'axios'

export const createRating = async (data: any) => {
  const result = await axios.post(
    'http://127.0.0.1:3000/rating',
    data,
  )
  return result
}

export default createRating
