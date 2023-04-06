import React, { SelectHTMLAttributes } from 'react'

interface ItemList {
  id: any
  value: any
  label: string
}

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  list: ItemList[]
}
const Dropdown = ({ label = '', list, ...props }: DropdownProps) => {
  return (
    <div className="flex flex-1 flex-col w-full">
      <span className="text-base">{label}</span>
      <select
        name="state"
        className="bg-gray-100 h-11 px-2 text-sm font-light focus:outline-purple-300 rounded placeholder-gray-200"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        <option value="" disabled>Selecione...</option>
        {list.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
      </select>
    </div>
  )
}

export default Dropdown
