import { createBrowserRouter, Navigate } from 'react-router-dom'

import { Layout } from '../components'
import { Home, Login, Register } from '../pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
])
