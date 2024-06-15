import { Res, api } from '../api'
import {
  DaftarUlangParams,
  DaftarUlangType,
  PostDaftarUlangParams,
} from '@/libs/types/daftar-ulang-type'

export const DaftarulangEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDaftarulang: builder.query<Res<DaftarUlangType>, DaftarUlangParams>({
      query: ({ search, jalur, status }) => ({
        url: `sekolah/registrasi`,
        method: 'GET',
        params: {
          search: search,
          jalur: jalur,
          status: status,
        },
      }),
      providesTags: ['daftar-ulang'],
    }),
    createDaftarUlang: builder.mutation<void, { data: PostDaftarUlangParams }>({
      query: ({ data }) => ({
        url: `sekolah/registrasi`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['daftar-ulang'],
    }),
  }),
})

export const { useGetDaftarulangQuery, useCreateDaftarUlangMutation } =
  DaftarulangEndpoints
