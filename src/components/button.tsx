import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean
}
const Button = ({ primary = true, ...props }: ButtonProps) => {
  console.log('')
  return (
    <button
      type="button"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={
        `${primary ? 'bg-purple-900' : 'bg-gray-400'}
        w-full max-w-[400px] rounded px-4 p-2 text-base text-gray-100 hover:bg-purple-300 disabled:bg-gray-400 duration-75`
      }
    >
      {props.children}
    </button>
  )
}

export default Button
