import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from '@/components/form/form-label-component'

export function FormKontak({ form }: { form: UseFormReturn }) {
  return (
    <div className="flex flex-col gap-12 px-24 phones:gap-32">
      <FormLabelComponent
        form={form}
        label="Telepon"
        placeHolder="Masukkan Telepon"
        name="telepon"
        type="text"
        isNumber
      />

      <FormLabelComponent
        form={form}
        label="Email"
        placeHolder="Masukkan Email"
        name="email"
        type="email"
      />
      <FormLabelComponent
        form={form}
        label="Website"
        placeHolder="Masukkan Website"
        name="website"
        type="text"
      />
      <FormLabelComponent
        form={form}
        label="Latitude"
        placeHolder="Masukkan Latitude"
        name="latitude"
        type="text"
      />
      <FormLabelComponent
        form={form}
        label="Longitude"
        placeHolder="Masukkan Longitude"
        name="longitude"
        type="text"
      />
    </div>
  )
}
