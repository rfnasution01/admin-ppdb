import { Res, api } from '../api'
import { TiketParams, TiketType } from '@/libs/types/tiket-type'

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
    // createAddPrestasi: builder.mutation<void, { data: FormData }>({
    //   query: ({ data }) => ({
    //     url: `sekolah/prestasi/tambah`,
    //     method: 'POST',
    //     body: data,
    //   }),
    //   invalidatesTags: ['profil', 'prestasi', 'verifikasi-detail'],
    // }),
  }),
})

export const { useGetTiketQuery } = TiketEndpoints
