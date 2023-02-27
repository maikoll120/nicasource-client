import { useEffect, useState } from 'react'
import { videoService } from '../../lib/services'
import { FieldWrapper } from './Published.style'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

interface Props {
  videoId: number
}

const Published = ({ videoId }: Props) => {
  const [publish, setPublish] = useState(false)

  useEffect(() => {
    async function fetchData () {
      try {
        setPublish(await videoService.getPublished(videoId))
      } catch (error) {
        console.log(error)
      }
    }

    fetchData().catch(console.log)
  }, [])

  const handlePublish = async () => {
    try {
      setPublish(await videoService.updatePublished(videoId, !publish))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <FieldWrapper>
      <FormGroup>
        <FormControlLabel control={<Switch checked={publish} onChange={handlePublish} />} label='Published' />
      </FormGroup>
    </FieldWrapper>
  )
}

export default Published
