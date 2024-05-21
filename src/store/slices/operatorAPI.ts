import { OperatorParams, OperatorType } from '@/libs/types/operator-type'
import { Res, api } from '../api'

export const OperatorEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getOperator: builder.query<Res<OperatorType[]>, void>({
      query: () => ({
        url: `sekolah/operator`,
      }),
      providesTags: ['operator'],
    }),
    createTambahOperator: builder.mutation<void, { data: OperatorParams }>({
      query: ({ data }) => ({
        url: `sekolah/operator/tambah`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['operator'],
    }),
    createEditOperator: builder.mutation<void, { data: OperatorParams }>({
      query: ({ data }) => ({
        url: `sekolah/operator/edit`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['operator'],
    }),
    createEditStatus: builder.mutation<void, { data: OperatorParams }>({
      query: ({ data }) => ({
        url: `sekolah/operator/status`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['operator'],
    }),
    createEditPassword: builder.mutation<void, { data: OperatorParams }>({
      query: ({ data }) => ({
        url: `sekolah/operator/password`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['operator'],
    }),
  }),
})

export const {
  useGetOperatorQuery,
  useCreateEditOperatorMutation,
  useCreateEditPasswordMutation,
  useCreateEditStatusMutation,
  useCreateTambahOperatorMutation,
} = OperatorEndpoints
