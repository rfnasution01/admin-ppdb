import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from './form-label-component'
import { useEffect } from 'react'
import { FormListPekerjaan } from '@/components/form/formListPekerjaan'
import { FormListPendidikan } from '@/components/form/formListPendidikan'
import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'

export function FormWali({
  form,
  isLoading,
  getProfil,
}: {
  form: UseFormReturn
  isLoading?: boolean
  getProfil: VerifikasiDetailType
}) {
  useEffect(() => {
    if (getProfil?.orangtua) {
      form.setValue('nama_wali', getProfil?.orangtua?.wali?.nama)
      form.setValue('nik_wali', getProfil?.orangtua?.wali?.nik)
      form.setValue('telepon_wali', getProfil?.orangtua?.wali?.hp)
      form.setValue('pekerjaan_wali', getProfil?.orangtua?.wali?.id_pekerjaan)
      form.setValue('pendidikan_wali', getProfil?.orangtua?.wali?.id_pendidikan)
    }
  }, [getProfil])
  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-32">
        <FormLabelComponent
          form={form}
          label="Nama"
          placeHolder="Masukkan nama wali"
          name="nama_wali"
          type="text"
          isDisabled={isLoading}
        />

        <FormLabelComponent
          form={form}
          label="NIK"
          placeHolder="Masukkan NIK wali"
          name="nik_wali"
          type="text"
          isNumber
          isDisabled={isLoading}
        />
      </div>
      <div className="flex items-center gap-32">
        <FormLabelComponent
          form={form}
          label="Telepon"
          placeHolder="Masukkan telepon wali"
          name="telepon_wali"
          type="text"
          isNumber
          isDisabled={isLoading}
        />

        <FormListPendidikan
          name="pendidikan_wali"
          useFormReturn={form}
          headerLabel="Pendidikan Terakhir"
          placeholder="Pilih Pendidikan Terakhir"
          isDisabled={isLoading}
        />
      </div>
      <div className="flex items-center gap-32">
        <FormListPekerjaan
          name="pekerjaan_wali"
          useFormReturn={form}
          headerLabel="Pekerjaan"
          placeholder="Pilih Pekerjaan"
          isDisabled={isLoading}
        />
        <div className="w-full"></div>
      </div>
    </div>
  )
}
