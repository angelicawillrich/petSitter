/* eslint-disable max-len */
import moment from 'moment'
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
  user: {
    name: string
    address: string
    city: string
  },
  status: string
}

interface RejectAppointmentModalProps {
  onClose: () => void
  appointment: Appointment
}

const RejectAppointmentModal = ({ onClose, appointment }: RejectAppointmentModalProps) => {
  const onRejectAppointment = () => {
    console.log('Reject appointment')
    onClose()
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
            {moment(new Date(appointment.initial_date)).format('DD/MM/YYYY')}
            {' '}
            {appointment.initial_time}
            {' '}
            -
            {' '}
            {moment(new Date(appointment.final_date)).format('DD/MM/YYYY')}
            {' '}
            {' '}
            {appointment.final_time}
          </span>
          {appointment.petSitter.name}
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
