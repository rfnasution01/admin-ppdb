import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'
import { DataComponent } from './data-component'

export function FormBiodata({ detail }: { detail: VerifikasiDetailType }) {
  return (
    <div className="flex flex-col gap-12">
      <DataComponent
        label="Nomor Peserta"
        value={detail?.biodata?.nomor_peserta ?? '-'}
      />
      <DataComponent label="Nama" value={detail?.biodata?.nama ?? '-'} />
      <DataComponent
        label="Tempat Lahir"
        value={detail?.biodata?.tempat_lahir ?? '-'}
      />
      <DataComponent
        label="Tanggal Lahir"
        value={detail?.biodata?.tanggal_lahir ?? '-'}
      />
      <DataComponent
        label="Tanggal Lahir"
        value={
          detail?.biodata?.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'
        }
      />
      <DataComponent label="Agama" value={detail?.biodata?.agama ?? '-'} />
      <DataComponent label="NIK" value={detail?.biodata?.nik ?? '-'} />
      <DataComponent
        label="Nomor KK"
        value={detail?.biodata?.nomor_kk ?? '-'}
      />
      <DataComponent label="Telepon" value={detail?.biodata?.telepon ?? '-'} />
      <DataComponent
        label="Provinsi"
        value={detail?.biodata?.provinsi ?? '-'}
      />
      <DataComponent
        label="Kabupaten"
        value={detail?.biodata?.kabupaten ?? '-'}
      />
      <DataComponent
        label="Kecamatan"
        value={detail?.biodata?.kecamatan ?? '-'}
      />
      <DataComponent label="Desa" value={detail?.biodata?.desa ?? '-'} />
      <DataComponent label="Dusun" value={detail?.biodata?.dusun ?? '-'} />
      <DataComponent
        label="Alamat Lengkap"
        value={detail?.biodata?.alamat_lengkap ?? '-'}
      />
    </div>
  )
}
