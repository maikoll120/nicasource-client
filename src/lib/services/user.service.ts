import axios from 'axios'
import store from 'store2'
import { BehaviorSubject } from 'rxjs'
import { API_URL, STORAGE_USER } from '../config'
import { type IUser } from '../models/user.interface'
import { type IFollow } from '../models/follow.interface'
import { authHeader } from './authHeader'
import { handleError } from './handleError'

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

export const getAll = async (followed: boolean = false) => {
  try {
    const isFollowed = followed ? 'followed=true' : ''
    const response = await axios.get(`${API_URL}/users?${isFollowed}`, { headers: authHeader() })
    const users: IUser[] = response.data

    return users
  } catch (error) {
    return handleError(error)
  }
}

export const getProfile = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}/profile`, { headers: authHeader() })
    const user: IUser = response.data

    return user
  } catch (error) {
    return handleError(error)
  }
}

export const getFollowers = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}/followers`, { headers: authHeader() })
    const followers: IFollow = response.data

    return followers
  } catch (error) {
    return handleError(error)
  }
}

export const follow = async (id: number) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}/follow`, {}, { headers: authHeader() })

    return response.data.follow
  } catch (error) {
    return handleError(error)
  }
}

export const unfollow = async (id: number) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}/unfollow`, {}, { headers: authHeader() })

    return response.data.follow
  } catch (error) {
    return handleError(error)
  }
}
