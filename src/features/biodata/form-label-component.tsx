import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import { Input } from '@/components/input'
import { UseFormReturn } from 'react-hook-form'

export function FormLabelComponent({
  name,
  form,
  label,
  placeHolder,
  type,
  isNumber,
  isDisabled,
}: {
  name: string
  form: UseFormReturn
  label: string
  placeHolder: string
  type: 'text' | 'date' | 'file' | 'checkbox'
  isNumber?: boolean
  isDisabled?: boolean
}) {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex w-full items-center gap-32 text-[2rem] phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]">
          <div className="w-2/6 phones:w-full phones:text-left">
            <FormLabel>{label}</FormLabel>
          </div>
          <div className="w-full phones:w-full">
            <FormControl>
              <Input
                {...field}
                className={`${type === 'date' ? 'w-1/2' : 'w-full'} phones:w-full`}
                placeholder={placeHolder}
                type={type}
                disabled={isDisabled}
                onInput={(e) => {
                  if (isNumber && type === 'text') {
                    const inputValue = (e.target as HTMLInputElement).value
                    ;(e.target as HTMLInputElement).value = inputValue.replace(
                      /[^\d]/g,
                      '',
                    )
                    field.onChange((e.target as HTMLInputElement).value)
                  }
                }}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
