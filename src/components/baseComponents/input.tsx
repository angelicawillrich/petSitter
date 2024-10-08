import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}
const Input = ({ label, className, ...props }: InputProps) => {
  return (
    <div className="flex flex-col w-full">
      <span className="text-base text-gray-400">{label}</span>
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        className="bg-gray-100 px-2 py-3 text-sm font-light focus:outline-purple-300 rounded placeholder-gray-200"
      />
    </div>
  )
}

export default Input
