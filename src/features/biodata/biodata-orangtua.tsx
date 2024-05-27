import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormAyah } from './form-ayah'
import { FormIbu } from './form-ibu'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { FormWali } from './form-wali'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { orangTuaSchema } from '@/libs/schema/biodata-schema'
import { useCreateOrangTuaMutation } from '@/store/slices/pendaftaranAPI'
import { Form } from '@/components/Form'
import Loading from '@/components/Loading'
import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'

export function BiodataOrangTua({
  setIsOpen,
  getProfil,
  id,
  isLoading,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  getProfil: VerifikasiDetailType
  isLoading: boolean
  id: string
}) {
  // --- Form Schema ---
  const form = useForm<zod.infer<typeof orangTuaSchema>>({
    resolver: zodResolver(orangTuaSchema),
    defaultValues: {},
  })

  // --- Create OrangTua ---
  const [
    createOrangTua,
    {
      isError: isErrorOrangTua,
      error: errorOrangTua,
      isLoading: isLoadingOrangTua,
      isSuccess: isSuccessOrangTua,
    },
  ] = useCreateOrangTuaMutation()

  // --- Handle Submit ---
  const handleSubmit = (values) => {
    const body = {
      id: id,
      status_ayah: values?.isHidupAyah ? 'Hidup' : 'Meninggal',
      nik_ayah: values?.nik_ayah ?? null,
      nama_ayah: values?.nama_ayah ?? null,
      hp_ayah: values?.telepon_ayah ?? null,
      pendidikan_ayah: values?.pendidikan_ayah ?? null,
      pekerjaan_ayah: values?.pekerjaan_ayah ?? null,
      status_ibu: values?.isHidupIbu ? 'Hidup' : 'Meninggal',
      nik_ibu: values?.nik_ibu ?? null,
      nama_ibu: values?.nama_ibu ?? null,
      hp_ibu: values?.telepon_ibu ?? null,
      pendidikan_ibu: values?.pendidikan_ibu ?? null,
      pekerjaan_ibu: values?.pekerjaan_ibu ?? null,
      nik_wali: values?.nik_wali ?? null,
      nama_wali: values?.nama_wali ?? null,
      hp_wali: values?.telepon_wali ?? null,
      pendidikan_wali: values?.pendidikan_wali ?? null,
      pekerjaan_wali: values?.pekerjaan_wali ?? null,
    }

    try {
      createOrangTua({ data: body })
    } catch (error) {
      console.log(error)
    }
  }

  // --- Sukses ---
  useEffect(() => {
    if (isSuccessOrangTua) {
      toast.success(`Data orang tua berhasil disimpan!`, {
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
  }, [isSuccessOrangTua])

  // --- Error ---
  useEffect(() => {
    if (isErrorOrangTua) {
      const errorMsg = errorOrangTua as {
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
  }, [isErrorOrangTua, errorOrangTua])

  const isLoadings = isLoadingOrangTua || isLoading

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-1 flex-col gap-32 pb-32">
          {isLoadings ? (
            <Loading />
          ) : (
            <>
              {/* --- Ayah --- */}
              <div className="flex flex-col gap-24">
                <p className="text-[2.4rem] font-bold underline">Ayah</p>
                <FormAyah
                  form={form}
                  isLoading={isLoading}
                  getProfil={getProfil}
                />
              </div>
              {/* --- Ibu --- */}
              <div className="flex flex-col gap-24">
                <p className="text-[2.4rem] font-bold underline">Ibu</p>
                <FormIbu
                  form={form}
                  isLoading={isLoading}
                  getProfil={getProfil}
                />
              </div>
              {/* --- Wali --- */}
              <div className="flex flex-col gap-24">
                <p className="text-[2.4rem] font-bold underline">Wali</p>
                <FormWali
                  form={form}
                  isLoading={isLoading}
                  getProfil={getProfil}
                />
              </div>
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
              disabled={isLoading}
              onClick={() => {
                setIsOpen(false)
              }}
            >
              Kembali
            </button>
            <button
              disabled={isLoadings}
              className="rounded-2xl bg-emerald-700 px-24 py-12 text-white hover:bg-emerald-900"
              type="submit"
            >
              Simpan
            </button>
          </div>
        </div>
        <ToastContainer />
      </form>
    </Form>
  )
}
