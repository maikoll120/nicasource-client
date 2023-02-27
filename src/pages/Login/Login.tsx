import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { userService } from '../../lib/services'
import { Container, Main, ButtonGroup } from './Login.style'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Alert } from '../../components'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required()
}).required()

type FormData = yup.InferType<typeof schema>

const Login = () => {
  const navigate = useNavigate()
  const [alert, setAlert] = useState(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      const { email, password } = data
      await userService.login(email, password)
      navigate('/')
    } catch (error: any) {
      setAlert(error?.message)
    }
  }

  useEffect(() => {
    userService.logout()
  }, [])

  return (
    <Container>
      <Card>
        {alert && <Alert message={alert} severity='error' />}
        <CardContent>
          <Main>
            <h1>Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register('email')}
                error={!!errors.email?.message}
                id='outlined-error-helper-text'
                placeholder='Email'
                helperText={errors.email?.message}
                fullWidth
                margin='dense'
              />

              <TextField
                type='password'
                {...register('password')}
                error={!!errors.password?.message}
                id='outlined-error-helper-text'
                placeholder='Password'
                helperText={errors.password?.message}
                fullWidth
                margin='dense'
              />

              <ButtonGroup>
                <Button type='submit' variant='contained' fullWidth>Login</Button>
                <Button type='button' variant='outlined' fullWidth onClick={() => { navigate('/user/register') }}>Register</Button>
              </ButtonGroup>
            </form>
          </Main>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Login
