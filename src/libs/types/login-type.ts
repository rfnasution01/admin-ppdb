export type LoginType = {
  username: string
  password: string
}

export type ResponseLoginType = {
  token: string
  level: string
  change_password: boolean
  gelombang: string
}

export type ChangePasswordType = {
  old_password: string
  new_password: string
}

export type ActivateAccountType = {
  token: string
  nisn: string
}

export type CheckNISNType = {
  nisn: string
  nama: string
  jk: string
  agama: string
  tanggal_lahir: string
  email: string
  wa: string
}
