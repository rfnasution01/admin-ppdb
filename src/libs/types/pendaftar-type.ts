export type JenjangParams = {
  jenjang?: 'sd' | 'smp' | string
}

export type PageInfoType = {
  current_page: number
  page_size: number
  last_page: number
}

export type PendaftarJalur = {
  kode: string
  nama: string
  jumlah: string
}

export type PendaftarParams = {
  page: number
  page_size: number
  jalur: string
  search: string
  verifikasi?: number
}

export type CariSiswaType = {
  nama: string
  jalur: string
  nisn: string
  nik: string
  tanggal_lahir: string
}

export type NISNParams = {
  page: number
  page_size: number
  search: string
}

export type PendaftarType = {
  nompes: string
  nama: string
  tempat_lahir: string
  tanggal_lahir: string // Format: YYYY-MM-DD
  jalur: string
  nisn: string
  nik: string
  jenjang: string
  daftar: string // Format: ISO 8601 datetime
  pilihan1: string
  pilihan2: string
  verifikasi_on: string // Format: ISO 8601 datetime
  verifikasi_user: string
  verifikasi_sekolah: string
  jenis_kelamin: string
  nama_sekolah: string
  alamat_lengkap: string
  verifikasi: string
  skor1: string
  skor2: string
  pasfoto: string
}
