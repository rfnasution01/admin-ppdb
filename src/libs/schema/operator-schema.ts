import zod from 'zod'

export const OperatorSchema = zod.object({
  username: zod.string().optional().nullable(),
  nama: zod.string().optional().nullable(),
  email: zod.string().optional().nullable(),
  hp: zod.string().optional().nullable(),
  password: zod.string().optional().nullable(),
  id: zod.string().optional().nullable(),
})
