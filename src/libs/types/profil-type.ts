export type IdentitasType = {
  npsn: string
  nama_sekolah: string
  jenjang: string
  status: string
  akreditasi: string
  id_kecamatan: string
  kecamatan: string | null
  alamat: string
}

export type KontakType = {
  telepon: string
  email: string
  website: string
  latitude: string
  longitude: string
}

export type KepalaSekolahType = {
  nama: string
  nip: string
  telepon: string
}

export type OperatorSekolahType = {
  nama: string
  hp: string
}

export type ProfilType = {
  identitas: IdentitasType
  kontak: KontakType
  kepala_sekolah: KepalaSekolahType
  operator_sekolah: OperatorSekolahType[]
}

export type DayaTampungType = {
  kode: string
  nama: string
  jumlah: string
  urutan: string
}

export type ProfilParams = {
  akreditasi: string
  id_kecamatan: string
  alamat: string
  telepon: string
  email: string
  website: string
  latitude: string
  longitude: string
  nama_kepala_sekolah: string
  nip_kepala_sekolah: string
  telepon_kepala_sekolah: string
}

export type KecamatanType = {
  id: string
  nama: string
}
