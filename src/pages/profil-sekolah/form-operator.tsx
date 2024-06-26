import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from '@/components/form/form-label-component'
import { ProfilType } from '@/libs/types/profil-type'
import { useEffect } from 'react'

export function FormOperator({
  form,
  profil,
  isLoading,
}: {
  form: UseFormReturn
  profil: ProfilType
  isLoading: boolean
}) {
  useEffect(() => {
    if (profil?.operator_sekolah) {
      form.setValue('nama_operator', profil?.operator_sekolah?.nama)
      form.setValue('telepon_operator', profil?.operator_sekolah?.telepon)
    }
  }, [profil?.operator_sekolah])

  return (
    <div className="flex flex-col gap-12 px-24 phones:gap-32">
      <FormLabelComponent
        form={form}
        label="Nama"
        placeHolder="Masukkan Nama"
        name="nama_operator"
        type="text"
        isDisabled={isLoading}
      />

      <FormLabelComponent
        form={form}
        label="Telepon"
        placeHolder="Masukkan Telepon"
        name="telepon_operator"
        type="text"
        isNumber
        isDisabled={isLoading}
      />
    </div>
  )
}
