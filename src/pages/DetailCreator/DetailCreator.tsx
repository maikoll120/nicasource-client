import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userService } from '../../lib/services'
import { type IUser } from '../../lib/models/user.interface'
import { Follow } from '../../components'

const DetailCreator = () => {
  const { id } = useParams()
  const userId = id ? parseInt(id) : -1
  const [user, setUser] = useState<IUser>({})

  useEffect(() => {
    async function fetchData () {
      try {
        setUser(await userService.getProfile(userId))
      } catch (error) {
        console.log(error)
      }
    }

    fetchData().catch(console.log)
  }, [])

  return (
    <>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <Follow userId={userId} />
    </>

  )
}

export default DetailCreator
