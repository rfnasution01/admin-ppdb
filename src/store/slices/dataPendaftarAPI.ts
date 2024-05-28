import {
  CariSiswaType,
  NISNParams,
  PendaftarParams,
  PendaftarType,
} from '@/libs/types/pendaftar-type'
import { Res, api } from '../api'

export const DataPendaftarEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDataPendaftar: builder.query<Res<PendaftarType[]>, PendaftarParams>({
      query: ({ search, jalur, page, page_size, verifikasi }) => ({
        url: `sekolah/pendaftar`,
        params: {
          page: page,
          page_size: page_size,
          jalur: jalur,
          search: search,
          verifikasi: verifikasi,
        },
      }),
      providesTags: ['pendaftar'],
    }),
    getNISN: builder.query<Res<CariSiswaType[]>, NISNParams>({
      query: ({ search, page, page_size }) => ({
        url: `sekolah/nik`,
        params: {
          page: page,
          page_size: page_size,
          search: search,
        },
      }),
      providesTags: ['cari'],
    }),
  }),
})

export const { useGetDataPendaftarQuery, useGetNISNQuery } =
  DataPendaftarEndpoints
