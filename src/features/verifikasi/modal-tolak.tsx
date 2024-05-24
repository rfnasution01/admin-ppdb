/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { FormLabelComponent } from '@/components/form/form-label-component'
import { Dispatch, SetStateAction } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/Form'
import { Save, X } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

export function ModalTOlak({
  isOpen,
  setIsOpen,
  form,
  handleSubmit,
  setIdData,
  setStatus,
  idData,
}: {
  setIdData: Dispatch<SetStateAction<string>>
  setStatus: Dispatch<SetStateAction<number>>
  form: UseFormReturn
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  handleSubmit: (values: any) => Promise<void>
  idData: string
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        position="middle"
        style={{
          width: '70%',
        }}
      >
        <div className="flex flex-col gap-16 p-32">
          {/* --- Header --- */}
          <DialogHeader>
            <DialogTitle>
              <p className="text-[2.4rem] font-bold phones:text-[2.8rem]">
                Form Tolak
              </p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <X size={18} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          <hr className="border" />
          <Form {...form}>
            <form
              className="flex w-full flex-col"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <div className="flex flex-1 flex-col gap-32 pb-32">
                <div className="flex flex-col gap-24">
                  <FormLabelComponent
                    form={form}
                    label="Komentar"
                    placeHolder="Masukkan Komentar"
                    name="komentar"
                    type="text"
                    isKomentar
                  />
                </div>
              </div>
              {/* --- button --- */}

              <div className="flex items-center justify-end gap-16 text-[2rem]">
                <button
                  className="flex items-center justify-center gap-12 rounded-2xl bg-green-800 px-24 py-12 text-white hover:bg-green-900"
                  type="submit"
                  onClick={() => {
                    setIdData(idData)
                    setStatus(2)
                  }}
                >
                  Simpan
                  <Save size={16} />
                </button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
