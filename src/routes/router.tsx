import { createBrowserRouter } from 'react-router-dom'
import { ComingSoonPage, LoginPage, RootLayout } from './loadables'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <ComingSoonPage />,
      },
      {
        path: 'profil-sekolah',
        element: <ComingSoonPage />,
      },
      {
        path: 'daya-tampung',
        element: <ComingSoonPage />,
      },
      {
        path: 'permintaan-verifikasi',
        element: <ComingSoonPage />,
      },
      {
        path: 'data-pendaftar',
        element: <ComingSoonPage />,
      },
      {
        path: 'open-ticket-layanan',
        element: <ComingSoonPage />,
      },
      {
        path: 'pengguna-aplikasi',
        element: <ComingSoonPage />,
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <ComingSoonPage />,
  },
])
