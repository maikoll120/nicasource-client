import { useEffect, useState } from 'react'
import { videoService } from '../../lib/services'
import { type IVideo } from '../../lib/models/video.interface'
import { useNavigate } from 'react-router-dom'
import { getDate } from '../../lib/util'

const Home = () => {
  const navigate = useNavigate()
  const [videos, setVideos] = useState<IVideo[]>([])
  const [owned, setOwned] = useState(false)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    async function fetchData () {
      try {
        setVideos(await videoService.getAll(owned, liked))
      } catch (error) {
        console.log(error)
      }
    }

    fetchData().catch(console.log)
  }, [owned, liked])

  const handleAddVideo = () => {
    navigate('/videos/create')
  }

  const handleEditVideo = (id: number) => {
    navigate(`/videos/${id}/edit`)
  }

  const handleDetailVideo = (id: number) => {
    navigate(`/videos/${id}/detail`)
  }

  const handleOwnedVideos = () => {
    setOwned(prev => !prev)
  }

  const handleLikedVideos = () => {
    setLiked(prev => !prev)
  }

  return (
    <>
      <div>Videos</div>

      <button type='button' onClick={handleAddVideo}>Add Video</button>

      <button type='button' onClick={handleOwnedVideos}>My Videos</button>

      <button type='button' onClick={handleLikedVideos}>My Favorites</button>

      {videos.map(video => <div key={video.id} onClick={() => { handleDetailVideo(video.id ?? 0) }}>{video.id} - {video.title} - {getDate(video.createdAt)} - {video.isOwned} <button type='button' onClick={() => { handleEditVideo(video.id ?? 0) }}>Edit Video</button></div>)}
    </>

  )
}

export default Home
