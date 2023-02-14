import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = ({...props}: ButtonProps) => {
    return (
        <button
            {...props}
            className='w-full bg-purple-900 rounded px-4 p-2 text-base text-gray-100 hover:bg-purple-300 disabled:bg-gray-400 duration-75'
        >
            {props.children}
        </button>
    )
}

export default Button