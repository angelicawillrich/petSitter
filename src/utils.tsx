import React from 'react'
import { RiStarHalfFill, RiStarFill } from 'react-icons/ri'
import moment from 'moment'
import { BiTime } from 'react-icons/bi'
import { services } from './shared'
import { IBooking, IRating } from './interfaces/interfaces'
import { filterRating } from './api/rating.api'
import { searchBookings } from './api/booking.api'

// eslint-disable-next-line import/prefer-default-export
export const showStars = (stars: number) => {
  const starsArr = []
  for (let i = 0; i < Math.floor(stars); i++) {
    starsArr.push(<RiStarFill key={i} className="text-yellow-300 w-4 h-4" />)
  }
  if (stars > Math.floor(stars)) {
    starsArr.push(<RiStarHalfFill className="text-yellow-300 w-4 h-4" />)
  }
  return starsArr
}

export const getServiceName = (id: string) => {
  return services.find((service) => String(id) === String(service?.id))?.label
}

export const convertBase64 = async (file: any): Promise<string | ArrayBuffer | null> => {
  try {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    await new Promise<void>((resolve) => {
      fileReader.onload = () => resolve()
    })
    return fileReader.result
  } catch (error) {
    throw new Error('Não foi possível ler a imagem.')
  }
}

export const generateInitialsAvatar = (name: string) => {
  const initial = name.substring(0, 1)
  return (
    <div
      className="flex h-10 w-10 bg-purple-200 font-bold text-purple-600 rounded-full justify-center items-center p-0"
    >
      {initial.toLocaleUpperCase()}
    </div>
  )
}

export const calculateRatingAverage = (ratings: IRating[]) => {
  const total = ratings.reduce((acc: number, next: IRating) => {
    return acc + Number(next.rating)
  }, 0)
  return total / ratings.length
}

export const calculateRatingsStars = (ratings: IRating[]) => {
  const stars = calculateRatingAverage(ratings)
  return showStars(stars)
}

export const tileDisabled = ({ date, disabledDates }: any) => {
  let result = false
  if (date < new Date() || disabledDates.some((disabledDate: any) => date.getFullYear() === disabledDate.getFullYear()
            && date.getMonth() === (disabledDate.getMonth() - 1)
            && date.getDate() === disabledDate.getDate())) {
    result = true
  }
  return result
}

interface ITileAvailableDate {
  initialDate: Date
  finalDate: Date
  weekDays?: string[]
}

interface ITile {
  availableDates?: ITileAvailableDate[]
  date: Date
  bookings?: IBooking[]
}

export const tileClassName = ({ date, availableDates, bookings }: ITile): string => {
  let result = 'disabled'
  let isDateAvailable = false

  if (availableDates) {
    for (let i = 0; i < availableDates.length; i++) {
      const availableWeekDays = availableDates[i].weekDays
      const availableInitialDate = availableDates[i].initialDate
      const availableFinalDate = availableDates[i].finalDate
      isDateAvailable = moment(date).isBetween(availableInitialDate, availableFinalDate, undefined, '[]')
        || moment(date).format('YYYY-DD-MM') === moment(availableInitialDate).format('YYYY-DD-MM')
        || moment(date).format('YYYY-DD-MM') === moment(availableFinalDate).format('YYYY-DD-MM')
      if (isDateAvailable && availableWeekDays && availableWeekDays.includes(String(moment(date).weekday()))) {
        result = 'available'
        break
      }
    }
  }

  if (!bookings) return result

  for (let i = 0; i < bookings.length; i++) {
    const bookingInitialDate = bookings[i].initialDate
    const bookingFinallDate = bookings[i].finalDate
    const isDateBooked = moment(date).isBetween(bookingInitialDate, bookingFinallDate, undefined, '[]')
      || moment(date).format('YYYY-DD-MM') === moment(bookingInitialDate).format('YYYY-DD-MM')
      || moment(date).format('YYYY-DD-MM') === moment(bookingFinallDate).format('YYYY-DD-MM')
    if (isDateBooked) {
      result = 'occupied'
      break
    }
  }

  return result
}

interface IWeekDayAndTime {
  initialTime: string
  finalTime: string
  weekday: string
}

export const getTileContent = ({ date, availableDates }: any) => {
  let content = ''
  let info = <span className="text-white">*</span>

  if (availableDates) {
    for (let i = 0; i < availableDates.length; i++) {
      const { initialDate } = availableDates[i]
      const { finalDate } = availableDates[i]
      const availableWeekDays = availableDates[i].weekDays
      const weekDay = String(moment(date).weekday())
      const isDateAvailable = moment(date).isBetween(initialDate, finalDate, undefined, '()')
      if (isDateAvailable && availableWeekDays && availableWeekDays.includes(weekDay)) {
        const dayAndTime = availableDates[i].weekDaysAndTime.find((weekDayAndTime: IWeekDayAndTime) => weekDayAndTime.weekday === weekDay)
        content = (`${dayAndTime.initialTime} - ${dayAndTime.finalTime}`)
        info = <BiTime className="w-3 h-3" />
        break
      }
    }
  }

  return (
    <div className="items-container">
      <div
        key={1}
        className="item flex flex-row justify-center"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={content}
      >
        {info}
      </div>

    </div>
  )
}

export const searchRating = async (filter: string) => {
  const result = await filterRating(filter)
  return result
}

export const searchFilteredBookings = async (filter: string) => {
  const result = await searchBookings(filter)
  return result
}
