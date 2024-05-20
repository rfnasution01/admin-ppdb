import { createBrowserRouter, redirect } from 'react-router-dom'
import {
  ComingSoonPage,
  DashBoardPage,
  DayaTampungPage,
  DetailSiswaPage,
  LoginPage,
  MappingSiswaPage,
  ProfilSekolahPage,
  RootLayout,
  VerifikasiPage,
} from './loadables'
import { NoData } from '@/components/NoData'
import Cookies from 'js-cookie'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    loader: async () => {
      const jwtPayload = Cookies.get('token')

      if (!jwtPayload) {
        return redirect('/login')
      }

      return null
    },
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
        children: [
          {
            path: '',
            element: <MappingSiswaPage />,
          },
          {
            path: 'detail-siswa',
            element: <DetailSiswaPage />,
          },
        ],
      },
      {
        path: 'data-pendaftar',
        element: <NoData />,
      },
      {
        path: 'open-ticket',
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
    loader: async () => {
      const jwtPayload = Cookies.get('token')

      if (jwtPayload) {
        return redirect('/')
      }

      return null
    },
  },
  {
    path: '*',
    element: <ComingSoonPage />,
  },
])
