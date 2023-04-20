/* eslint-disable max-len */
import React from 'react'
import Button from '../components/baseComponents/button'
import Input from '../components/baseComponents/input'
import Modal from '../components/baseComponents/modal'

interface AppointmentModalProps {
  onClose: () => void
}

const appointmentsInitialState = {
  dateStart: undefined,
  dateEnd: undefined,
  weekDays: [
    {
      key: 'monday',
      value: {
        enabled: false,
        start: undefined,
        end: undefined,
      },
    },
    {
      key: 'tuesday',
      value: {
        enabled: false,
        start: undefined,
        end: undefined,
      },
    },
    {
      key: 'wednesday',
      value: {
        enabled: false,
        start: undefined,
        end: undefined,
      },
    },
    {
      key: 'thursday',
      value: {
        enabled: false,
        start: undefined,
        end: undefined,
      },
    },
    {
      key: 'friday',
      value: {
        enabled: false,
        start: undefined,
        end: undefined,
      },
    },
    {
      key: 'saturday',
      value: {
        enabled: false,
        start: undefined,
        end: undefined,
      },
    },
    {
      key: 'sunday',
      value: {
        enabled: false,
        start: undefined,
        end: undefined,
      },
    },
  ],
}

const AppointmentsModal = ({ onClose }: AppointmentModalProps) => {
  const onSaveAppointments = () => {
    console.log('save appointment')
    onClose()
  }

  return (
    <Modal title="Horários de atendimento" onClose={onClose}>
      <form onSubmit={onSaveAppointments}>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-row gap-2 items-center" />
            <span className="text-xs text-gray-400 md:text-base sm:whitespace-nowrap">Hora início*</span>
            <span className="text-xs text-gray-400 md:text-base sm:whitespace-nowrap">Hora fim*</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-row gap-2 items-center">
              <input id="segunda" type="checkbox" />
              <span className="text-xs text-gray-400 md:text-base sm:whitespace-nowrap">Segundas-feiras</span>
            </div>
            <Input type="time" id="segunda_inicio" step="600" />
            <Input type="time" id="segunda_fim" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-row gap-2 items-center">
              <input id="terca" type="checkbox" />
              <span className=" text-xs text-gray-400 md:text-base">Tercas-feiras</span>
            </div>
            <Input type="time" id="terca_inicio" />
            <Input type="time" id="terca_fim" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-row gap-2 items-center">
              <input id="quarta" type="checkbox" />
              <span className=" text-xs text-gray-400 md:text-base">Quartas-feiras</span>
            </div>
            <Input type="time" id="quartas_inicio" />
            <Input type="time" id="quartas_fim" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-row gap-2 items-center">
              <input id="quinta" type="checkbox" />
              <span className=" text-xs text-gray-400 md:text-base">Quintas-feiras</span>
            </div>
            <Input type="time" id="quinta_inicio" />
            <Input type="time" id="quinta_fim" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-row gap-2 items-center">
              <input id="sexta" type="checkbox" />
              <span className=" text-xs text-gray-400 md:text-base">Sextas-feiras</span>
            </div>
            <Input type="time" id="sexta_inicio" />
            <Input type="time" id="sexta_fim" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-row gap-2 items-center">
              <input id="sabado" type="checkbox" />
              <span className=" text-xs text-gray-400 md:text-base">Sábados</span>
            </div>
            <Input type="time" id="sabado_inicio" />
            <Input type="time" id="sabado_fim" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-row gap-2 items-center">
              <input id="domingo" type="checkbox" />
              <span className=" text-xs text-gray-400 md:text-base">Domingos</span>
            </div>
            <Input type="time" id="domingo_inicio" />
            <Input type="time" id="domingo_fim" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <span className="text-xs text-gray-400 md:text-base sm:whitespace-nowrap">Data inicial*</span>
            <span className="text-xs text-gray-400 md:text-base sm:whitespace-nowrap">Data final*</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input type="date" id="period_start" />
            <Input type="date" id="period_end" />
          </div>
          <span className="text-gray-900 text-sm">
            <b>Atenção:</b>
            {' '}
            Os horários escolhidos acima serao aplicados a todas as datas dentro do período entre data inicial e data final.
          </span>
          <div
            className="mt-9"
          >
            <Button type="submit">Salvar</Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AppointmentsModal
