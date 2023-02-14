import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
}
const Input = ({label, ...props}: InputProps) => {
    return (
        <div className="flex flex-col w-full">
            <span className='text-base'>{label}</span>
            <input
                {...props}
                className='bg-gray-100 px-4 py-3 text-sm font-light focus:outline-purple-300 rounded placeholder-gray-200'
            />
        </div>
    )
}

export default Input