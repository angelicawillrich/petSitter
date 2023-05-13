/* eslint-disable max-len */
import React, {
  ChangeEvent, useContext, useEffect, useState,
} from 'react'
import moment from 'moment'
import Button from '../components/baseComponents/button'
import Input from '../components/baseComponents/input'
import Modal from '../components/baseComponents/modal'
import { StoreContext } from '../context/context'
import { listWeekDays } from '../shared'
import { createAvailableDate, updateAvailableDate } from '../api/user.api'
import { IWeekDaysAndTime } from '../interfaces/interfaces'

interface IBookingModalProps {
  selectedAvailableDateId: string
  onClose: () => void
}

interface IWeekDaysState {
  [key:string]: {
    initialTime: string,
    finalTime: string,
  }
}

interface IDatesState {
  initialDate: string
  finalDate: string
}

const datesInitialState = {
  initialDate: '',
  finalDate: '',
}

const AvailableDatesModal = ({ selectedAvailableDateId, onClose }: IBookingModalProps) => {
  const [formStateDates, setFormStateDates] = useState<IDatesState>(datesInitialState)
  const [formStateWeekDays, setFormStateWeekDays] = useState<IWeekDaysState>({})

  const { loggedInPetSitter, getLoggedInPetSitter } = useContext(StoreContext)

  useEffect(() => {
    if (selectedAvailableDateId && loggedInPetSitter) {
      const selectedAvailableDateResult = loggedInPetSitter?.availableDates.find((item) => item._id === selectedAvailableDateId)
      if (selectedAvailableDateResult) {
        const formattedSelectedAvailableDate: IWeekDaysState = {}
        selectedAvailableDateResult.weekDaysAndTime.forEach((availableDate) => {
          formattedSelectedAvailableDate[availableDate.weekday] = {
            initialTime: availableDate.initialTime,
            finalTime: availableDate.finalTime,
          }
        })
        setFormStateWeekDays(formattedSelectedAvailableDate)
        setFormStateDates({ initialDate: String(selectedAvailableDateResult.initialDate).split('T')[0], finalDate: String(selectedAvailableDateResult.finalDate).split('T')[0] })
      }
    }
  }, [selectedAvailableDateId, loggedInPetSitter])

  const onChangeCheckbox = (event:ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFormStateWeekDays((previousState) => ({
        ...previousState,
        [event.target.value]: {
          initialTime: '08:00',
          finalTime: '18:00',
        },
      }))
    } else {
      setFormStateWeekDays((previousState) => {
        const temp = previousState
        delete temp[event.target.value]
        return { ...temp }
      })
    }
  }

  const onSave = async () => {
    if (!loggedInPetSitter) return

    if (!formStateDates.finalDate || !formStateDates.initialDate) {
      alert('Preencha os campos de datas.')
      return
    }
    if (!Object.keys(formStateWeekDays).length) {
      alert('Selecione os dias e horários de atendimento.')
      return
    }

    if (formStateDates.finalDate < formStateDates.initialDate) {
      alert('Data final deve ser maior do que a data inicial.')
      return
    }

    const formattedWeekDays: IWeekDaysAndTime[] = Object.entries(formStateWeekDays).map(([key, value]) => {
      return {
        weekday: key,
        initialTime: value.initialTime,
        finalTime: value.finalTime,
      }
    })

    const availableDateId = selectedAvailableDateId

    const availableDate = {
      initialDate: new Date(formStateDates.initialDate),
      finalDate: new Date(formStateDates.finalDate),
      weekDaysAndTime: formattedWeekDays,
    }

    try {
      if (selectedAvailableDateId) {
        const data = {
          userId: loggedInPetSitter._id,
          availableDateId,
          availableDate,
        }
        await updateAvailableDate(data)
      } else {
        const data = {
          userId: loggedInPetSitter._id,
          availableDate,
        }
        await createAvailableDate(data)
      }

      getLoggedInPetSitter(loggedInPetSitter?._id)
      alert('Horário salvo com sucesso!')
      onClose()
    } catch (error: any) {
      console.error(error)
      alert(JSON.parse(error.request.responseText).message)
    }
  }

  return (
    <Modal title="Horários de atendimento" onClose={onClose}>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-row gap-2 items-center" />
          <span className="text-xs text-gray-400 md:text-base sm:whitespace-nowrap">Hora início*</span>
          <span className="text-xs text-gray-400 md:text-base sm:whitespace-nowrap">Hora fim*</span>
        </div>
        {listWeekDays.map((weekDay) => (
          <div key={weekDay.id} className="grid grid-cols-3 gap-3">
            <div className="flex flex-row gap-2 items-center">
              <input
                checked={!!formStateWeekDays[weekDay.id]}
                value={weekDay.id}
                type="checkbox"
                onChange={onChangeCheckbox}
              />
              <span className="text-xs text-gray-400 md:text-base sm:whitespace-nowrap">{weekDay.label}</span>
            </div>
            <Input
              id={`${weekDay.id}_initial`}
              type="time"
              value={formStateWeekDays[weekDay.id]?.initialTime ?? ''}
              onChange={(e) => setFormStateWeekDays((prev) => ({ ...prev, [weekDay.id]: { ...prev[weekDay.id], initialTime: e?.target.value } }))}
              disabled={!formStateWeekDays[weekDay.id]}
            />
            <Input
              id={`${weekDay.id}final`}
              type="time"
              value={formStateWeekDays[weekDay.id]?.finalTime ?? ''}
              onChange={(e) => setFormStateWeekDays((prev) => ({ ...prev, [weekDay.id]: { ...prev[weekDay.id], finalTime: e?.target.value } }))}
              disabled={!formStateWeekDays[weekDay.id]}
            />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="date"
            id="period_start"
            min={moment(new Date()).format('YYYY-MM-DD')}
            value={formStateDates?.initialDate}
            onChange={(e) => setFormStateDates((previousState: IDatesState) => ({ ...previousState, initialDate: e.target.value }))}
          />
          <Input
            type="date"
            id="period_end"
            min={moment(new Date(formStateDates.initialDate)).format('YYYY-MM-DD')}
            value={formStateDates?.finalDate}
            onChange={(e) => setFormStateDates((previousState: IDatesState) => ({ ...previousState, finalDate: e.target.value }))}
          />
        </div>
        <span className="text-gray-900 text-sm">
          <b>Atenção:</b>
          {' '}
          Os horários escolhidos acima serao aplicados a todas as datas dentro do período entre data inicial e data final.
        </span>
        <div
          className="mt-9"
        >
          <Button
            type="button"
            onClick={() => onSave()}
          >
            Salvar
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default AvailableDatesModal
