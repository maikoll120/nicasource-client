import { useEffect, useState } from 'react'
import { videoService } from '../../lib/services'

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
    <div>
      <h3>Published</h3>
      <button type='button' onClick={handlePublish}>{publish ? 'Unpublish' : 'Publish'}</button>
    </div>

  )
}

export default Published
