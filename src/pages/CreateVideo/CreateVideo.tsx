import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { videoService } from '../../lib/services'
import { type IVideo } from '../../lib/models/video.interface'
import { Published } from '../../components'

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
      console.log(error?.message)
    }
  }

  useEffect(() => {
    async function fetchData () {
      try {
        if (id) { setVideo(await videoService.getVideo(videoId)) }
      } catch (error) {
        console.log(error)
      }
    }

    if (editMode) { fetchData().catch(console.log) }
  }, [editMode, id])

  useEffect(() => {
    reset(video)
  }, [video])

  return (
    <div>
      <h1>{label} Video</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('title')} />
        <p>{errors.title?.message}</p>

        <input {...register('description')} />
        <p>{errors.description?.message}</p>

        <input {...register('url')} />
        <p>{errors.url?.message}</p>

        {editMode && id && <Published videoId={videoId} />}

        <button type='submit'>{label}</button>
      </form>
    </div>
  )
}

export default CreateVideo
