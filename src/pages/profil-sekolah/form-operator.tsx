import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from '@/components/form/form-label-component'

export function FormOperator({ form }: { form: UseFormReturn }) {
  return (
    <div className="flex flex-col gap-12 px-24 phones:gap-32">
      <FormLabelComponent
        form={form}
        label="Nama"
        placeHolder="Masukkan Nama"
        name="nama_operator"
        type="text"
      />

      <FormLabelComponent
        form={form}
        label="Telepon"
        placeHolder="Masukkan Telepon"
        name="telepon_operator"
        type="text"
        isNumber
      />
    </div>
  )
}
