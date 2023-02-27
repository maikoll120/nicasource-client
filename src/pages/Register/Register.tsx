import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { userService } from '../../lib/services'
import { Container, Main, ButtonGroup } from './Register.style'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Alert } from '../../components'

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required()
}).required()

type FormData = yup.InferType<typeof schema>

const Register = () => {
  const navigate = useNavigate()
  const [alert, setAlert] = useState(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      const { name, email, password } = data
      await userService.register(name, email, password)
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
            <h1>Register</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register('name')}
                error={!!errors.name?.message}
                id='outlined-error-helper-text'
                placeholder='Name'
                helperText={errors.name?.message}
                fullWidth
                margin='dense'
              />

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

              <TextField
                type='password'
                {...register('confirmPassword')}
                error={!!errors.confirmPassword?.message}
                id='outlined-error-helper-text'
                placeholder='Confirm Password'
                helperText={errors.confirmPassword?.message}
                fullWidth
                margin='dense'
              />

              <ButtonGroup>
                <Button type='submit' variant='contained' fullWidth>Register</Button>
                <Button type='button' variant='outlined' fullWidth onClick={() => { navigate('/user/login') }}>Login</Button>
              </ButtonGroup>

            </form>
          </Main>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Register
