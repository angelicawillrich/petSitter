/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import moment from 'moment'
import React, { useContext } from 'react'
import Button from '../components/baseComponents/button'
import Modal from '../components/baseComponents/modal'
import { IAppointment } from '../interfaces/interfaces'
import { StoreContext } from '../context/context'
import { updateBookingStatus } from '../api/booking.api'

interface RejectAppointmentModalProps {
  onClose: () => void
  appointment: IAppointment
}

const RejectAppointmentModal = ({ onClose, appointment }: RejectAppointmentModalProps) => {
  const {
    getLoggedInUser, loggedInUser, loggedInPetSitter, getLoggedInPetSitter,
  } = useContext(StoreContext)

  const onRejectAppointment = async () => {
    try {
      const data = {
        bookingId: appointment._id,
        status: 'rejected',
      }
      await updateBookingStatus(data)
      loggedInUser && getLoggedInUser(loggedInUser?._id)
      loggedInPetSitter && getLoggedInPetSitter(loggedInPetSitter._id)
      alert('Agendamento rejeitado com sucesso!')
      onClose()
    } catch (error: any) {
      console.error(error)
      alert(JSON.parse(error.request.responseText).message)
    }
  }

  return (
    <Modal title="Rejeitar agendamento" onClose={onClose}>
      <div className="flex flex-col p-4 justify-center items-center">
        <div className="flex flex-col p-4 justify-center items-center">
          <span>
            Você tem certeza que deseja
            {' '}
            <b>rejeitar</b>
            {' '}
            o seguinte agendamento?
          </span>
          <span className="font-bold">
            {moment(new Date(appointment.initialDate)).format('DD/MM/YYYY')}
            {' '}
            {appointment.initialTime}
            {' '}
            -
            {' '}
            {moment(new Date(appointment.finalDate)).format('DD/MM/YYYY')}
            {' '}
            {' '}
            {appointment.finalTime}
          </span>
          {appointment.petSitterId?.name}
        </div>
        <div
          className=""
        >
          <Button onClick={onRejectAppointment}>Rejeitar agendamento</Button>
        </div>
      </div>
    </Modal>
  )
}

export default RejectAppointmentModal
