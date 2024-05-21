/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/Form'
import { Save } from 'lucide-react'
import Loading from '@/components/Loading'
import { FormLabelComponent } from '@/components/form/form-label-component'
import { OperatorType } from '@/libs/types/operator-type'
import { useEffect } from 'react'

export default function FormEditPassword({
  form,
  handleSubmit,
  loading,
  data,
}: {
  form: UseFormReturn
  handleSubmit: (values: any) => void
  loading: boolean
  data: OperatorType
}) {
  useEffect(() => {
    if (data) {
      form.setValue('nama', data?.nama)
      form.setValue('username', data?.username)
      form.setValue('email', data?.email)
    }
  }, [data])
  return (
    <>
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loading />
        </div>
      ) : (
        <Form {...form}>
          <form
            className="flex w-full flex-col"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="flex flex-1 flex-col gap-32 pb-32">
              {/* --- Identitas --- */}
              <div className="flex flex-col gap-24">
                <div className="flex items-center gap-32 phones:flex-col phones:gap-32">
                  <FormLabelComponent
                    form={form}
                    label="Username"
                    placeHolder="Masukkan Username"
                    name="username"
                    type="text"
                    isDisabled
                    isOperator
                  />
                  <FormLabelComponent
                    form={form}
                    label="Nama"
                    placeHolder="Masukkan Nama"
                    name="nama"
                    type="text"
                    isDisabled
                    isOperator
                  />
                </div>
                <div className="flex items-center gap-32 phones:flex-col phones:gap-32">
                  <FormLabelComponent
                    form={form}
                    label="Email"
                    placeHolder="Masukkan Email"
                    name="email"
                    type="email"
                    isDisabled
                    isOperator
                  />
                  <FormLabelComponent
                    form={form}
                    label="Password"
                    placeHolder="Masukkan Password"
                    name="password"
                    type="password"
                    isDisabled={loading}
                    isOperator
                  />
                </div>
              </div>
            </div>
            {/* --- button --- */}

            <div className="flex items-center justify-end gap-16 text-[2rem]">
              <button
                disabled={loading}
                className="flex items-center justify-center gap-12 rounded-2xl bg-green-800 px-24 py-12 text-white hover:bg-green-900"
                type="submit"
              >
                Simpan
                <Save size={16} />
              </button>
            </div>
          </form>
        </Form>
      )}
    </>
  )
}
