import { createBrowserRouter, redirect } from 'react-router-dom'
import {
  CariPage,
  ComingSoonPage,
  DashBoardPage,
  DataOperatorPage,
  DataPendaftarPage,
  DayaTampungPage,
  GantiPasswordPage,
  LoginPage,
  PendaftarPage,
  ProfilSekolahPage,
  RootLayout,
  VerifPage,
  VerifikasiLayout,
} from './loadables'
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
            element: <PendaftarPage />,
          },
        ],
      },

      {
        path: 'data-pendaftar',
        element: <DataPendaftarPage />,
      },
      {
        path: 'data-operator',
        element: <DataOperatorPage />,
      },
      {
        path: 'cari-siswa',
        element: <CariPage />,
      },
      {
        path: 'open-ticket',
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
