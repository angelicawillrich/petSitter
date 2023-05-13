/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import React, { useContext } from 'react'
import Button from '../components/baseComponents/button'
import Modal from '../components/baseComponents/modal'
import { IBooking } from '../interfaces/interfaces'
import { updateBookingStatus } from '../api/booking.api'
import { StoreContext } from '../context/context'

interface ICancelBookingModalProps {
  onClose: () => void
  booking: IBooking
}

const CancelBookingModal = ({ onClose, booking }: ICancelBookingModalProps) => {
  const {
    getLoggedInUser, loggedInUser, loggedInPetSitter, getLoggedInPetSitter,
  } = useContext(StoreContext)

  const onCancelBooking = async () => {
    try {
      const data = {
        bookingId: booking._id,
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
          <span className="font-bold">{booking.petSitterId?.name || booking.userId?.name}</span>
          <span>
            {new Date(booking.initialDate).toLocaleDateString('pt-BR')}
            {' '}
            {booking.initialTime}
            {' '}
            -
            {' '}
            {new Date(booking.finalDate).toLocaleDateString('pt-BR')}
            {' '}
            {booking.finalTime}
          </span>
        </div>
        <div
          className=""
        >
          <Button onClick={onCancelBooking}>Cancelar agendamento</Button>
        </div>
      </div>
    </Modal>
  )
}

export default CancelBookingModal
