import React from 'react'
import { RiStarHalfFill, RiStarFill } from 'react-icons/ri'

// eslint-disable-next-line import/prefer-default-export
export const showStars = (stars: number) => {
  const starsArr = []
  for (let i = 0; i < Math.floor(stars); i++) {
    starsArr.push(<RiStarFill className="text-yellow-300 w-4 h-4" />)
  }
  if (stars > Math.floor(stars)) {
    starsArr.push(<RiStarHalfFill className="text-yellow-300 w-4 h-4" />)
  }
  return starsArr
}
