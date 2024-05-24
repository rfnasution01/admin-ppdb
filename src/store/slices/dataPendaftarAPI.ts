import { PendaftarParams, PendaftarType } from '@/libs/types/pendaftar-type'
import { Res, api } from '../api'

export const DataPendaftarEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDataPendaftar: builder.query<Res<PendaftarType[]>, PendaftarParams>({
      query: ({ search, jalur, page, page_size }) => ({
        url: `sekolah/pendaftar`,
        params: {
          page: page,
          page_size: page_size,
          jalur: jalur,
          search: search,
        },
      }),
      providesTags: ['pendaftar'],
    }),
  }),
})

export const { useGetDataPendaftarQuery } = DataPendaftarEndpoints
