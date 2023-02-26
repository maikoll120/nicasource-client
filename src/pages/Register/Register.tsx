import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { userService } from '../../lib/services'

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required()
}).required()

type FormData = yup.InferType<typeof schema>

const Register = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      const { name, email, password } = data
      await userService.register(name, email, password)
      navigate('/')
    } catch (error: any) {
      console.log(error?.message)
    }
  }

  useEffect(() => {
    userService.logout()
  }, [])

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} />
        <p>{errors.name?.message}</p>

        <input {...register('email')} />
        <p>{errors.email?.message}</p>

        <input {...register('password')} />
        <p>{errors.password?.message}</p>

        <input {...register('confirmPassword')} />
        <p>{errors.confirmPassword?.message}</p>

        <input type='submit' />
      </form>
    </div>
  )
}

export default Register
