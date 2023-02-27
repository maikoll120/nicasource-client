import { useEffect, useState } from 'react'
import { videoService } from '../../lib/services'
import { type ILike } from '../../lib/models/like.interface'
import { FieldWrapper, FieldTitle } from './Like.style'
import Button from '@mui/material/Button'

interface Props {
  videoId: number
}

const Like = ({ videoId }: Props) => {
  const [likes, setLikes] = useState<ILike>({ countLikes: 0, isLiked: false })
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    async function fetchData () {
      try {
        setLikes(await videoService.getLikes(videoId))
      } catch (error) {
        console.log(error)
      }
    }

    fetchData().catch(console.log)
  }, [refresh])

  const handleLiked = async () => {
    try {
      likes.isLiked ? await videoService.dislike(videoId) : await videoService.like(videoId)
      setRefresh(prev => !prev)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <FieldWrapper>
      <FieldTitle>Likes: {likes.countLikes}</FieldTitle>

      <Button type='button' size='small' variant='contained' color={likes.isLiked ? 'error' : 'success'} onClick={handleLiked}>{likes.isLiked ? 'Dislike' : 'Like'}</Button>
    </FieldWrapper>
  )
}

export default Like
