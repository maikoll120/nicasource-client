import { useEffect, useState } from 'react'
import { videoService } from '../../lib/services'
import { type IVideo } from '../../lib/models/video.interface'
import { useNavigate } from 'react-router-dom'
import { getDate } from '../../lib/util'
import { Container, Main, ButtonContainer } from './Home.style'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { Alert } from '../../components'

const Home = () => {
  const navigate = useNavigate()
  const [videos, setVideos] = useState<IVideo[]>([])
  const [owned, setOwned] = useState(false)
  const [liked, setLiked] = useState(false)
  const labelNofFound = videos.length ? '' : 'Not Found'
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    async function fetchData () {
      try {
        setVideos(await videoService.getAll(owned, liked))
      } catch (error: any) {
        setAlert(error?.message)
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
    <Container>
      <Main>
        {alert && <Alert message={alert} severity='error' />}

        <h1>Videos</h1>

        <ButtonContainer>
          <Button type='button' size='large' variant='contained' color='success' onClick={handleAddVideo}>Add Video</Button>
        </ButtonContainer>

        <FormControl component='fieldset' variant='standard' sx={{ marginBottom: '2rem' }}>
          <FormLabel component='legend'>Filter</FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch checked={owned} onChange={handleOwnedVideos} name='owned' />
              }
              label='My Videos'
            />
            <FormControlLabel
              control={
                <Switch checked={liked} onChange={handleLikedVideos} name='liked' />
              }
              label='Favorite'
            />
          </FormGroup>
        </FormControl>

        {videos.map(video => {
          return (
            <Card sx={{ marginBottom: '1rem' }} key={video.id}>
              <CardContent>
                <Typography variant='h5' component='div'>
                  {video.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                  Created at: {getDate(video.createdAt)}
                </Typography>
              </CardContent>

              <CardActions>
                <Button type='button' size='small' variant='contained' onClick={() => { handleDetailVideo(video.id ?? 0) }}>Open</Button>
                {video.isOwned && <Button type='button' size='small' onClick={() => { handleEditVideo(video.id ?? 0) }}>Edit</Button>}
              </CardActions>
            </Card>
          )
        })}

        <h3>{labelNofFound}</h3>
      </Main>
    </Container>

  )
}

export default Home
