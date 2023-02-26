import { createBrowserRouter, Navigate } from 'react-router-dom'

import { Layout, PrivateRoute } from '../components'
import { Home, Login, Register } from '../pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <PrivateRoute><Home /></PrivateRoute>
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
