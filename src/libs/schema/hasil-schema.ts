import zod from 'zod'

export const hasilFilterSchema = zod.object({
  jalur: zod.string().optional().nullable().nullish(),
  gelombang: zod.string().optional().nullable().nullish(),
  lulus: zod.string().optional().nullable().nullish(),
})

export const daftarUlangSchema = zod.object({
  jalur: zod.string().optional().nullable().nullish(),
  status: zod.number().optional().nullable().nullish(),
})

export const saveDaftarUlangSchema = zod.object({
  nompes: zod
    .array(zod.number().optional().nullable().nullish())
    .optional()
    .nullable()
    .nullish(),
  tanggal: zod.string().optional().nullable().nullish(),
  jam: zod.string().optional().nullable().nullish(),
})
