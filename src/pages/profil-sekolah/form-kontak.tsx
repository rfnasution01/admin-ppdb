import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from '@/components/form/form-label-component'
import { ProfilType } from '@/libs/types/profil-type'
import { useEffect } from 'react'

export function FormKontak({
  form,
  profil,
  isLoading,
}: {
  form: UseFormReturn
  profil: ProfilType
  isLoading: boolean
}) {
  useEffect(() => {
    if (profil?.kontak) {
      form.setValue('telepon', profil?.kontak?.telepon)
      form.setValue('email', profil?.kontak?.email)
      form.setValue('website', profil?.kontak?.website)
      form.setValue('latitude', profil?.kontak?.latitude)
      form.setValue('longitude', profil?.kontak?.longitude)
    }
  }, [profil?.kontak])
  return (
    <div className="flex flex-col gap-12 px-24 phones:gap-32">
      <FormLabelComponent
        form={form}
        label="Telepon"
        placeHolder="Masukkan Telepon"
        name="telepon"
        type="text"
        isNumber
        isDisabled={isLoading}
      />

      <FormLabelComponent
        form={form}
        label="Email"
        placeHolder="Masukkan Email"
        name="email"
        type="email"
        isDisabled={isLoading}
      />
      <FormLabelComponent
        form={form}
        label="Website"
        placeHolder="Masukkan Website"
        name="website"
        type="text"
        isDisabled={isLoading}
      />
      <FormLabelComponent
        form={form}
        label="Latitude"
        placeHolder="Masukkan Latitude"
        name="latitude"
        type="text"
        isDisabled={isLoading}
      />
      <FormLabelComponent
        form={form}
        label="Longitude"
        placeHolder="Masukkan Longitude"
        name="longitude"
        type="text"
        isDisabled={isLoading}
      />
    </div>
  )
}
