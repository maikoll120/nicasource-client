import { logout } from './user.service'
import { redirect } from 'react-router-dom'

export const handleError = (error: any) => {
  if (error?.response) {
    if (error.response.status === 401) {
      logout()
      redirect('/user/login')
    }

    throw new Error(error?.response?.data?.message)
  } else {
    throw new Error(error?.message)
  }
}
