/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import React, { useContext } from 'react'
import Button from '../components/baseComponents/button'
import Modal from '../components/baseComponents/modal'
import { IAppointment } from '../interfaces/interfaces'
import { updateBookingStatus } from '../api/booking.api'
import { StoreContext } from '../context/context'

interface CancelAppointmentModalProps {
  onClose: () => void
  appointment: IAppointment
}

const CancelAppointmentModal = ({ onClose, appointment }: CancelAppointmentModalProps) => {
  const {
    getLoggedInUser, loggedInUser, loggedInPetSitter, getLoggedInPetSitter,
  } = useContext(StoreContext)

  const onCancelAppointment = async () => {
    try {
      const data = {
        bookingId: appointment._id,
        status: 'canceled',
      }
      await updateBookingStatus(data)
      loggedInUser && getLoggedInUser(loggedInUser?._id)
      loggedInPetSitter && getLoggedInPetSitter(loggedInPetSitter._id)
      alert('Agendamento cancelado com sucesso!')
      onClose()
    } catch (error: any) {
      console.error(error)
      alert(JSON.parse(error.request.responseText).message)
    }
  }

  return (
    <Modal title="Cancelar agendamento" onClose={onClose}>
      <div className="flex flex-col p-4 justify-center items-center">
        <div className="flex flex-col p-4 justify-center items-center">
          <span>
            Você tem certeza que deseja
            {' '}
            <b>cancelar</b>
            {' '}
            o seguinte agendamento?
          </span>
          <span className="font-bold">{appointment.petSitterId?.name || appointment.userId?.name}</span>
          <span>
            {new Date(appointment.initialDate).toLocaleDateString('pt-BR')}
            {' '}
            {appointment.initialTime}
            {' '}
            -
            {' '}
            {new Date(appointment.finalDate).toLocaleDateString('pt-BR')}
            {' '}
            {appointment.finalTime}
          </span>
        </div>
        <div
          className=""
        >
          <Button onClick={onCancelAppointment}>Cancelar agendamento</Button>
        </div>
      </div>
    </Modal>
  )
}

export default CancelAppointmentModal
