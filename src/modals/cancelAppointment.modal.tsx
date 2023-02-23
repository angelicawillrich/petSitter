/* eslint-disable max-len */
import React from 'react'
import Button from '../components/button'
import Modal from '../components/modal'
import { Appointment } from '../pages/homeUser'

interface CancelAppointmentModalProps {
  onClose: () => void
  appointment: Appointment
}

const CancelAppointmentModal = ({ onClose, appointment }: CancelAppointmentModalProps) => {
  const onCancelAppointment = () => {
    console.log('cancel appointment')
    onClose()
  }

  const onCancelAction = () => {
    onClose()
  }

  return (
    <Modal title="Cancelar agendamento" onClose={onClose}>
      <>
        <div className="flex flex-col p-4 justify-center items-center">
          <span>Você tem certeza que deseja cancelar o seguinte agendamento?</span>
          <span className="font-bold">
            {appointment.initial_date}
            {' '}
            {appointment.initial_time}
            {' '}
            -
            {' '}
            {appointment.final_date}
            {' '}
            {appointment.final_time}
          </span>
          {appointment.petSitter.name}
        </div>
        <div
          className="flex flex-shrink-0 flex-wrap items-center justify-center rounded-b-md border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50"
        >
          <Button onClick={onCancelAppointment}>Cancelar agendamento</Button>
        </div>
      </>
    </Modal>
  )
}

export default CancelAppointmentModal
