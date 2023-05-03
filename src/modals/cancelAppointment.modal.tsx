/* eslint-disable max-len */
import moment from 'moment'
import React from 'react'
import Button from '../components/baseComponents/button'
import Modal from '../components/baseComponents/modal'
import { IAppointment } from '../interfaces/interfaces'

interface CancelAppointmentModalProps {
  onClose: () => void
  appointment: IAppointment
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
