export type VerifikasiType = {
  id: string
  nama: string
  tempat_lahir: string
  tanggal_lahir: string
  umur: string
  nisn?: string
  asal_sekolah?: string
  pilihan1: string
  pilihan2?: string
  diajukan: string
  verifikasi: number
  jalur: string
  nik: string
  kode: string
}

export type BiodataType = {
  nomor_peserta: string
  nama: string
  tempat_lahir: string
  tanggal_lahir: string
  jenis_kelamin: string
  agama: string
  nik: string
  nomor_kk: string
  telepon: string
  id_provinsi: string
  provinsi: string
  id_kabupaten: string
  kabupaten: string
  id_kecamatan: string
  kecamatan: string
  id_desa: string
  desa: string
  id_dusun: string
  dusun: string | null
  alamat_lengkap: string
}

export type OrangTuaType = {
  status: string
  nama: string
  nik: string
  hp: string
  id_pekerjaan: string
  id_pendidikan: string
  pekerjaan: string
  pendidikan: string
}

export type WaliType = {
  nama: string
  nik: string
  hp: string
  id_pekerjaan: string
  id_pendidikan: string
  pekerjaan: string
  pendidikan: string
}

export type OrangTuaDetailsType = {
  ayah: OrangTuaType
  ibu: OrangTuaType
  wali: WaliType
}

export type DokumenType = {
  id: string
  nama: string
  keterangan: string
  status: string
  format: string
  pasfoto: number
  dok_siswa: string
  status_verifikasi: number
  verifikasi_on: string | null
  petugas: string | null
  komentar: string | null
}

export type PilihanSekolahType = {
  id_sekolah: string | null
  nama_sekolah: string | null
  skor: number
}

export type PilihanType = {
  pilihan1: PilihanSekolahType
  pilihan2: PilihanSekolahType
}

export type VerifikasiDetailType = {
  jalur: string
  biodata: BiodataType
  sekolah: SekolahParams
  orangtua: OrangTuaDetailsType
  dokumen: DokumenType[]
  pilihan: PilihanType
  prestasi: PrestasiType
}

export type VerifikasiDokumenParams = {
  id: string
  id_dokumen?: string
  status?: string
  komentar?: string
}

export type VerifikasiPrestasiParams = {
  id: string
  id_dokumen?: string
  validasi?: string
  catatan?: string
}

export type SekolahParams = {
  nisn?: string
  npsn: string
  nama_sekolah: string
  tahun_lulus: string
  status?: boolean
}

export type PrestasiType = {
  jalur_prestasi: boolean
  data: ListPrestasiType[]
}

export type ListPrestasiType = {
  id: string
  nama_prestasi: string
  tingkat: string
  juara: string
  kelas: string
  penyelenggara: string
  sertifikat: string
  validasi: number
  tgl_validasi?: string
  user_validasi?: string
  catatan?: string
}
