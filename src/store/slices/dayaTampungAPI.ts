import { DayaTampungType } from '@/libs/types/profil-type'
import { Res, api } from '../api'

export const DayaTampungEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDayaTampung: builder.query<Res<DayaTampungType[]>, void>({
      query: () => ({
        url: `sekolah/daya_tampung`,
      }),
    }),
  }),
})

export const { useGetDayaTampungQuery } = DayaTampungEndpoints
