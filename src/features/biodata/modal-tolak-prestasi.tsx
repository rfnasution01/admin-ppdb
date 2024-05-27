/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { FormLabelComponent } from '@/components/form/form-label-component'
import { Dispatch, SetStateAction, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { TolakSchema } from '@/libs/schema/operator-schema'
import { Form } from '@/components/Form'
import { Save, X } from 'lucide-react'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useCreateVerifikasiPrestasiMutation } from '@/store/slices/verifikasiAPI'
import * as DialogPrimitive from '@radix-ui/react-dialog'

export function ModalTOlakPrestasi({
  isOpen,
  setIsOpen,
  id,
  id_dokumen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  id: string
  id_dokumen: string
}) {
  // --- Form Schema ---
  const form = useForm<zod.infer<typeof TolakSchema>>({
    resolver: zodResolver(TolakSchema),
    defaultValues: {},
  })

  // --- Dokumen ---
  const [
    createPrestasi,
    {
      isError: isErrorPrestasi,
      error: errorPrestasi,
      isLoading: isLoadingPrestasi,
      isSuccess: isSuccessPrestasi,
    },
  ] = useCreateVerifikasiPrestasiMutation()

  const handleSubmit = async (values) => {
    const body = {
      id: id,
      id_prestasi: id_dokumen,
      validasi: '2',
      catatan: values?.komentar ?? null,
    }

    try {
      await createPrestasi({ data: body })
    } catch (error) {
      console.log(error)
    }
  }

  // --- Sukses ---
  useEffect(() => {
    if (isSuccessPrestasi) {
      toast.success(`Update data berhasil!`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [isSuccessPrestasi])

  // --- Error ---
  useEffect(() => {
    if (isErrorPrestasi) {
      const errorMsg = errorPrestasi as {
        data?: {
          message?: string
        }
      }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [isErrorPrestasi, errorPrestasi])

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
                  disabled={isLoadingPrestasi}
                  className="flex items-center justify-center gap-12 rounded-2xl bg-green-800 px-24 py-12 text-white hover:bg-green-900"
                  type="submit"
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
