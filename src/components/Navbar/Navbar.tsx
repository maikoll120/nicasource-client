import { } from './Navbar.style'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div id='sidebar'>
      <h1>Menu</h1>
      <nav>
        <ul>
          <li>
            <Link to='home'>Home</Link>
          </li>
          <li>
            <Link to='creators'>Creators</Link>
          </li>
          <li>
            <Link to='login'>Login</Link>
          </li>
          <li>
            <Link to='register'>Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
