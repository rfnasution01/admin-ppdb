/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { X } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { OperatorSchema } from '@/libs/schema/operator-schema'
import { Dispatch, SetStateAction, useEffect } from 'react'
import FormTambahOperator from './form-tambah'
import { useCreateTambahOperatorMutation } from '@/store/slices/operatorAPI'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function ModalTambahOperator({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  // --- Form Schema ---
  const form = useForm<zod.infer<typeof OperatorSchema>>({
    resolver: zodResolver(OperatorSchema),
    defaultValues: {},
  })

  const [
    createTambahOperator,
    {
      isError: isErrorTambahOperator,
      error: errorTambahOperator,
      isLoading: isLoadingTambahOperator,
      isSuccess: isSuccessTambahOperator,
    },
  ] = useCreateTambahOperatorMutation()

  const handleSubmit = async (values) => {
    const bodyTambahOperator = {
      username: values?.username,
      nama: values?.nama,
      email: values?.email,
      hp: values?.hp,
      password: values?.password,
    }

    try {
      await createTambahOperator({ data: bodyTambahOperator })
    } catch (error) {
      console.log(error)
    }
  }

  // --- Sukses ---
  useEffect(() => {
    if (isSuccessTambahOperator) {
      toast.success(`Tambah data berhasil!`, {
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
      setIsOpen(false)
    }
  }, [isSuccessTambahOperator])

  // --- Error ---
  useEffect(() => {
    if (isErrorTambahOperator) {
      const errorMsg = errorTambahOperator as {
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
  }, [isErrorTambahOperator, errorTambahOperator])

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
                Form Tambah Data
              </p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <X size={18} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          <hr className="border" />
          <FormTambahOperator
            form={form}
            handleSubmit={handleSubmit}
            loading={isLoadingTambahOperator}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
