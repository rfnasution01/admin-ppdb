import { api } from '../api'

export const PrestasiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    createAddPrestasi: builder.mutation<void, { data: FormData }>({
      query: ({ data }) => ({
        url: `sekolah/prestasi/tambah`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profil', 'prestasi', 'verifikasi-detail'],
    }),
    createEditPrestasi: builder.mutation<void, { data: FormData }>({
      query: ({ data }) => ({
        url: `sekolah/prestasi/edit`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profil', 'prestasi', 'verifikasi-detail'],
    }),
    deletePrestasi: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `sekolah/prestasi/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['profil', 'prestasi', 'verifikasi-detail'],
    }),
  }),
})

export const {
  useCreateAddPrestasiMutation,
  useCreateEditPrestasiMutation,
  useDeletePrestasiMutation,
} = PrestasiEndpoints
