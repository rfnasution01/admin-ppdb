import { Res, api } from '../api'
import { DashboardType } from '@/libs/types/dashboard-type'

export const DashboardEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<Res<DashboardType>, void>({
      query: () => ({
        url: `sekolah/dashboard`,
      }),
      providesTags: ['dashboard'],
    }),
    createGelombang: builder.mutation<void, { data: { id: string } }>({
      query: ({ data }) => ({
        url: `sekolah/gelombang`,
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
        'cari',
        'lulus',
        'daftar-ulang',
      ],
    }),
  }),
})

export const { useGetDashboardQuery, useCreateGelombangMutation } =
  DashboardEndpoints
