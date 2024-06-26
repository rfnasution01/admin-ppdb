import { PageInfoType, PendaftarJalur } from '@/libs/types/pendaftar-type'
import {
  VerifikasiPendaftarType,
  VerifikasiType,
} from '@/libs/types/verifikasi-type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

export type Meta = {
  page?: number
  limit?: number
  count?: number
  total?: number
}

export type Res<T, M = undefined> = {
  status: boolean
  message: string
  data: T
  related: T
  meta: Meta
  mapped?: M
  jlh?: number
  page_info?: PageInfoType
  pendaftar_jalur?: PendaftarJalur[]
  user_lain?: VerifikasiType[]
  verifikasi: VerifikasiPendaftarType
}

const baseURL = import.meta.env.VITE_BASE_URL

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: [
    'profil',
    'kecamatan',
    'biodata',
    'operator',
    'daya-tampung',
    'dashboard',
    'verifikasi',
    'verifikasi-detail',
    'pendaftar',
    'prestasi',
    'cari',
    'tiket',
    'detail-tiket',
    'notifikasi',
    'tiket-sekolah',
    'tiket-detail-sekolah',
    'notifikasi-sekolah',
    'lulus',
    'daftar-ulang',
  ],
  // * it's okay to disable eslint here, because the warning is unnecessary. Each endpoint will be injected from an api slice.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_builder) => ({}),
})
