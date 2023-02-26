import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <div id='sidebar'>
        <h1>Menu</h1>
        <nav>
          <ul>
            <li>
              <Link to='home'>Home</Link>
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
      <div id='main'>
        <h1>Content</h1>
        <Outlet />
      </div>
    </>
  )
}

export default Layout
