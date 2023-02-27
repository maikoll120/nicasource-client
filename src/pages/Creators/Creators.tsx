import { useEffect, useState } from 'react'
import { userService } from '../../lib/services'
import { type IUser } from '../../lib/models/user.interface'
import { useNavigate } from 'react-router-dom'

const Creator = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    async function fetchData () {
      try {
        setUsers(await userService.getAll())
      } catch (error) {
        console.log(error)
      }
    }

    fetchData().catch(console.log)
  }, [])

  const handleDetailCreator = (id: number) => {
    navigate(`/creators/${id}/detail`)
  }

  return (
    <>
      <div>Creators</div>
      {users.map(user => <div key={user.id} onClick={() => { handleDetailCreator(user.id ?? 0) }}>{user.name}</div>)}
    </>

  )
}

export default Creator
