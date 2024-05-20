import { createBrowserRouter } from 'react-router-dom'
import {
  ComingSoonPage,
  DashBoardPage,
  DayaTampungPage,
  LoginPage,
  RootLayout,
  VerifikasiPage,
} from './loadables'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <DashBoardPage />,
      },
      {
        path: 'profil-sekolah',
        element: <ComingSoonPage />,
      },
      {
        path: 'daya-tampung',
        element: <DayaTampungPage />,
      },
      {
        path: 'permintaan-verifikasi',
        element: <VerifikasiPage />,
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
