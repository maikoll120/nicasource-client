import store from 'store2'
import { STORAGE_USER } from '../config'
import { type IUser } from '../models/user.interface'

export const authHeader = () => {
  const user: IUser = JSON.parse(store(STORAGE_USER))
  if (user?.token) { return { Authorization: 'Bearer ' + user.token } } else { return {} }
}
