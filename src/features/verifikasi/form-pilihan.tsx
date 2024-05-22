import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'
import { DataComponent } from './data-component'

export function FormPilihan({ detail }: { detail: VerifikasiDetailType }) {
  console.log(detail)

  return (
    <div className="flex flex-col gap-12">
      {/* --- Pilihan1 --- */}
      <div className="flex flex-col gap-16">
        <p className="font-semibold">Pilihan 1</p>
        <div className="flex flex-col gap-12">
          <DataComponent
            label="Nama Sekolah"
            value={detail?.pilihan?.pilihan1?.nama_sekolah ?? '-'}
          />
          <DataComponent
            label="Skor"
            value={detail?.pilihan?.pilihan2?.skor.toString() ?? '-'}
          />
        </div>
      </div>
      {/* --- Pilihan2 --- */}
      <div className="flex flex-col gap-16">
        <p className="font-semibold">Pilihan 2</p>
        <div className="flex flex-col gap-12">
          <DataComponent
            label="Nama Sekolah"
            value={detail?.pilihan?.pilihan2?.nama_sekolah ?? '-'}
          />
          <DataComponent
            label="Skor"
            value={detail?.pilihan?.pilihan2?.skor.toString() ?? '-'}
          />
        </div>
      </div>
    </div>
  )
}
