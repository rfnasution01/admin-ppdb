import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'
import { DataComponent } from './data-component'

export function FormSekolah({ detail }: { detail: VerifikasiDetailType }) {
  return (
    <div className="flex flex-col gap-12">
      <DataComponent label="NISN" value={detail?.sekolah?.nisn ?? '-'} />
      <DataComponent label="NPSN" value={detail?.sekolah?.npsn ?? '-'} />
      <DataComponent
        label="Nama Sekolah"
        value={detail?.sekolah?.nama_sekolah ?? '-'}
      />
      <DataComponent
        label="Tahun Lulus"
        value={detail?.sekolah?.tahun_lulus ?? '-'}
      />
    </div>
  )
}
