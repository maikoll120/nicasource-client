import axios from 'axios'
import store from 'store2'
import { BehaviorSubject } from 'rxjs'
import { API_URL, STORAGE_USER } from '../config'
import { type IUser } from '../models/user.interface'
import { authHeader } from './authHeader'

const currentUser = store(STORAGE_USER)
const userSubject = new BehaviorSubject(currentUser)

export const getCurrentUser = () => {
  return userSubject.value
}

export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, { name, email, password })
    const user: IUser = response.data

    if (user?.token) {
      userSubject.next(user)
      store(STORAGE_USER, JSON.stringify(user))
    }

    return user
  } catch (error) {
    return handleError(error)
  }
}

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/users/authenticate`, { email, password })
    const user: IUser = response.data

    if (user?.token) {
      userSubject.next(user)
      store(STORAGE_USER, JSON.stringify(user))
    }

    return user
  } catch (error) {
    return handleError(error)
  }
}

export const logout = () => {
  userSubject.next(null)
  store.remove(STORAGE_USER)
}

export const getAll = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, { headers: authHeader() })
    const users: IUser[] = response.data

    return users
  } catch (error) {
    throw new Error('Error on getAll')
  }
}

const handleError = (error: any) => {
  if (error?.response) {
    if (error.response.status === 401) {
      logout()
    }

    throw new Error(error?.response?.data?.message)
  } else {
    throw new Error(error?.message)
  }
}
