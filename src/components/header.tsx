import Logo from '../assets/logo_white.svg'

const Header = () => {
    return (
        <div className='flex w-full items-center justify-center p-2 bg-purple-900'>
            <img src={Logo} className='h-8' />
        </div>
    )
}

export default Header