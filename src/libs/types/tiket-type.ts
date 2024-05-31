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
