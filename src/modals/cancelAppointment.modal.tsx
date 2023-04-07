/* eslint-disable max-len */
import React from 'react'
import Button from '../components/button'
import Modal from '../components/modal'

interface Appointment {
  id: string
  initial_date: string
  initial_time: string
  final_date: string
  final_time: string
  petSitter: {
    name: string
    address: string
    city: string
  },
  status: string
}

interface CancelAppointmentModalProps {
  onClose: () => void
  appointment: Appointment
}

const CancelAppointmentModal = ({ onClose, appointment }: CancelAppointmentModalProps) => {
  const onCancelAppointment = () => {
    console.log('cancel appointment')
    onClose()
  }

  return (
    <Modal title="Cancelar agendamento" onClose={onClose}>
      <div className="flex flex-col p-4 justify-center items-center">
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
          className=""
        >
          <Button onClick={onCancelAppointment}>Cancelar agendamento</Button>
        </div>
      </div>
    </Modal>
  )
}

export default CancelAppointmentModal
