import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from '@/components/form/form-label-component'
import { ProfilType } from '@/libs/types/profil-type'
import { useEffect } from 'react'

export function FormKepalaSekolah({
  form,
  profil,
  isLoading,
}: {
  form: UseFormReturn
  profil: ProfilType
  isLoading: boolean
}) {
  useEffect(() => {
    if (profil?.kepala_sekolah) {
      form.setValue('nama_kepala_sekolah', profil?.kepala_sekolah?.nama)
      form.setValue('nip', profil?.kepala_sekolah?.nip)
      form.setValue('telepon_kepala_sekolah', profil?.kepala_sekolah?.telepon)
    }
  }, [profil?.kepala_sekolah])
  return (
    <div className="flex flex-col gap-12 px-24 phones:gap-32">
      <FormLabelComponent
        form={form}
        label="Nama"
        placeHolder="Masukkan Nama"
        name="nama_kepala_sekolah"
        type="text"
        isDisabled={isLoading}
      />

      <FormLabelComponent
        form={form}
        label="NIP"
        placeHolder="Masukkan NIP"
        name="nip"
        type="text"
        isDisabled={isLoading}
      />
      <FormLabelComponent
        form={form}
        label="Telepon"
        placeHolder="Masukkan Telepon"
        name="telepon_kepala_sekolah"
        type="text"
        isNumber
        isDisabled={isLoading}
      />
    </div>
  )
}
