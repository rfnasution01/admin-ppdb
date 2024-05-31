import { Res, api } from '../api'
import {
  TiketDetailType,
  TiketParams,
  TiketType,
} from '@/libs/types/tiket-type'

export const TiketEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getTiket: builder.query<Res<TiketType[]>, TiketParams>({
      query: ({ page, page_size, status, search }) => ({
        url: `sekolah/layanan`,
        params: {
          page: page,
          page_size: page_size,
          status: status,
          search: search,
        },
      }),
      providesTags: ['tiket'],
    }),
    getTiketDetail: builder.query<Res<TiketDetailType>, { id: string }>({
      query: ({ id }) => ({
        url: `sekolah/layanan_detail`,
        params: {
          id: id,
        },
      }),
      providesTags: ['tiket'],
    }),
    createFile: builder.mutation<{ url: string }, FormData>({
      query: (foto) => ({
        url: 'upload',
        method: 'POST',
        body: foto,
        formData: true,
      }),
    }),
    createTiketChat: builder.mutation<
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
        url: `sekolah/layanan_chat`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['tiket', 'detail-tiket'],
    }),
  }),
})

export const {
  useGetTiketQuery,
  useGetTiketDetailQuery,
  useCreateFileMutation,
  useCreateTiketChatMutation,
} = TiketEndpoints
