import { ChangePasswordType } from '@/libs/types/login-type'
import { api } from '../api'

export const GantiPasswordEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    createGantiPassword: builder.mutation<void, { data: ChangePasswordType }>({
      query: ({ data }) => ({
        url: `sekolah/change_password`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useCreateGantiPasswordMutation } = GantiPasswordEndpoints
