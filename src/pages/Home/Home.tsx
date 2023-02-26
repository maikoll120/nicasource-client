import { useEffect, useState } from 'react'
import { userService } from '../../lib/services'
import { type IUser } from '../../lib/models/user.interface'

const Home = () => {
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

  return (
    <>
      <div>Home</div>
      {users.map(user => <div key={user.id}>{user.name}</div>)}
    </>

  )
}

export default Home
