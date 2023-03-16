/* eslint-disable max-len */
import React, { ReactNode } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

interface ModalProps {
  title: string
  children: ReactNode
  onClose: () => void
}

const Modal = ({ title, children, onClose }: ModalProps) => {
  console.log('#')
  return (
    <div className="flex absolute w-full top-0 bg-gray-900 bg-opacity-60 justify-center items-center h-full text-gray-900">
      <div className="flex flex-col bg-white opacity-100 justify-center items-center p-8 rounded">
        <div className="flex flex-row w-full justify-center items-center relative">
          <span className="font-bold">
            {title}
          </span>
          <button
            type="button"
            className="absolute right-0 top-0"
            onClick={onClose}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="relative flex-auto p-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
