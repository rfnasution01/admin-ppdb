import { Column } from '@/components/Table'
import { VerifikasiType } from '../types/verifikasi-type'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { CariSiswaType } from '../types/pendaftar-type'
import { HasilDetailType } from '../types/hasil-type'
import { SiswaType } from '../types/daftar-ulang-type'
import clsx from 'clsx'

export const columnsVerifikasi: Column<VerifikasiType>[] = [
  { header: 'Nama', key: 'nama', width: '!min-w-[12rem]' },
  { header: 'Jalur', key: 'jalur', width: '!min-w-[12rem]' },
  {
    header: 'Informasi Siswa',
    key: 'alamat',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex flex-col gap-8">
          <p>NIK: {rowData?.nik}</p>
          <p>
            TTL: {rowData?.tempat_lahir},{' '}
            {dayjs(rowData?.tanggal_lahir).locale('id').format('DD MMMM YYYY')}
          </p>
          <p>Asal Sekolah: {rowData?.asal_sekolah}</p>
        </div>
      )
    },
  },
  {
    header: 'Pilihan',
    key: 'telepon',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex flex-col gap-8">
          <p>Pilihan 1: {rowData?.pilihan1}</p>
          <p>Pilihan 2: {rowData?.pilihan2}</p>
        </div>
      )
    },
  },
  {
    header: 'Diajukan',
    key: 'diajukan',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex flex-col gap-8">
          <p>
            {dayjs(rowData?.diajukan)
              .locale('id')
              .format('DD MMMM YYYY HH:mm:ss')}
          </p>
        </div>
      )
    },
  },
]

export const columnsCari: Column<CariSiswaType>[] = [
  { header: 'Nama ', key: 'nama', width: '!min-w-[12rem]' },
  { header: 'Jalur', key: 'jalur', width: '!min-w-[12rem]' },
  { header: 'NISN', key: 'nisn', width: '!min-w-[12rem]' },
  { header: 'NIK', key: 'nik', width: '!min-w-[12rem]' },

  {
    header: 'Tanggal Lahir',
    key: 'tanggal_lahir',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex flex-col gap-8">
          <p>
            {dayjs(rowData?.tanggal_lahir).locale('id').format('DD MMMM YYYY')}
          </p>
        </div>
      )
    },
  },
]

export const columnsLulus: Column<HasilDetailType>[] = [
  { header: 'Nompes', key: 'nompes', width: '!min-w-[12rem]' },
  { header: 'NISN', key: 'nisn', width: '!min-w-[12rem]' },
  { header: 'Nama', key: 'nama', width: '!min-w-[12rem]' },

  {
    header: 'Tanggal Lahir',
    key: 'tanggal_lahir',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex flex-col gap-8">
          <p>
            {dayjs(rowData?.tanggal_lahir).locale('id').format('DD MMMM YYYY')}
          </p>
        </div>
      )
    },
  },
  {
    header: 'Umur',
    key: 'tanggal_lahir',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      const today = dayjs('2024-07-01')

      // Contoh struktur data yang akan diexport ke XLSX
      const birthday = dayjs(rowData?.tanggal_lahir, 'YYYY-MM-DD') // Parse tanggal lahir dengan format tertentu
      // Menghitung tahun, bulan, dan hari
      const diff = today.diff(birthday, 'day')
      const years = Math.floor(diff / 365) // Menghitung tahun
      const months = Math.floor((diff % 365) / 30.436875) // Menghitung bulan
      const days = Math.floor(diff % 30.436875) // Menghitung sisa hari

      return (
        <div className="flex flex-col gap-8">
          <p>{`${years} Thn ${months} Bln ${days} Hr`}</p>
        </div>
      )
    },
  },
  { header: 'Skor', key: 'skor', width: '!min-w-[12rem]' },
  {
    header: 'Daftar',
    key: 'daftar',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex flex-col gap-8">
          <p>
            {dayjs(rowData?.tanggal_daftar).locale('id').format('DD MMMM YYYY')}
          </p>
        </div>
      )
    },
  },
  { header: 'Pilihan', key: 'pilihan', width: '!min-w-[12rem]' },
  {
    header: 'Status',
    key: 'status',
    width: '!min-w-[12rem]',
  },
]

export const columnsDaftarUlang: Column<SiswaType>[] = [
  { header: 'Nompes', key: 'nompes', width: '!min-w-[12rem]' },
  { header: 'Nama', key: 'nama', width: '!min-w-[12rem]' },

  {
    header: 'Tanggal Lahir',
    key: 'tanggal_lahir',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex flex-col gap-8">
          <p>
            {dayjs(rowData?.tanggal_lahir).locale('id').format('DD MMMM YYYY')}
          </p>
        </div>
      )
    },
  },

  { header: 'Jalur', key: 'jalur', width: '!min-w-[12rem]' },
  {
    header: 'Daftar Ulang',
    key: 'registrasi',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex flex-col gap-8">
          <p
            className={clsx('rounded-full px-12 py-4 text-center', {
              'bg-green-700 text-green-100': rowData?.registrasi === 1,
              'bg-red-700 text-red-100': rowData?.registrasi !== 1,
            })}
          >
            {rowData?.registrasi === 1 ? 'Sudah' : 'Belum'}
          </p>
        </div>
      )
    },
  },
  {
    header: 'Tanggal',
    key: 'tanggal_registrasi',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex flex-col gap-8">
          <p>
            {rowData?.tanggal_registrasi
              ? dayjs(rowData?.tanggal_registrasi)
                  .locale('id')
                  .format('DD MMMM YYYY')
              : '-'}
          </p>
        </div>
      )
    },
  },
]

export const columnsPendaftar: Column<CariSiswaType>[] = [
  {
    header: 'NISN/NIK',
    key: 'nik',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex flex-col gap-8">
          {rowData?.nisn ? (
            <p>
              {rowData?.nisn}/{rowData?.nik}
            </p>
          ) : (
            <p>{rowData?.nik}</p>
          )}
        </div>
      )
    },
  },
  { header: 'Nama', key: 'nama', width: '!min-w-[12rem]' },
  {
    header: 'Tanggal Lahir',
    key: 'tanggal_lahir',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex flex-col gap-8">
          <p>
            {dayjs(rowData?.tanggal_lahir).locale('id').format('DD-MM-YYYY')}
          </p>
        </div>
      )
    },
  },
  {
    header: 'Validasi Pendaftar',
    key: 'validasi_pendaftar',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex flex-col gap-8">
          <p>
            {rowData?.validasi_pendaftar
              ? dayjs(rowData?.validasi_pendaftar)
                  .locale('id')
                  .format('DD-MM-YYYY HH:mm:ss')
              : '-'}
          </p>
        </div>
      )
    },
  },
  {
    header: 'Validasi Sekolah',
    key: 'verifikasi',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex flex-col gap-8">
          <p>{rowData?.verifikasi === 0 ? 'Belum' : 'Sudah'}</p>
        </div>
      )
    },
  },
]
