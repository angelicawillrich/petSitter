/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import moment from 'moment'
import React, { useContext } from 'react'
import Button from '../components/baseComponents/button'
import Modal from '../components/baseComponents/modal'
import { IBooking } from '../interfaces/interfaces'
import { updateBookingStatus } from '../api/booking.api'
import { StoreContext } from '../context/context'

interface IApproveBookingtModalProps {
  onClose: () => void
  booking: IBooking
}

const ApproveBookingtModal = ({ onClose, booking }: IApproveBookingtModalProps) => {
  const {
    getLoggedInUser, loggedInUser, loggedInPetSitter, getLoggedInPetSitter,
  } = useContext(StoreContext)

  const onApproveBookingt = async () => {
    try {
      const data = {
        bookingId: booking._id,
        status: 'approved',
      }
      await updateBookingStatus(data)
      loggedInUser && getLoggedInUser(loggedInUser?._id)
      loggedInPetSitter && getLoggedInPetSitter(loggedInPetSitter._id)
      alert('Agendamento aprovado com sucesso!')
      onClose()
    } catch (error: any) {
      console.error(error)
      alert(JSON.parse(error.request.responseText).message)
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
          <Button onClick={onApproveBookingt}>Aprovar agendamento</Button>
        </div>
      </div>
    </Modal>
  )
}

export default ApproveBookingtModal
