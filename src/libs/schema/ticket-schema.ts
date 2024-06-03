import zod from 'zod'

export const tiketSchema = zod
  .object({
    judul: zod.string({
      required_error: 'Judul harus di isi',
      invalid_type_error: 'Format judul tidak valid',
    }),
    keterangan: zod.string({
      required_error: 'Keterangan harus di isi',
      invalid_type_error: 'Format keterangan tidak valid',
    }),
    idSiswa: zod.number().optional().nullable().nullish(),
    berkas: zod.array(zod.string()).optional().nullable().nullish(),
    idPendaftaran: zod?.string().optional().nullable().nullish(),
    idMasalah: zod.string({
      required_error: 'Jenis masalah harus di isi',
      invalid_type_error: 'Format jenis masalah tidak valid',
    }),
  })
  .refine(
    (values) => {
      // idPendaftaran menjadi required hanya ketika idSiswa adalah 0
      if (values?.idSiswa === 1) {
        if (!values?.idPendaftaran) {
          return false // return false jika idPendaftaran tidak diisi ketika idSiswa adalah 0
        }
      }
      return true
    },
    {
      message: 'idPendaftaran wajib diisi',
      path: ['idPendaftaran'],
    },
  )

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
