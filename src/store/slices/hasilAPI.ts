import { Res, api } from '../api'
import { HasilType } from '@/libs/types/hasil-type'

export const HasilEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getHasil: builder.query<Res<HasilType>, { jalur: string }>({
      query: ({ jalur }) => ({
        url: `sekolah/lulus`,
        params: {
          jalur: jalur,
        },
      }),
      providesTags: ['lulus'],
    }),
    getHasilExcel: builder.query<Res<HasilType>, { jalur: string }>({
      query: ({ jalur }) => ({
        url: `sekolah/lulus_excel`,
        params: {
          jalur: jalur,
        },
      }),
      providesTags: ['lulus'],
    }),
  }),
})

export const { useGetHasilQuery } = HasilEndpoints
