import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { videoService } from '../../lib/services'
import { type IVideo } from '../../lib/models/video.interface'
import { getDate } from '../../lib/util'
import { Like } from '../../components'

const DetailVideo = () => {
  const { id } = useParams()
  const videoId = id ? parseInt(id) : -1
  const [video, setVideo] = useState<IVideo>({})

  useEffect(() => {
    async function fetchData () {
      try {
        setVideo(await videoService.getSummary(videoId))
      } catch (error) {
        console.log(error)
      }
    }

    fetchData().catch(console.log)
  }, [])

  return (
    <>
      <div>{video.title}</div>
      <div>{video.description}</div>
      <div>{video.url}</div>
      <div>{getDate(video.createdAt)}</div>
      <div>{video.user?.name}</div>
      <Like videoId={videoId} />
    </>

  )
}

export default DetailVideo
