import {
  ReferensiMasalahType,
  SiswaType,
  TiketSekolahCreateParams,
  TiketSekolahDetailType,
  TiketSekolahParams,
  TiketSekolahType,
} from '@/libs/types/tiket-type'
import { Res, api } from '../api'

export const TiketSekolahEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getTiketSekolah: builder.query<Res<TiketSekolahType[]>, TiketSekolahParams>(
      {
        query: ({ page, page_size, status, search, id_masalah }) => ({
          url: `sekolah/tiket`,
          method: 'GET',
          params: {
            page: page,
            page_size: page_size,
            status: status,
            search: search,
            id_masalah: id_masalah,
          },
        }),
        providesTags: ['tiket-sekolah'],
      },
    ),
    getTiketDetailSekolah: builder.query<
      Res<TiketSekolahDetailType>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `sekolah/tiket_detail`,
        params: {
          id: id,
        },
      }),
      providesTags: ['tiket-detail-sekolah'],
    }),
    getMasalah: builder.query<Res<ReferensiMasalahType[]>, void>({
      query: () => ({
        url: `referensi/masalah`,
        method: 'GET',
      }),
    }),
    getSiswa: builder.query<Res<SiswaType[]>, TiketSekolahParams>({
      query: ({ page, page_size }) => ({
        url: `sekolah/siswa`,
        method: 'GET',
        params: {
          page: page,
          page_size: page_size,
        },
      }),
    }),
    createTiketSekolah: builder.mutation<
      void,
      { data: TiketSekolahCreateParams }
    >({
      query: ({ data }) => ({
        url: `sekolah/tiket`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        'tiket-sekolah',
        'tiket-detail-sekolah',
        'notifikasi-sekolah',
      ],
    }),
    editTiketSekolah: builder.mutation<
      void,
      { data: TiketSekolahCreateParams }
    >({
      query: ({ data }) => ({
        url: `sekolah/tiket/edit`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        'tiket-sekolah',
        'tiket-detail-sekolah',
        'notifikasi-sekolah',
      ],
    }),
    createTiketChatSekolah: builder.mutation<
      void,
      {
        data: {
          id: string
          isi: string
          berkas: string[]
        }
      }
    >({
      query: ({ data }) => ({
        url: `sekolah/tiket_chat`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        'tiket-sekolah',
        'tiket-detail-sekolah',
        'notifikasi-sekolah',
      ],
    }),
    createTutupChatSekolah: builder.mutation<
      void,
      {
        data: {
          id: string
        }
      }
    >({
      query: ({ data }) => ({
        url: `sekolah/tiket_close`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        'tiket-sekolah',
        'tiket-detail-sekolah',
        'notifikasi-sekolah',
      ],
    }),
  }),
})

export const {
  useGetTiketDetailSekolahQuery,
  useGetTiketSekolahQuery,
  useGetMasalahQuery,
  useCreateTiketSekolahMutation,
  useGetSiswaQuery,
  useEditTiketSekolahMutation,
  useCreateTiketChatSekolahMutation,
  useCreateTutupChatSekolahMutation,
} = TiketSekolahEndpoints
