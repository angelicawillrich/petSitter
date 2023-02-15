import { TextareaHTMLAttributes } from 'react'

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}
const TextArea = ({ label, ...props }: InputProps) => (
  <div className="flex flex-col w-full">
    <span className="text-base">{label}</span>
    <textarea
      {...props}
      className="bg-gray-100 px-4 py-3 text-sm font-light focus:outline-purple-300 rounded placeholder-gray-200"
    />
  </div>
)

export default TextArea
