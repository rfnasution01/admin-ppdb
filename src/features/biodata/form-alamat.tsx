import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from './form-label-component'
import { useEffect } from 'react'
import { FormListProvinsi } from '@/components/form/formListProvinsi'
import { FormListKabupaten } from '@/components/form/formListKabupaten'
import { FormListKecamatan } from '@/components/form/formListKecamatan'
import { FormListDesa } from '@/components/form/formListDesa'
import { FormListDusun } from '@/components/form/formListDusun'
import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'

export function FormAlamat({
  form,
  getProfil,
  isLoading,
}: {
  form: UseFormReturn
  getProfil: VerifikasiDetailType
  isLoading: boolean
}) {
  const provinsi = form.watch('provinsi')
  const kabupaten = form.watch('kabupaten')
  const kecamatan = form.watch('kecamatan')
  const desa = form.watch('desa')

  useEffect(() => {
    if (getProfil?.biodata) {
      form.setValue('provinsi', getProfil?.biodata?.id_provinsi)
      form.setValue('kabupaten', getProfil?.biodata?.id_kabupaten)
      form.setValue('kecamatan', getProfil?.biodata?.id_kecamatan)
      form.setValue('desa', getProfil?.biodata?.id_desa)
      form.setValue('alamat', getProfil?.biodata?.alamat_lengkap)
      form.setValue('dusun', getProfil?.biodata?.id_dusun)
    }
  }, [getProfil])

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-32">
        <FormListProvinsi
          key={`provinsi-${provinsi}`}
          name="provinsi"
          useFormReturn={form}
          headerLabel="Provinsi"
          placeholder="Pilih Provinsi"
          isDisabled={isLoading}
        />

        <FormListKabupaten
          key={`kabupaten-${provinsi}-${kabupaten}`}
          name="kabupaten"
          useFormReturn={form}
          headerLabel="Kabupaten"
          placeholder="Pilih Kabupaten"
          isDisabled={!provinsi || isLoading}
        />
      </div>
      <div className="flex items-center gap-32">
        <FormListKecamatan
          key={`kecamatan-${provinsi}-${kabupaten}-${kecamatan}`}
          name="kecamatan"
          useFormReturn={form}
          headerLabel="Kecamatan"
          placeholder="Pilih Kecamatan"
          isDisabled={!provinsi || !kabupaten || isLoading}
        />

        <FormListDesa
          key={`desa-${provinsi}-${kabupaten}-${kecamatan}-${desa}`}
          name="desa"
          useFormReturn={form}
          headerLabel="Desa"
          placeholder="Pilih Desa"
          isDisabled={!provinsi || !kabupaten || !kecamatan || isLoading}
        />
      </div>
      <div className="flex items-center gap-32">
        <FormListDusun
          key={`dusun-${desa}-${provinsi}-${kabupaten}-${kecamatan}-${desa}`}
          name="dusun"
          useFormReturn={form}
          headerLabel="Dusun"
          placeholder="Pilih Dusun"
          isDisabled={!desa || isLoading}
        />

        <FormLabelComponent
          form={form}
          name="alamat"
          label="Alamat*"
          placeHolder="Masukkan alamat anda"
          type="text"
          isDisabled={isLoading}
        />
      </div>
    </div>
  )
}
