import React from 'react'
import { Tooltip } from 'react-tooltip'
import Calendar from 'react-calendar'
import { getTileContent, tileClassName } from '../utils'
import { IAvailableDates, IUser, IWeekDaysAndTime } from '../interfaces/interfaces'

interface IProps {
  petSitter?: IUser
}

const PetSitterCalendar = ({ petSitter }: IProps) => {
  return (
    <div className="w-full">
      <Calendar
        tileClassName={(date) => tileClassName({
          date: date.date,
          availableDates: petSitter?.availableDates.map((availableDate: IAvailableDates) => {
            return {
              ...availableDate, weekDays: availableDate.weekDaysAndTime.map((day) => day.weekday),
            }
          }),
          bookings: petSitter?.bookings,
        })}
        tileContent={(date) => getTileContent({
          date: date.date,
          availableDates: petSitter?.availableDates.map((availableDate: IAvailableDates) => {
            return {
              ...availableDate, weekDays: availableDate.weekDaysAndTime.map((day: IWeekDaysAndTime) => day.weekday),
            }
          }),
        })}
        selectRange
      />
      <Tooltip id="my-tooltip" />
      <div className="flex gap-2 mb-4">
        <span className="text-red-900 font-bold">*Ocupado</span>
        <span className="text-[#637644] font-bold">*Disponível</span>
      </div>
    </div>
  )
}

export default PetSitterCalendar
