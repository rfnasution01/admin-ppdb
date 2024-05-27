import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from './form-label-component'
import { FormLabelCheckBox } from './form-label-checkbox'
import { useEffect } from 'react'
import { FormListPendidikan } from '@/components/form/formListPendidikan'
import { FormListPekerjaan } from '@/components/form/formListPekerjaan'
import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'

export function FormIbu({
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
        'isHidupIbu',
        getProfil?.orangtua?.ibu?.status === 'Hidup' ? true : false,
      )
      form.setValue('nama_ibu', getProfil?.orangtua?.ibu?.nama)
      form.setValue('nik_ibu', getProfil?.orangtua?.ibu?.nik)
      form.setValue('telepon_ibu', getProfil?.orangtua?.ibu?.hp)
      form.setValue('pekerjaan_ibu', getProfil?.orangtua?.ibu?.id_pekerjaan)
      form.setValue('pendidikan_ibu', getProfil?.orangtua?.ibu?.id_pendidikan)
    }
  }, [getProfil])

  const isChecked = form.watch('isHidupIbu')

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-32">
        <FormLabelCheckBox
          form={form}
          label="Ibu masih hidup?*"
          placeHolder="Ya"
          name="isHidupIbu"
          isChecked={isChecked}
          isDisabled={isLoading}
        />

        <FormLabelComponent
          form={form}
          label="Nama*"
          placeHolder="Masukkan nama ibu"
          name="nama_ibu"
          type="text"
          isDisabled={isLoading}
        />
      </div>
      <div className="flex items-center gap-32">
        <FormLabelComponent
          form={form}
          label="NIK*"
          placeHolder="Masukkan NIK ibu"
          name="nik_ibu"
          type="text"
          isNumber
          isDisabled={isLoading}
        />

        {isChecked && (
          <>
            <FormLabelComponent
              form={form}
              label="Telepon*"
              placeHolder="Masukkan telepon ibu"
              name="telepon_ibu"
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
              name="pendidikan_ibu"
              useFormReturn={form}
              headerLabel="Pendidikan Terakhir*"
              placeholder="Pilih Pendidikan Terakhir"
              isDisabled={isLoading}
            />

            <FormListPekerjaan
              name="pekerjaan_ibu"
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
