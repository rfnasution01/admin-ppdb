import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormAPendidkan } from './form-pendidikan'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Loader2, Save } from 'lucide-react'
import { sekolahSebelumnyaSchema } from '@/libs/schema/biodata-schema'
import { useCreateSekolahMutation } from '@/store/slices/pendaftaranAPI'
import { Form } from '@/components/Form'
import Loading from '@/components/Loading'
import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'

export function BiodataPendidikan({
  getProfil,
  isLoading,
  id,
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  getProfil: VerifikasiDetailType
  isLoading: boolean
  id: string
}) {
  // --- Form Schema ---
  const form = useForm<zod.infer<typeof sekolahSebelumnyaSchema>>({
    resolver: zodResolver(sekolahSebelumnyaSchema),
    defaultValues: {},
  })

  // --- Create Pendidikan ---
  const [
    createPendidikan,
    {
      isError: isErrorPendidikan,
      error: errorPendidikan,
      isLoading: isLoadingPendidikan,
      isSuccess: isSuccessPendidikan,
    },
  ] = useCreateSekolahMutation()

  const handleSubmit = (values) => {
    const body = {
      id: id,
      nisn: values?.nisn,
      npsn: values?.npsn,
      nama_sekolah: values?.nama_sekolah,
      tahun_lulus: values?.tahun_lulus,
    }

    try {
      createPendidikan({ data: body })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isSuccessPendidikan) {
      toast.success(`Pendidikan Sebelumnya berhasil disimpan!`, {
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
      setTimeout(() => {
        setIsOpen(false)
      }, 2000)
    }
  }, [isSuccessPendidikan])

  useEffect(() => {
    if (isErrorPendidikan) {
      const errorMsg = errorPendidikan as {
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
  }, [isErrorPendidikan, errorPendidikan])

  return (
    <Form {...form}>
      <form
        className="scrollbar flex h-full w-full flex-col overflow-auto"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="scrollbar flex h-full flex-1 flex-col gap-32 overflow-auto pb-32">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {/* --- Informasi Pribadi --- */}
              <FormAPendidkan
                form={form}
                getProfil={getProfil}
                isLoading={isLoading}
              />
            </>
          )}
        </div>
        {/* --- button --- */}
        <div className="flex items-center justify-between bg-primary-50 p-32">
          <p className="text-[1.8rem] text-emerald-800">* Wajib Diisi</p>
          <div className="flex items-center gap-16 text-[2rem]">
            <button
              className="rounded-2xl bg-primary-background px-24 py-12 text-white hover:bg-primary-700"
              type="button"
              disabled={isLoadingPendidikan}
              onClick={() => {
                setIsOpen(false)
              }}
            >
              Kembali
            </button>
            <button
              disabled={isLoadingPendidikan}
              className="flex items-center gap-12 rounded-2xl bg-emerald-700 px-24 py-12 text-white hover:bg-emerald-900"
              type="submit"
            >
              Simpan
              {isLoadingPendidikan ? (
                <span className="animate-spin duration-300">
                  <Loader2 size={16} />
                </span>
              ) : (
                <Save size={16} />
              )}
            </button>
          </div>
        </div>
        <ToastContainer />
      </form>
    </Form>
  )
}
