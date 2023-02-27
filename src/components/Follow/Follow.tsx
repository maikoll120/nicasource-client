import { useEffect, useState } from 'react'
import { userService } from '../../lib/services'
import { type IFollow } from '../../lib/models/follow.interface'
import { FieldWrapper, FieldTitle } from './Follow.style'
import Button from '@mui/material/Button'

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
    <FieldWrapper>
      <FieldTitle>Followers: {followers.countFollowers}</FieldTitle>

      <Button type='button' size='small' variant='contained' color={followers.isFollowed ? 'error' : 'success'} onClick={handleFollowed}>{followers.isFollowed ? 'Unfollow' : 'Follow'}</Button>
    </FieldWrapper>
  )
}

export default Follow
