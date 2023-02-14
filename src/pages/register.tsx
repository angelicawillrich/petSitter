import Logo from '../assets/logo.svg'
import Button from '../components/button'
import Input from '../components/input'

const Register = () => {
    return (
        <div className='flex flex-col gap-4 justify-center items-center'>
            <img src={Logo} />
            <Input
                label='Informe seu e-mail'
                placeholder='johndoe@example.com'
            />
            <Input
                label='Digite uma senha'
                placeholder='**********'
                type="password"
            />
            <Input
                label='Repita a senha'
                placeholder='**********'
                type="password"
            />
            <Button>Criar conta</Button>
            <a href='#'>Já possuo uma conta</a>
        </div>
    )
}

export default Register