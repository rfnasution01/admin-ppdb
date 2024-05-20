import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from '@/components/form/form-label-component'

export function FormKepalaSekolah({ form }: { form: UseFormReturn }) {
  return (
    <div className="flex flex-col gap-12 px-24 phones:gap-32">
      <FormLabelComponent
        form={form}
        label="Nama"
        placeHolder="Masukkan Nama"
        name="nama_kepala_sekolah"
        type="text"
      />

      <FormLabelComponent
        form={form}
        label="NIP"
        placeHolder="Masukkan NIP"
        name="nip"
        type="text"
      />
      <FormLabelComponent
        form={form}
        label="Telepon"
        placeHolder="Masukkan Telepon"
        name="telepon_kepala_sekolah"
        type="text"
        isNumber
      />
    </div>
  )
}
