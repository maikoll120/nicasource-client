import { logout } from './user.service'

export const handleError = (error: any) => {
  if (error?.response) {
    if (error.response.status === 401) {
      logout()
    }

    throw new Error(error?.response?.data?.message)
  } else {
    throw new Error(error?.message)
  }
}
