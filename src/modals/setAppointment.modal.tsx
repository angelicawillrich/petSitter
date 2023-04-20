/* eslint-disable max-len */
import React, { useState } from 'react'
import Button from '../components/baseComponents/button'
import Dropdown from '../components/baseComponents/dropdown'
import Input from '../components/baseComponents/input'
import Modal from '../components/baseComponents/modal'
import { services } from '../shared'

interface SetAppointmentModalProps {
  onClose: () => void
}

interface FormState {
  service: string
  initial_date: string
  initial_time: string
  final_date: string
  final_time: string
}

const initialFormState = {
  service: '',
  initial_date: '',
  initial_time: '',
  final_date: '',
  final_time: '',
}

const SetAppointmentModal = ({ onClose }: SetAppointmentModalProps) => {
  const [formState, setFormState] = useState<FormState>(initialFormState)
  const onSetAppointment = () => {
    console.log('set appointment')
    onClose()
  }
  const onChangeForm = (field: keyof FormState, value: string) => {
    setFormState((previousState) => ({ ...previousState, [field]: value }))
  }
  console.log('formState', formState)

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
          />
          <div className="flex flex-row w-full gap-4">
            <Input
              type="date"
              label="Data início*"
              value={formState.initial_date}
              onChange={(e) => onChangeForm('initial_date', e.target.value)}
            />
            <Input
              type="time"
              label="Hora início*"
              value={formState.initial_time}
              onChange={(e) => onChangeForm('initial_time', e.target.value)}
            />
          </div>
          <div className="flex flex-row w-full gap-4">
            <Input
              type="date"
              label="Data fim*"
              value={formState.final_date}
              onChange={(e) => onChangeForm('final_date', e.target.value)}
            />
            <Input
              type="time"
              label="Hora fim*"
              value={formState.final_time}
              onChange={(e) => onChangeForm('final_time', e.target.value)}
            />
          </div>
        </div>
        <Button onClick={onSetAppointment}>Solicitar agendamento</Button>
        <span>
          <b>Atenção:</b>
          {' '}
          O agendamento precisa ser aprovado pelo PetSitter. Um e-mail será enviado com a aprovação ou cancelamento.
        </span>
      </div>
    </Modal>
  )
}

export default SetAppointmentModal
