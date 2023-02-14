import Logo from '../assets/logo.svg'
import Button from '../components/button'
import Input from '../components/input'

const Login = () => {
    return (
        <div className='flex flex-col gap-4 justify-center items-center'>
            <img src={Logo} />
            <Input
                label='E-mail'
                placeholder='johndoe@example.com'
            />
            <Input
                label='Senha'
                placeholder='**********'
                type="password"
            />
            <Button>Entrar</Button>
            <a href='#'>Esqueceu sua senha?</a>
            <a href='#'>Nao possui conta? Crie uma agora.</a>
        </div>
    )
}

export default Login