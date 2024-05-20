import zod from 'zod'

export const profilSekolahSchema = zod.object({
  nisn: zod.string({
    required_error: 'NISN harus di isi',
    invalid_type_error: 'Format NISN tidak valid',
  }),
  nama_sekolah: zod.string({
    required_error: 'Nama Sekolah harus di isi',
    invalid_type_error: 'Format nama sekolah tidak valid',
  }),
  status: zod.string({
    required_error: 'Status harus di isi',
    invalid_type_error: 'Format status tidak valid',
  }),
  jenjang: zod.string({
    required_error: 'Jenjang harus di isi',
    invalid_type_error: 'Format jenjang tidak valid',
  }),
  akreditasi: zod.string({
    required_error: 'Akreditasi harus di isi',
    invalid_type_error: 'Format Akreditasi tidak valid',
  }),
  kecamatan: zod.string({
    required_error: 'Kecamatan harus di isi',
    invalid_type_error: 'Format Kecamatan tidak valid',
  }),
  alamat: zod.string({
    required_error: 'Alamat harus di isi',
    invalid_type_error: 'Format alamat tidak valid',
  }),
  telepon: zod.string({
    required_error: 'telepon harus di isi',
    invalid_type_error: 'Format Telepon tidak valid',
  }),
  email: zod.string({
    required_error: 'Email harus di isi',
    invalid_type_error: 'Format email tidak valid',
  }),
  website: zod.string({
    required_error: 'Website harus di isi',
    invalid_type_error: 'Format Website tidak valid',
  }),
  latitude: zod.string({
    required_error: 'Latitude harus di isi',
    invalid_type_error: 'Format latitude tidak valid',
  }),
  longitude: zod.string({
    required_error: 'Longitude harus di isi',
    invalid_type_error: 'Format longitude tidak valid',
  }),
  nama_kepala_sekolah: zod.string({
    required_error: 'Nama harus di isi',
    invalid_type_error: 'Format nama tidak valid',
  }),
  nip: zod.string({
    required_error: 'NIP harus di isi',
    invalid_type_error: 'Format NIP tidak valid',
  }),
  telepon_kepala_sekolah: zod.string({
    required_error: 'Telepon harus di isi',
    invalid_type_error: 'Format telepon tidak valid',
  }),
  nama_operator: zod.string({
    required_error: 'Nama harus di isi',
    invalid_type_error: 'Format nama tidak valid',
  }),
  telepon_operator: zod.string({
    required_error: 'Telepon harus di isi',
    invalid_type_error: 'Format telepon tidak valid',
  }),
})
