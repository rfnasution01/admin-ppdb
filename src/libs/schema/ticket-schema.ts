import zod from 'zod'

export const tiketSchema = zod.object({
  judul: zod.string({
    required_error: 'Judul harus di isi',
    invalid_type_error: 'Format judul tidak valid',
  }),
  keterangan: zod.string({
    required_error: 'Keterangan harus di isi',
    invalid_type_error: 'Format keterangan tidak valid',
  }),
  berkas: zod.array(zod.string()).optional().nullable().nullish(),
  idPendaftaran: zod?.string().optional().nullable().nullish(),
  idMasalah: zod.string({
    required_error: 'Jenis masalah harus di isi',
    invalid_type_error: 'Format jenis masalah tidak valid',
  }),
})

export const chatSchema = zod.object({
  isi: zod.string({
    required_error: 'Pesan harus di isi',
    invalid_type_error: 'Format pesan tidak valid',
  }),
  berkas: zod.array(zod.string()).optional().nullable().nullish(),
})

export const closeSchema = zod.object({
  id: zod.array(zod.string()).optional().nullable().nullish(),
})

export const masalahSchema = zod.object({
  idMasalah: zod.string().optional().nullable().nullish(),
})
