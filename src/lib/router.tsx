import { createBrowserRouter, Navigate } from 'react-router-dom'

import { Layout, PrivateRoute } from '../components'
import { Home, Login, Register, CreateVideo, DetailVideo, Creators, DetailCreator } from '../pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <PrivateRoute><Home /></PrivateRoute>
      }
    ]
  },
  {
    path: '/user',
    children: [
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
    path: '/videos',
    element: <Layout />,
    children: [
      {
        path: 'create',
        element: <PrivateRoute><CreateVideo /></PrivateRoute>
      },
      {
        path: ':id/edit',
        element: <PrivateRoute><CreateVideo editMode /></PrivateRoute>
      },
      {
        path: ':id/detail',
        element: <PrivateRoute><DetailVideo /></PrivateRoute>
      }
    ]
  },
  {
    path: '/creators',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <PrivateRoute><Creators /></PrivateRoute>
      },
      {
        path: ':id/detail',
        element: <PrivateRoute><DetailCreator /></PrivateRoute>
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
])
