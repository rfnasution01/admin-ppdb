import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'
import { DataComponent } from './data-component'

export function FormOrangTua({ detail }: { detail: VerifikasiDetailType }) {
  return (
    <div className="flex flex-col gap-24">
      {/* --- Ayah --- */}
      <div className="flex flex-col gap-16">
        <p className="font-semibold phones:text-[2.8rem]">Ayah</p>
        <div className="flex flex-col gap-12">
          <DataComponent
            label="Status"
            value={detail?.orangtua?.ayah?.status ?? '-'}
          />
          <DataComponent
            label="Nama"
            value={detail?.orangtua?.ayah?.nama ?? '-'}
          />
          <DataComponent
            label="NIK"
            value={detail?.orangtua?.ayah?.nik ?? '-'}
          />
          <DataComponent
            label="No. HP"
            value={detail?.orangtua?.ayah?.hp ?? '-'}
          />
          <DataComponent
            label="Pekerjaan"
            value={detail?.orangtua?.ayah?.pekerjaan ?? '-'}
          />
          <DataComponent
            label="Pendidikan"
            value={detail?.orangtua?.ayah?.pendidikan ?? '-'}
          />
        </div>
      </div>
      {/* --- Ibu --- */}
      <div className="flex flex-col gap-16">
        <p className="font-semibold phones:text-[2.8rem]">Ibu</p>
        <div className="flex flex-col gap-12">
          <DataComponent
            label="Status"
            value={detail?.orangtua?.ibu?.status ?? '-'}
          />
          <DataComponent
            label="Nama"
            value={detail?.orangtua?.ibu?.nama ?? '-'}
          />
          <DataComponent
            label="NIK"
            value={detail?.orangtua?.ibu?.nik ?? '-'}
          />
          <DataComponent
            label="No. HP"
            value={detail?.orangtua?.ibu?.hp ?? '-'}
          />
          <DataComponent
            label="Pekerjaan"
            value={detail?.orangtua?.ibu?.pekerjaan ?? '-'}
          />
          <DataComponent
            label="Pendidikan"
            value={detail?.orangtua?.ibu?.pendidikan ?? '-'}
          />
        </div>
      </div>

      {/* --- Wali --- */}
      <div className="flex flex-col gap-16">
        <p className="font-semibold phones:text-[2.8rem]">Wali</p>
        <div className="flex flex-col gap-12">
          <DataComponent
            label="Nama"
            value={detail?.orangtua?.wali?.nama ?? '-'}
          />
          <DataComponent
            label="NIK"
            value={detail?.orangtua?.wali?.nik ?? '-'}
          />
          <DataComponent
            label="No. HP"
            value={detail?.orangtua?.wali?.hp ?? '-'}
          />
          <DataComponent
            label="Pekerjaan"
            value={detail?.orangtua?.wali?.pekerjaan ?? '-'}
          />
          <DataComponent
            label="Pendidikan"
            value={detail?.orangtua?.wali?.pendidikan ?? '-'}
          />
        </div>
      </div>
    </div>
  )
}
