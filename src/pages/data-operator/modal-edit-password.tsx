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
import { useCreateEditPasswordMutation } from '@/store/slices/operatorAPI'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { OperatorType } from '@/libs/types/operator-type'
import FormEditPassword from './form-edit-password'

export function ModalEditPassword({
  isOpen,
  setIsOpen,
  data,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  data: OperatorType
}) {
  // --- Form Schema ---
  const form = useForm<zod.infer<typeof OperatorSchema>>({
    resolver: zodResolver(OperatorSchema),
    defaultValues: {},
  })

  const [
    createEditPassword,
    {
      isError: isErrorEditPassword,
      error: errorEditPassword,
      isLoading: isLoadingEditPassword,
      isSuccess: isSuccessEditPassword,
    },
  ] = useCreateEditPasswordMutation()

  const handleSubmit = async (values) => {
    const bodyEditPassword = {
      id: data?.id,
      password: values?.password,
    }

    try {
      await createEditPassword({ data: bodyEditPassword })
    } catch (error) {
      console.log(error)
    }
  }

  // --- Sukses ---
  useEffect(() => {
    if (isSuccessEditPassword) {
      toast.success(`Edit password berhasil!`, {
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
  }, [isSuccessEditPassword])

  // --- Error ---
  useEffect(() => {
    if (isErrorEditPassword) {
      const errorMsg = errorEditPassword as {
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
  }, [isErrorEditPassword, errorEditPassword])

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
                Form Edit Password
              </p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <X size={18} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          <hr className="border" />
          <FormEditPassword
            form={form}
            handleSubmit={handleSubmit}
            loading={isLoadingEditPassword}
            data={data}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
