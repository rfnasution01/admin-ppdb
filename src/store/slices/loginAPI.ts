import { LoginType, ResponseLoginType } from '@/libs/types/login-type'
import { Res, api } from '../api'

export const LoginEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    createLogin: builder.mutation<Res<ResponseLoginType>, { data: LoginType }>({
      query: ({ data }) => ({
        url: `sekolah/login`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        'profil',
        'biodata',
        'kecamatan',
        'operator',
        'daya-tampung',
        'dashboard',
        'verifikasi',
        'verifikasi-detail',
        'pendaftar',
      ],
    }),
  }),
})

export const { useCreateLoginMutation } = LoginEndpoints
