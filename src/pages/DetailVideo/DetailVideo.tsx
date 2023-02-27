import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { videoService } from '../../lib/services'
import { type IVideo } from '../../lib/models/video.interface'
import { getDate } from '../../lib/util'
import { Like, Alert } from '../../components'
import { Container, Main, FieldWrapper, FieldTitle, FieldImg } from './DetailVideo.style'

const DetailVideo = () => {
  const { id } = useParams()
  const videoId = id ? parseInt(id) : -1
  const [video, setVideo] = useState<IVideo>({})
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    async function fetchData () {
      try {
        setVideo(await videoService.getSummary(videoId))
      } catch (error: any) {
        setAlert(error?.message)
      }
    }

    fetchData().catch(console.log)
  }, [])

  return (
    <Container>
      {alert && <Alert message={alert} severity='error' />}

      <Main>
        <h1>{video.title}</h1>

        <Like videoId={videoId} />

        <FieldWrapper>
          <FieldImg src={require('../../assets/video.png')} />
        </FieldWrapper>

        <FieldWrapper>
          <FieldTitle>Description:</FieldTitle>
          <div>{video.description}</div>
        </FieldWrapper>

        <FieldWrapper>
          <FieldTitle>Url:</FieldTitle>
          <div>{video.url}</div>
        </FieldWrapper>

        <FieldWrapper>
          <FieldTitle>Created at:</FieldTitle>
          <div>{getDate(video.createdAt)}</div>
        </FieldWrapper>

        <FieldWrapper>
          <FieldTitle>Created by:</FieldTitle>
          <Link to={`/creators/${video.user?.id ?? -1}/detail`}>{video.user?.name}</Link>
        </FieldWrapper>

      </Main>
    </Container>

  )
}

export default DetailVideo
