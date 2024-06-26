import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormBiodata } from './form-informasi-pribadi'
import { FormAlamat } from './form-alamat'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { Loader2, Save } from 'lucide-react'
import { informasiPribadiSchema } from '@/libs/schema/biodata-schema'
import { useCreateBiodataMutation } from '@/store/slices/pendaftaranAPI'
import { Form } from '@/components/Form'
import Loading from '@/components/Loading'
import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'

export function BiodataPribadi({
  getProfil,
  isLoading,
  id,
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  getProfil: VerifikasiDetailType
  isLoading?: boolean
  id: string
}) {
  // --- Form Schema ---
  const form = useForm<zod.infer<typeof informasiPribadiSchema>>({
    resolver: zodResolver(informasiPribadiSchema),
    defaultValues: {
      provinsi: '9cfb949a-0f74-48b0-80ba-fb7c37c53325',
      kabupaten: '62716ac1-fc94-427b-bd30-342b3c946bd6',
    },
  })

  // --- Create Biodata ---
  const [
    createBiodata,
    {
      isError: isErrorBiodata,
      error: errorBiodata,
      isLoading: isLoadingBiodata,
      isSuccess: isSuccessBiodata,
    },
  ] = useCreateBiodataMutation()

  const handleSubmit = (values) => {
    const body = {
      id: id,
      tempat_lahir: values?.tempat_lahir,
      jenis_kelamin: values?.jenis_kelamin,
      nomor_kk: values?.kk,
      telepon: values?.no_hp,
      agama: values?.agama,
      id_provinsi: values?.provinsi,
      id_kabupaten: values?.kabupaten,
      id_kecamatan: values?.kecamatan,
      id_desa: values?.desa,
      id_dusun: values?.dusun ?? '',
      alamat_lengkap: values?.alamat,
    }

    try {
      createBiodata({ data: body })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isSuccessBiodata) {
      toast.success(`Biodata berhasil disimpan!`, {
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
  }, [isSuccessBiodata])

  useEffect(() => {
    if (isErrorBiodata) {
      const errorMsg = errorBiodata as {
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
  }, [isErrorBiodata, errorBiodata])

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-1 flex-col gap-32 pb-32">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {/* --- Informasi Pribadi --- */}
              <div className="flex flex-col gap-24">
                <p className="text-[2.4rem] font-bold underline">
                  Informasi Pribadi
                </p>
                <FormBiodata
                  form={form}
                  getProfil={getProfil}
                  isLoading={isLoading}
                />
              </div>
              {/* --- Alamat --- */}
              <div className="flex flex-col gap-24">
                <p className="text-[2.4rem] font-bold underline">Alamat</p>
                <FormAlamat
                  form={form}
                  getProfil={getProfil}
                  isLoading={isLoading}
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
              disabled={isLoadingBiodata}
              onClick={() => {
                setIsOpen(false)
              }}
            >
              Kembali
            </button>
            <button
              disabled={isLoadingBiodata}
              className="flex items-center gap-12 rounded-2xl bg-emerald-700 px-24 py-12 text-white hover:bg-emerald-900"
              type="submit"
            >
              Simpan
              {isLoadingBiodata ? (
                <span className="animate-spin duration-300">
                  <Loader2 size={16} />
                </span>
              ) : (
                <Save size={16} />
              )}
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </Form>
  )
}
