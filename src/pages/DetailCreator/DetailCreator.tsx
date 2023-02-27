import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { userService, videoService } from '../../lib/services'
import { type IUser } from '../../lib/models/user.interface'
import { type IVideo } from '../../lib/models/video.interface'
import { Follow, Alert } from '../../components'
import { Container, Main, FieldWrapper, FieldTitle, CardContent, CardTile } from './DetailCreator.style'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'

const DetailCreator = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const userId = id ? parseInt(id) : -1
  const [user, setUser] = useState<IUser>({})
  const [videos, setVideos] = useState<IVideo[]>([])
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    async function fetchData () {
      try {
        setUser(await userService.getProfile(userId))
        setVideos(await videoService.getAll(undefined, undefined, userId))
      } catch (error: any) {
        setAlert(error?.message)
      }
    }

    fetchData().catch(console.log)
  }, [])

  const handleDetailVideo = (id: number) => {
    navigate(`/videos/${id}/detail`)
  }

  return (
    <Container>
      {alert && <Alert message={alert} severity='error' />}

      <Main>
        <h1>Creator Detail</h1>

        <Follow userId={userId} />

        <FieldWrapper>
          <FieldTitle>Name:</FieldTitle>
          <div>{user.name}</div>
        </FieldWrapper>

        <FieldWrapper>
          <FieldTitle>Email:</FieldTitle>
          <div>{user.email}</div>
        </FieldWrapper>

        <h1>Videos</h1>

        {videos.map(video => {
          return (
            <Card sx={{ marginBottom: '1rem' }} key={video.id}>
              <CardContent>
                <CardTile>
                  <OndemandVideoIcon />
                  <Typography variant='h5' component='div'>
                    {video.title}
                  </Typography>
                </CardTile>

                <CardActions>
                  <Button type='button' size='small' variant='contained' onClick={() => { handleDetailVideo(video.id ?? 0) }}>Open</Button>
                </CardActions>
              </CardContent>
            </Card>
          )
        })}

      </Main>
    </Container>

  )
}

export default DetailCreator
