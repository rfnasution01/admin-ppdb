import {
  KecamatanType,
  ProfilParams,
  ProfilType,
} from '@/libs/types/profil-type'
import { Res, api } from '../api'

export const ProfilEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfil: builder.query<Res<ProfilType>, void>({
      query: () => ({
        url: `sekolah/profil`,
      }),
      providesTags: ['profil'],
    }),
    getKecamatan: builder.query<Res<KecamatanType[]>, void>({
      query: () => ({
        url: `sekolah/kecamatan`,
      }),
      providesTags: ['kecamatan'],
    }),
    createProfile: builder.mutation<void, { data: ProfilParams }>({
      query: ({ data }) => ({
        url: `sekolah/profil`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['kecamatan', 'profil'],
    }),
  }),
})

export const {
  useGetProfilQuery,
  useGetKecamatanQuery,
  useCreateProfileMutation,
} = ProfilEndpoints
