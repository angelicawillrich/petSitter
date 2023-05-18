/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import Button from '../components/baseComponents/button'
import Dropdown from '../components/baseComponents/dropdown'
import Input from '../components/baseComponents/input'
import Modal from '../components/baseComponents/modal'
import { services } from '../shared'
import { createBooking } from '../api/booking.api'
import { StoreContext } from '../context/context'

interface ISetBookingModalProps {
  petSitterId: string
  userId: string
  onClose: () => void
}

interface IFormState {
  service: string
  initialDate: string
  initialTime: string
  finalDate: string
  finalTime: string
  petSitterId: string
  userId: string
}

const initialFormState = {
  service: '',
  initialDate: '',
  initialTime: '',
  finalDate: '',
  finalTime: '',
  petSitterId: '',
  userId: '',
}

const CreateBookingModal = ({ petSitterId, userId, onClose }: ISetBookingModalProps) => {
  const [formState, setFormState] = useState<IFormState>(initialFormState)

  const { getLoggedInUser } = useContext(StoreContext)

  useEffect(() => {
    setFormState((previousState) => ({ ...previousState, userId, petSitterId }))
  }, [])

  const handleCreateBooking = async () => {
    if (!formState.service || !formState.initialDate || !formState.finalDate || !formState.initialTime || !formState.finalTime) {
      alert('Todos os campos sao obrigatórios.')
      return
    }

    if (formState.finalDate < formState.initialDate) {
      alert('Data final deve ser maior do que a data inicial.')
      return
    }

    try {
      await createBooking(formState)
      alert('A sua solicitação foi enviada ao PetSitter. Acompanhe o status do agendamento na sua Home.')
      await getLoggedInUser(formState.userId)
    } catch (error: any) {
      console.error(error)
      alert(JSON.parse(error.request.responseText).message)
    }
  }
  const onChangeForm = (field: keyof IFormState, value: string) => {
    setFormState((previousState) => ({ ...previousState, [field]: value }))
  }

  return (
    <Modal title="Agendamento" onClose={onClose}>
      <div className="flex flex-col w-full p-4 justify-center items-center gap-4">
        <div className="flex flex-col w-full p-4 justify-center items-center gap-4">
          <Dropdown
            id="service"
            label="Selecione o servico"
            list={services}
            value={formState.service}
            onChange={(e) => onChangeForm('service', e.target.value)}
            required
          />
          <div className="flex flex-row w-full gap-4">
            <Input
              type="date"
              label="Data início*"
              value={formState.initialDate}
              onChange={(e) => onChangeForm('initialDate', e.target.value)}
              min={moment(new Date()).format('YYYY-MM-DD')}
              required
            />
            <Input
              type="time"
              label="Hora início*"
              value={formState.initialTime}
              onChange={(e) => onChangeForm('initialTime', e.target.value)}
              required
            />
          </div>
          <div className="flex flex-row w-full gap-4">
            <Input
              type="date"
              label="Data fim*"
              value={formState.finalDate}
              onChange={(e) => onChangeForm('finalDate', e.target.value)}
              min={moment(new Date(formState.initialDate)).format('YYYY-MM-DD')}
              required
            />
            <Input
              type="time"
              label="Hora fim*"
              value={formState.finalTime}
              onChange={(e) => onChangeForm('finalTime', e.target.value)}
              required
            />
          </div>
        </div>
        <Button
          type="button"
          onClick={() => handleCreateBooking()}
        >
          Solicitar agendamento

        </Button>
        <span>
          <b>Atenção:</b>
          {' '}
          O agendamento precisa ser aprovado pelo PetSitter. Um e-mail será enviado com a resposta do PetSitter.
        </span>
      </div>
    </Modal>
  )
}

export default CreateBookingModal
