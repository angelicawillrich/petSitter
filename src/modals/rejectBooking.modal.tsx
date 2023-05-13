/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import moment from 'moment'
import React, { useContext } from 'react'
import Button from '../components/baseComponents/button'
import Modal from '../components/baseComponents/modal'
import { IBooking } from '../interfaces/interfaces'
import { StoreContext } from '../context/context'
import { updateBookingStatus } from '../api/booking.api'

interface IRejectBookingModalProps {
  onClose: () => void
  booking: IBooking
}

const RejectBookingModal = ({ onClose, booking }: IRejectBookingModalProps) => {
  const {
    getLoggedInUser, loggedInUser, loggedInPetSitter, getLoggedInPetSitter,
  } = useContext(StoreContext)

  const onRejectBooking = async () => {
    try {
      const data = {
        bookingId: booking._id,
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
            {moment(new Date(booking.initialDate)).format('DD/MM/YYYY')}
            {' '}
            {booking.initialTime}
            {' '}
            -
            {' '}
            {moment(new Date(booking.finalDate)).format('DD/MM/YYYY')}
            {' '}
            {' '}
            {booking.finalTime}
          </span>
          {booking.petSitterId?.name}
        </div>
        <div
          className=""
        >
          <Button onClick={onRejectBooking}>Rejeitar agendamento</Button>
        </div>
      </div>
    </Modal>
  )
}

export default RejectBookingModal
