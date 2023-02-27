import { useEffect, useState } from 'react'
import { userService } from '../../lib/services'
import { type IUser } from '../../lib/models/user.interface'
import { useNavigate } from 'react-router-dom'
import { Container, Main, CardContent, CardTile } from './Creators.style'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Alert } from '../../components'

const Creator = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<IUser[]>([])
  const [followed, setFollowed] = useState(false)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    async function fetchData () {
      try {
        setUsers(await userService.getAll(followed))
      } catch (error: any) {
        setAlert(error?.message)
      }
    }

    fetchData().catch(console.log)
  }, [followed])

  const handleDetailCreator = (id: number) => {
    navigate(`/creators/${id}/detail`)
  }

  const handleFollowedUsers = () => {
    setFollowed(prev => !prev)
  }

  return (
    <Container>
      {alert && <Alert message={alert} severity='error' />}

      <Main>
        <h1>Creators</h1>

        <FormControl component='fieldset' variant='standard' sx={{ marginBottom: '2rem' }}>
          <FormLabel component='legend'>Filter</FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch checked={followed} onChange={handleFollowedUsers} name='folowed' />
              }
              label='Followed'
            />
          </FormGroup>
        </FormControl>

        {users.map(user => {
          return (
            <Card sx={{ marginBottom: '1rem' }} key={user.id}>
              <CardContent>
                <CardTile>
                  <AccountCircleIcon />
                  <Typography variant='h5' component='div'>
                    {user.name}
                  </Typography>
                </CardTile>

                <CardActions>
                  <Button type='button' size='small' variant='contained' onClick={() => { handleDetailCreator(user.id ?? 0) }}>Detail</Button>
                </CardActions>
              </CardContent>
            </Card>
          )
        })}

      </Main>
    </Container>
  )
}

export default Creator
