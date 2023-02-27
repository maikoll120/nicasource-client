import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { videoService } from '../../lib/services'
import { type IVideo } from '../../lib/models/video.interface'
import { Published, Alert } from '../../components'
import { Container, Main, ButtonContainer } from './CreateVideo.style'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  url: yup.string().required()
}).required()

type FormData = yup.InferType<typeof schema>

interface Props {
  editMode?: boolean
}

const CreateVideo = ({ editMode = false }: Props) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const videoId = id ? parseInt(id) : -1
  const [video, setVideo] = useState<IVideo>({})
  const label = editMode ? 'Update' : 'Create'
  const [alert, setAlert] = useState(null)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      const video: IVideo = data

      if (editMode && id) {
        await videoService.updateVideo(videoId, video)
      } else {
        await videoService.create(video)
      }

      navigate('/')
    } catch (error: any) {
      setAlert(error?.message)
    }
  }

  useEffect(() => {
    async function fetchData () {
      try {
        if (id) { setVideo(await videoService.getVideo(videoId)) }
      } catch (error: any) {
        setAlert(error?.message)
      }
    }

    if (editMode) { fetchData().catch(console.log) }
  }, [editMode, id])

  useEffect(() => {
    reset(video)
  }, [video])

  return (
    <Container>
      <Main>
        {alert && <Alert message={alert} severity='error' />}

        <h1>{label} Video</h1>

        <Paper elevation={3} sx={{ padding: '1rem' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('title')}
              error={!!errors.title?.message}
              id='outlined-error-helper-text'
              placeholder='Title'
              helperText={errors.title?.message}
              fullWidth
              margin='dense'
            />

            <TextField
              {...register('description')}
              error={!!errors.description?.message}
              id='outlined-error-helper-text'
              placeholder='Description'
              helperText={errors.description?.message}
              fullWidth
              margin='dense'
            />

            <TextField
              {...register('url')}
              error={!!errors.url?.message}
              id='outlined-error-helper-text'
              placeholder='Url'
              helperText={errors.url?.message}
              fullWidth
              margin='dense'
            />

            {editMode && id && <Published videoId={videoId} />}

            <ButtonContainer>
              <Button type='submit' variant='contained' fullWidth>{label}</Button>
              <Button type='button' variant='outlined' fullWidth onClick={() => { navigate('/') }}>Cancel</Button>
            </ButtonContainer>
          </form>
        </Paper>
      </Main>
    </Container>
  )
}

export default CreateVideo
