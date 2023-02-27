import { useEffect, useState } from 'react'
import { userService } from '../../lib/services'
import { type IFollow } from '../../lib/models/follow.interface'

interface Props {
  userId: number
}

const Follow = ({ userId }: Props) => {
  const [followers, setFollowers] = useState<IFollow>({ countFollowers: 0, isFollowed: false })
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    async function fetchData () {
      try {
        setFollowers(await userService.getFollowers(userId))
      } catch (error) {
        console.log(error)
      }
    }

    fetchData().catch(console.log)
  }, [refresh])

  const handleFollowed = async () => {
    try {
      followers.isFollowed ? await userService.unfollow(userId) : await userService.follow(userId)
      setRefresh(prev => !prev)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h3>Followers: {followers.countFollowers}</h3>

      <button type='button' onClick={handleFollowed}>{followers.isFollowed ? 'Unfollow' : 'Follow'}</button>
    </div>

  )
}

export default Follow
