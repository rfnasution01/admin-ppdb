import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from '@/components/form/form-label-component'

export function FormIdentitas({ form }: { form: UseFormReturn }) {
  return (
    <div className="flex flex-col gap-12 px-24 phones:gap-32">
      <FormLabelComponent
        form={form}
        label="NISN"
        placeHolder="Masukkan NISN"
        name="nisn"
        type="text"
      />

      <FormLabelComponent
        form={form}
        label="Nama Sekolah"
        placeHolder="Masukkan Nama Sekolah"
        name="nama_sekolah"
        type="text"
      />
      <FormLabelComponent
        form={form}
        label="Jenjang"
        placeHolder="Masukkan Jenjang"
        name="jenjang"
        type="text"
      />
      <FormLabelComponent
        form={form}
        label="Status"
        placeHolder="Masukkan Status"
        name="status"
        type="text"
      />
      <FormLabelComponent
        form={form}
        label="Akreditas"
        placeHolder="Masukkan Akreditas"
        name="akreditasi"
        type="text"
      />
      <FormLabelComponent
        form={form}
        label="Kecamatan"
        placeHolder="Masukkan Kecamatan"
        name="kecamatan"
        type="text"
      />
      <FormLabelComponent
        form={form}
        label="Alamat"
        placeHolder="Masukkan Alamat"
        name="alamat"
        type="text"
      />
    </div>
  )
}
