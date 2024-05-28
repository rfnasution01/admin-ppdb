import zod from 'zod'

export const OperatorSchema = zod.object({
  username: zod.string().optional().nullable(),
  nama: zod.string().optional().nullable(),
  email: zod.string().optional().nullable(),
  hp: zod.string().optional().nullable(),
  password: zod.string().optional().nullable(),
  id: zod.string().optional().nullable(),
})

export const TolakSchema = zod.object({
  komentar: zod.string({
    required_error: 'Komentar harus di isi',
    invalid_type_error: 'Format komentar tidak valid',
  }),
})

export const SetujuSchema = zod.object({
  komentar: zod.string().nullish().nullable().optional(),
})

export const TolakPrestasi = zod.object({
  catatan: zod.string({
    required_error: 'Komentar harus di isi',
    invalid_type_error: 'Format komentar tidak valid',
  }),
})

export const UploadSchema = zod.object({
  file: zod.string().optional(),
})

export const VerifikasiSchema = zod.object({
  verifikasi: zod.number().optional(),
})
