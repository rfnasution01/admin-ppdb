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
