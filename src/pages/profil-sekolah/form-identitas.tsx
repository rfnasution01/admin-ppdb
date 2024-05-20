import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from '@/components/form/form-label-component'
import { ProfilType } from '@/libs/types/profil-type'
import { useEffect } from 'react'
import { FormListKecamatan } from '@/components/form/formListKecamatan'

export function FormIdentitas({
  form,
  profil,
  isLoading,
}: {
  form: UseFormReturn
  profil: ProfilType
  isLoading: boolean
}) {
  useEffect(() => {
    if (profil?.identitas) {
      form.setValue('nisn', profil?.identitas?.npsn)
      form.setValue('nama_sekolah', profil?.identitas?.nama_sekolah)
      form.setValue('jenjang', profil?.identitas?.jenjang)
      form.setValue('status', profil?.identitas?.status)
      form.setValue('akreditasi', profil?.identitas?.akreditasi)
      form.setValue('kecamatan', profil?.identitas?.id_kecamatan)
      form.setValue('alamat', profil?.identitas?.alamat)
    }
  }, [profil?.identitas])
  return (
    <div className="flex flex-col gap-12 px-24 phones:gap-32">
      <FormLabelComponent
        form={form}
        label="NPSN"
        placeHolder="Masukkan NPSN"
        name="nisn"
        type="text"
        isDisabled
      />

      <FormLabelComponent
        form={form}
        label="Nama Sekolah"
        placeHolder="Masukkan Nama Sekolah"
        name="nama_sekolah"
        type="text"
        isDisabled
      />
      <FormLabelComponent
        form={form}
        label="Jenjang"
        placeHolder="Masukkan Jenjang"
        name="jenjang"
        type="text"
        isDisabled
      />
      <FormLabelComponent
        form={form}
        label="Status"
        placeHolder="Masukkan Status"
        name="status"
        type="text"
        isDisabled
      />
      <FormLabelComponent
        form={form}
        label="Akreditas"
        placeHolder="Masukkan Akreditas"
        name="akreditasi"
        type="text"
        isDisabled={isLoading}
      />
      <FormListKecamatan
        useFormReturn={form}
        headerLabel="Kecamatan"
        placeholder="Masukkan Kecamatan"
        name="kecamatan"
        isDisabled={isLoading}
      />
      <FormLabelComponent
        form={form}
        label="Alamat"
        placeHolder="Masukkan Alamat"
        name="alamat"
        type="text"
        isDisabled={isLoading}
      />
    </div>
  )
}
