export type TiketParams = {
  page: number
  page_size: number
  status: number
  search?: string
}

export type TiketType = {
  id: string
  nama: string
  photo: string
  judul: string
  keterangan: string
  lampiran: LampiranType[]
  tanggal: string
  status: number
  status_user: string
  status_at: string
  belum_baca: number
}

export type TiketSekolahType = {
  id: string
  pengirim: string
  judul: string
  id_masalah: string
  masalah: string
  id_pendaftaran: string
  siswa: string
  keterangan: string
  lampiran: LampiranType[]
  tanggal: string
  status: number
  status_user: string
  status_at: string
}

export type TikeetNotificationType = {
  status: string
  message: string
  data: NotifikasiType[]
  jlh: number
  id: string
}

export type NotifikasiType = {
  id: string
  nama: string
  photo: string
  jalur: string
  judul: string
  status: number
}
export type TiketDetailType = {
  ticket: TiketType
  chat: TiketChatType[]
}

export type TiketSekolahDetailType = {
  ticket: TIketDetail
  chat: TiketChatType[]
}

export type TIketDetail = {
  id: string
  pengirim: string
  photo: string
  id_masalah: string
  masalah: string
  id_pendaftaran: string
  siswa: string
  judul: string
  keterangan: string
  lampiran: LampiranType[]
  tanggal: string
  status: number
  status_user: string
  status_at: number
}

export type TiketChatType = {
  id: string
  jenis_chat: string
  isi: string
  baca: string
  lampiran: LampiranType[]
  user: string
  tanggal: string
  photo: string
}
export type LampiranType = {
  id: string
  dokumen: string
}

export type SiswaType = {
  id_pendaftaran: string
  nama: string
  jalur: string
  nisn: string
  nik: string
  tanggal_lahir: string
}

export type TiketSekolahParams = {
  page?: number
  page_size?: number
  id_masalah?: string
  search?: string
  status?: number
}

export type TiketSekolahCreateParams = {
  id?: string
  id_masalah: string
  id_pendaftaran: string | null
  judul: string
  keterangan: string
  berkas: string[]
}

export type ReferensiMasalahType = {
  id: string
  nama: string
  siswa: string
}
