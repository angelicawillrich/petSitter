import React, { useState } from 'react'
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa'

interface AccordionProps {
  header: React.ReactNode
  children: any
  showControllers?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

const Accordion = ({
  header, children, showControllers = true, onEdit, onDelete,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="accordion flex flex-col w-full border-2 rounded-md border-gray-100 p-2">
      <div className="flex w-full items-start">
        <button type="button" className="accordion-header flex w-full text-lg font-bold text-black justify-between mr-2" onClick={() => toggleAccordion()}>
          <h3>{header}</h3>
          <span>{isOpen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}</span>
        </button>
        {showControllers && onEdit && onDelete && (
          <>
            <FaRegEdit
              className="w-6 h-6 mr-2 cursor-pointer"
              onClick={onEdit}
            />
            <BsTrash
              size={15}
              className="w-6 h-6 text-red-600 cursor-pointer"
              onClick={onDelete}
            />
          </>
        )}
      </div>
      {isOpen && (
        <div>{ children }</div>
      )}
    </div>
  )
}

export default Accordion
