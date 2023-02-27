import { useEffect, useState } from 'react'
import { videoService } from '../../lib/services'
import { type ILike } from '../../lib/models/like.interface'

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
    <div>
      <h3>Likes: {likes.countLikes}</h3>

      <button type='button' onClick={handleLiked}>{likes.isLiked ? 'Dislike' : 'Like'}</button>
    </div>

  )
}

export default Like
