export type KataBijakType = {
  id: string
  pengarang: string
  isi: string
}

export type GelombangType = {
  nama: string
  tgl_awal_daftar: string
  tgl_akhir_daftar: string
  pendaftar: number
  diverifikasi: number
  belum_diverifikasi: number
}

export type LulusType = {
  daya_tampung: number
  lulus: number
  daftar_ulang: number
}

export type DashboardType = {
  kata_bijak: KataBijakType
  gelombang: GelombangType[]
  lulus: LulusType
}
