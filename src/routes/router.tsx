import { createBrowserRouter, redirect } from 'react-router-dom'
import {
  CariPage,
  ComingSoonPage,
  DaptarUlangPage,
  DashBoardLayout,
  DashBoardPage,
  DataOperatorPage,
  DataPendaftarPage,
  DayaTampungPage,
  GantiPasswordPage,
  HasilPPDBPage,
  LampiranPendaftarPage,
  LoginPage,
  PendaftarPage,
  PertanyaanPage,
  ProfilSekolahPage,
  RootLayout,
  TiketTambahPage,
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
        element: <DashBoardLayout />,
        children: [
          {
            path: '',
            element: <DashBoardPage />,
          },
          {
            path: 'pendaftar',
            element: <LampiranPendaftarPage />,
          },
        ],
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
        path: 'hasil-ppdb',
        element: <HasilPPDBPage />,
      },
      {
        path: 'daftar-ulang',
        element: <DaptarUlangPage />,
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
        path: 'pertanyaan-siswa',
        element: <DashBoardLayout />,
        children: [
          {
            path: '',
            element: <PertanyaanPage />,
          },
          { path: 'sekolah', element: <TiketTambahPage /> },
        ],
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
