import { useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from '../lib/services'

interface Props {
  children?: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!userService.getCurrentUser()) { navigate('/user/login') }
  }, [])

  return <>{children}</>
}

export default AuthProvider
