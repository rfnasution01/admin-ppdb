import { VerifikasiType } from '@/libs/types/verifikasi-type'
import { Res, api } from '../api'

export const VerifikasiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getVerifikasi: builder.query<Res<VerifikasiType[]>, void>({
      query: () => ({
        url: `sekolah/verifikasi`,
      }),
      providesTags: ['verifikasi'],
    }),
  }),
})

export const { useGetVerifikasiQuery } = VerifikasiEndpoints
