import { type IUser } from './user.interface'

export interface IVideo {
  id?: number
  title?: string
  description?: string
  url?: string
  published?: boolean
  isOwned?: boolean
  user?: IUser
  createdAt?: string
}
