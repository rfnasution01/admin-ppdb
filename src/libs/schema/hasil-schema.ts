import zod from 'zod'

export const hasilFilterSchema = zod.object({
  jalur: zod.string().optional().nullable().nullish(),
  gelombang: zod.string().optional().nullable().nullish(),
  lulus: zod.string().optional().nullable().nullish(),
})
