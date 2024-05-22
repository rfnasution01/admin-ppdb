import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'
import { DataComponent } from './data-component'
import { enumJalur } from '@/libs/enum/enum-jalur'

export function FormJalur({ detail }: { detail: VerifikasiDetailType }) {
  const jalur =
    detail?.jalur.toUpperCase() === enumJalur.ZONASI
      ? 'Zonasi'
      : detail?.jalur.toUpperCase() === enumJalur.AFIRMASI
        ? detail?.jalur.toUpperCase() === enumJalur.PRESTASI
          ? 'Prestasi'
          : detail?.jalur.toUpperCase() === enumJalur.PINDAHTUGAS
            ? 'Pindah Tugas Orang Tua'
            : detail?.jalur.toUpperCase() === enumJalur.DISABILITAS
              ? 'Affirmasi Penyandang Disabilitas'
              : 'Affirmasi'
        : 'Zonasi'

  return (
    <div className="flex flex-col gap-12">
      <DataComponent label="Jalur" value={jalur} />
    </div>
  )
}
