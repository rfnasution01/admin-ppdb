import { Column } from '@/components/Table'
import { VerifikasiType } from '../types/verifikasi-type'
import dayjs from 'dayjs'

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
