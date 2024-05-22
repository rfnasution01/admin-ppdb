import { createBrowserRouter, redirect } from 'react-router-dom'
import {
  ComingSoonPage,
  DashBoardPage,
  DataOperatorPage,
  DayaTampungPage,
  DeetailSiswaPage,
  GantiPasswordPage,
  LoginPage,
  ProfilSekolahPage,
  RootLayout,
  VerifPage,
  VerifikasiLayout,
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
        element: <VerifikasiLayout />,
        children: [
          {
            path: '',
            element: <VerifPage />,
          },
          {
            path: 'detail-siswa',
            element: <DeetailSiswaPage />,
          },
        ],
      },

      {
        path: 'data-pendaftar',
        element: <NoData />,
      },
      {
        path: 'data-operator',
        element: <DataOperatorPage />,
      },
      {
        path: 'open-ticket',
        element: <ComingSoonPage />,
      },
      {
        path: 'pengguna-aplikasi',
        element: <ComingSoonPage />,
      },
      {
        path: 'ganti-password',
        element: <GantiPasswordPage />,
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
