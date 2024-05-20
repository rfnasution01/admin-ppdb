import { createBrowserRouter } from 'react-router-dom'
import {
  ComingSoonPage,
  DashBoardPage,
  DayaTampungPage,
  LoginPage,
  ProfilSekolahPage,
  RootLayout,
  VerifikasiPage,
} from './loadables'
import { NoData } from '@/components/NoData'

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
        element: <ProfilSekolahPage />,
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
        element: <NoData />,
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
