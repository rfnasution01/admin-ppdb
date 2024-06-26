import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from './form-label-component'
import { useEffect } from 'react'
import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'

export function FormAPendidkan({
  form,
  getProfil,
  isLoading,
}: {
  form: UseFormReturn
  getProfil: VerifikasiDetailType
  isLoading: boolean
}) {
  useEffect(() => {
    if (getProfil?.sekolah) {
      form.setValue('nisn', getProfil?.sekolah?.nisn)
      form.setValue('npsn', getProfil?.sekolah?.npsn)
      form.setValue('nama_sekolah', getProfil?.sekolah?.nama_sekolah)
      form.setValue('tahun_lulus', getProfil?.sekolah?.tahun_lulus)
    }
  }, [getProfil])

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-32">
        <FormLabelComponent
          form={form}
          name="nisn"
          label="NISN"
          placeHolder="Masukkan NISN anda"
          type="text"
          isNumber
          isDisabled={isLoading}
        />

        <FormLabelComponent
          form={form}
          name="npsn"
          label="NPSN*"
          placeHolder="Masukkan NPSN anda"
          type="text"
          isNumber
          isDisabled={isLoading}
        />
      </div>
      <div className="flex items-center gap-32">
        <FormLabelComponent
          form={form}
          name="nama_sekolah"
          label="Nama Sekolah*"
          placeHolder="Masukkan nama sekolah anda"
          type="text"
          isDisabled={isLoading}
        />

        <FormLabelComponent
          form={form}
          name="tahun_lulus"
          label="Tahun Lulus*"
          placeHolder="Masukkan Tahun Lulus anda"
          type="text"
          isNumber
          isDisabled={isLoading}
        />
      </div>
    </div>
  )
}
