import axios from 'axios'
import { API_URL } from '../config'
import { type IVideo } from '../models/video.interface'
import { type ILike } from '../models/like.interface'
import { authHeader } from './authHeader'
import { handleError } from './handleError'

export const getAll = async (owned: boolean = false, liked: boolean = false, userId?: number) => {
  try {
    const isOwned = owned ? 'owned=true' : ''
    const isLiked = liked ? 'liked=true' : ''
    const isUserId = userId ? `userid=${userId}` : ''
    const queryParams = [isOwned, isLiked, isUserId]

    const response = await axios.get(`${API_URL}/videos?${queryParams.join('&')}`, { headers: authHeader() })
    const videos: IVideo[] = response.data

    return videos
  } catch (error) {
    return handleError(error)
  }
}

export const getSummary = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/videos/${id}/summary`, { headers: authHeader() })
    const video: IVideo = response.data

    return video
  } catch (error) {
    return handleError(error)
  }
}

export const create = async (video: IVideo) => {
  try {
    const response = await axios.post(`${API_URL}/videos`, { ...video }, { headers: authHeader() })

    return response
  } catch (error) {
    return handleError(error)
  }
}

export const getVideo = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/videos/${id}`, { headers: authHeader() })
    const video: IVideo = response.data

    return video
  } catch (error) {
    return handleError(error)
  }
}

export const updateVideo = async (id: number, video: IVideo) => {
  try {
    const response = await axios.put(`${API_URL}/videos/${id}`, { ...video }, { headers: authHeader() })

    return response
  } catch (error) {
    return handleError(error)
  }
}

export const getPublished = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/videos/${id}/published`, { headers: authHeader() })

    return response.data.published
  } catch (error) {
    return handleError(error)
  }
}

export const updatePublished = async (id: number, published: boolean) => {
  try {
    const response = await axios.put(`${API_URL}/videos/${id}/published`, { published }, { headers: authHeader() })

    return response.data.published
  } catch (error) {
    return handleError(error)
  }
}

export const getLikes = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/videos/${id}/likes`, { headers: authHeader() })
    const likes: ILike = response.data

    return likes
  } catch (error) {
    return handleError(error)
  }
}

export const like = async (id: number) => {
  try {
    const response = await axios.put(`${API_URL}/videos/${id}/like`, {}, { headers: authHeader() })

    return response.data.like
  } catch (error) {
    return handleError(error)
  }
}

export const dislike = async (id: number) => {
  try {
    const response = await axios.put(`${API_URL}/videos/${id}/dislike`, {}, { headers: authHeader() })

    return response.data.like
  } catch (error) {
    return handleError(error)
  }
}
