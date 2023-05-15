import React from 'react'
import { RiStarFill } from 'react-icons/ri'

interface IRating {
  rating: number
  onClick: (value: number) => void
}

export const Rating = ({ rating, onClick }: IRating) => {
  return (
    <div className="flex flex-row">
      <RiStarFill className={`${rating < 1 ? 'text-gray-300' : 'text-yellow-300'} w-8 h-8 cursor-pointer border-2 border-white hover:border-0 `} onClick={() => { onClick(1) }} />
      <RiStarFill className={`${rating < 2 ? 'text-gray-300' : 'text-yellow-300'} w-8 h-8 cursor-pointer border-2 border-white hover:border-0 `} onClick={() => { onClick(2) }} />
      <RiStarFill className={`${rating < 3 ? 'text-gray-300' : 'text-yellow-300'} w-8 h-8 cursor-pointer border-2 border-white hover:border-0 `} onClick={() => { onClick(3) }} />
      <RiStarFill className={`${rating < 4 ? 'text-gray-300' : 'text-yellow-300'} w-8 h-8 cursor-pointer border-2 border-white hover:border-0 `} onClick={() => { onClick(4) }} />
      <RiStarFill className={`${rating < 5 ? 'text-gray-300' : 'text-yellow-300'} w-8 h-8 cursor-pointer border-2 border-white hover:border-0 `} onClick={() => { onClick(5) }} />
    </div>
  )
}

export default Rating
