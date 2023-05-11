/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import moment from 'moment'
import React, { useContext } from 'react'
import Button from '../components/baseComponents/button'
import Modal from '../components/baseComponents/modal'
import { IAppointment } from '../interfaces/interfaces'
import { updateBookingStatus } from '../api/booking.api'
import { StoreContext } from '../context/context'

interface ApproveAppointmentModalProps {
  onClose: () => void
  appointment: IAppointment
}

const ApproveAppointmentModal = ({ onClose, appointment }: ApproveAppointmentModalProps) => {
  const {
    getLoggedInUser, loggedInUser, loggedInPetSitter, getLoggedInPetSitter,
  } = useContext(StoreContext)

  const onApproveAppointment = async () => {
    try {
      const data = {
        bookingId: appointment._id,
        status: 'approved',
      }
      await updateBookingStatus(data)
      loggedInUser && getLoggedInUser(loggedInUser?._id)
      loggedInPetSitter && getLoggedInPetSitter(loggedInPetSitter._id)
      alert('Agendamento aprovado com sucesso!')
      onClose()
    } catch (err) {
      console.error(err)
      alert('Não foi possível aprovar o agendamento. Tente novamente.')
    }
  }

  return (
    <Modal title="Aprovar agendamento" onClose={onClose}>
      <div className="flex flex-col p-4 justify-center items-center">
        <div className="flex flex-col p-4 justify-center items-center">
          <span>
            Você tem certeza que deseja
            {' '}
            <b>aprovar</b>
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
          <Button onClick={onApproveAppointment}>Aprovar agendamento</Button>
        </div>
      </div>
    </Modal>
  )
}

export default ApproveAppointmentModal
