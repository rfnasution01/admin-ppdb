export type DaftarUlangParams = {
  jalur?: string
  status?: number
  search?: string
}

export type DaftarUlangType = {
  siswa: SiswaType[]
  jumlah_lulus: number
  sudah_registrasi: number
  belum_registrasi: number
}

export type SiswaType = {
  nompes: string
  nisn: string
  nama: string
  jalur: string
  tanggal_lahir: string
  registrasi: number
  user_registrasi: string
  tanggal_registrasi: string
}

export type PostDaftarUlangParams = {
  nompes: string[]
  tanggal: string
}
