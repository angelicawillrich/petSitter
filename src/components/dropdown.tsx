import { SelectHTMLAttributes } from "react"

interface ItemList {
    id: any
    value: any
}

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    list: ItemList[]
}
const Dropdown = ({label, list, ...props}: DropdownProps) => {
    return (
        <div className="flex flex-col w-full">
            <span className='text-base'>{label}</span>
            <select
                name='state'
                className='bg-gray-100 h-11 px-4 text-sm font-light focus:outline-purple-300 rounded placeholder-gray-200'
                {...props}
            >
                {list.map((item) => <option key={item.id} value={item.id}>{item.value}</option>)}
            </select>
        </div>
    )
}

export default Dropdown