import { BiodataType } from '@/libs/types/biodata-type'
import { Res, api } from '../api'

export const BiodataEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getBiodata: builder.query<Res<BiodataType>, void>({
      query: () => ({
        url: `sekolah/biodata`,
      }),
    }),
  }),
})

export const { useGetBiodataQuery } = BiodataEndpoints
