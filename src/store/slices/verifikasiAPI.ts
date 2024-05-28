import {
  VerifikasiDetailType,
  VerifikasiDokumenParams,
  VerifikasiPrestasiParams,
  VerifikasiType,
} from '@/libs/types/verifikasi-type'
import { Res, api } from '../api'

export const VerifikasiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getVerifikasi: builder.query<Res<VerifikasiType[]>, void>({
      query: () => ({
        url: `sekolah/verifikasi`,
      }),
      providesTags: ['verifikasi'],
    }),
    getVerifikasiById: builder.query<Res<VerifikasiDetailType>, { id: string }>(
      {
        query: ({ id }) => ({
          url: `sekolah/verifikasi_detail`,
          params: {
            id: id,
          },
        }),
        providesTags: ['verifikasi-detail'],
      },
    ),
    createVerifikasiClaim: builder.mutation<void, { data: { id: string } }>({
      query: ({ data }) => ({
        url: `sekolah/verifikasi/claim`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['verifikasi', 'verifikasi-detail'],
    }),
    createVerifikasiDokumen: builder.mutation<
      void,
      { data: VerifikasiDokumenParams }
    >({
      query: ({ data }) => ({
        url: `sekolah/verifikasi/dokumen`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['verifikasi', 'verifikasi-detail'],
    }),
    createVerifikasiSetuju: builder.mutation<
      void,
      { data: VerifikasiDokumenParams }
    >({
      query: ({ data }) => ({
        url: `sekolah/verifikasi/setuju`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['verifikasi', 'verifikasi-detail', 'pendaftar'],
    }),
    createVerifikasiPrestasi: builder.mutation<
      void,
      { data: VerifikasiPrestasiParams }
    >({
      query: ({ data }) => ({
        url: `sekolah/verifikasi/prestasi`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['verifikasi', 'verifikasi-detail'],
    }),
  }),
})

export const {
  useGetVerifikasiQuery,
  useGetVerifikasiByIdQuery,
  useCreateVerifikasiClaimMutation,
  useCreateVerifikasiSetujuMutation,
  useCreateVerifikasiDokumenMutation,
  useCreateVerifikasiPrestasiMutation,
} = VerifikasiEndpoints
