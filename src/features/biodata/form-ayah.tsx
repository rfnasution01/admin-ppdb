import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from './form-label-component'
import { FormLabelCheckBox } from './form-label-checkbox'
import { useEffect } from 'react'
import { FormListPendidikan } from '@/components/form/formListPendidikan'
import { FormListPekerjaan } from '@/components/form/formListPekerjaan'
import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'

export function FormAyah({
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
      form.setValue(
        'isHidupAyah',
        getProfil?.orangtua?.ayah?.status === 'Hidup' ? true : false,
      )
      form.setValue('nama_ayah', getProfil?.orangtua?.ayah?.nama)
      form.setValue('nik_ayah', getProfil?.orangtua?.ayah?.nik)
      form.setValue('telepon_ayah', getProfil?.orangtua?.ayah?.hp)
      form.setValue('pekerjaan_ayah', getProfil?.orangtua?.ayah?.id_pekerjaan)
      form.setValue('pendidikan_ayah', getProfil?.orangtua?.ayah?.id_pendidikan)
    }
  }, [getProfil])

  const isChecked = form.watch('isHidupAyah') ?? false

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-32">
        <FormLabelCheckBox
          form={form}
          label="Ayah masih hidup?*"
          placeHolder="Ya"
          name="isHidupAyah"
          isChecked={isChecked}
          isDisabled={isLoading}
        />

        <FormLabelComponent
          form={form}
          label="Nama*"
          placeHolder="Masukkan nama ayah"
          name="nama_ayah"
          type="text"
          isDisabled={isLoading}
        />
      </div>
      <div className="flex items-center gap-32">
        <FormLabelComponent
          form={form}
          label="NIK*"
          placeHolder="Masukkan NIK ayah"
          name="nik_ayah"
          type="text"
          isNumber
          isDisabled={isLoading}
        />
        {isChecked && (
          <>
            <FormLabelComponent
              form={form}
              label="Telepon*"
              placeHolder="Masukkan telepon ayah"
              name="telepon_ayah"
              type="text"
              isNumber
              isDisabled={isLoading}
            />
          </>
        )}
      </div>
      <div className="flex items-center gap-32">
        {isChecked && (
          <>
            <FormListPendidikan
              name="pendidikan_ayah"
              useFormReturn={form}
              headerLabel="Pendidikan Terakhir*"
              placeholder="Pilih Pendidikan Terakhir"
              isDisabled={isLoading}
            />

            <FormListPekerjaan
              name="pekerjaan_ayah"
              useFormReturn={form}
              headerLabel="Pekerjaan*"
              placeholder="Pilih Pekerjaan"
              isDisabled={isLoading}
            />
          </>
        )}
      </div>
    </div>
  )
}
