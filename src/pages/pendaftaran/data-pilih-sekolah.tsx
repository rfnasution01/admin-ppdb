import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'
import { DataComponent } from './data-component'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { setStateBiodata } from '@/store/reducer/stateBiodata'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ModalValidasi } from './modal-validasi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { TolakSchema } from '@/libs/schema/operator-schema'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useCreateVerifikasiSetujuMutation } from '@/store/slices/verifikasiAPI'
import { FormLabelComponent } from '@/components/form/form-label-component'
import { Form } from '@/components/Form'
import { PernyataanType } from '@/libs/types/pendaftaran-type'
import { useGetPernyataanQuery } from '@/store/slices/pendaftaranAPI'

export function DataPilihSekolah({
  setName,
  setActiveIndex,
  isLoading,
  id,
  item,
  jenjang,
}: {
  setName: Dispatch<SetStateAction<string>>
  setActiveIndex: Dispatch<SetStateAction<number>>
  isLoading: boolean
  id: string
  item?: VerifikasiDetailType
  jenjang?: string
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isShowSetuju, setIsShowSetuju] = useState<boolean>(false)
  const [isShowTolak, setIsShowTolak] = useState<boolean>(false)

  // --- Pernyataan ---
  const [Pernyataan, setPernyataan] = useState<PernyataanType>()
  const { data } = useGetPernyataanQuery()

  useEffect(() => {
    if (data?.data) {
      setPernyataan(data?.data)
    }
  }, [data?.data])

  // --- Handle Verifikasi Setuju ---
  const [
    createVerifikasiSetuju,
    {
      isSuccess: isSuccessVerifikasiSetuju,
      isError: isErrorVerifikasiSetuju,
      error: errorVerifikasiSetuju,
      isLoading: isLoadingVerifikasiSetuju,
    },
  ] = useCreateVerifikasiSetujuMutation()

  async function handleVerifikasiSetuju() {
    const body = {
      id: id,
      status: '1',
    }

    try {
      await createVerifikasiSetuju({ data: body })
    } catch (error) {
      console.log(error)
    }
  }

  async function handleVerifikasiTolak(values) {
    const body = {
      id: id,
      status: '2',
      komentar: values?.komentar,
    }

    try {
      await createVerifikasiSetuju({ data: body })
    } catch (error) {
      console.log(error)
    }
  }

  // --- Sukses ---
  useEffect(() => {
    if (isSuccessVerifikasiSetuju) {
      toast.success(`Data berhasil diperbaharui!`, {
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
        setIsShowSetuju(false)
        setIsShowTolak(false)
        navigate('/data-pendaftar')
      }, 1000)
    }
  }, [isSuccessVerifikasiSetuju])

  // --- Error ---
  useEffect(() => {
    if (isErrorVerifikasiSetuju) {
      const errorMsg = errorVerifikasiSetuju as {
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
  }, [isErrorVerifikasiSetuju, errorVerifikasiSetuju])

  // --- Form Schema ---
  const form = useForm<zod.infer<typeof TolakSchema>>({
    resolver: zodResolver(TolakSchema),
    defaultValues: {},
  })

  return (
    <div className="flex h-full flex-col gap-12">
      <div className="flex h-full gap-32">
        <div className="scrollbar flex h-full w-full flex-1 flex-col gap-32 overflow-auto">
          {/* --- Pilih Sekolah --- */}
          <div className="flex flex-col gap-16">
            <p className="font-bold underline">Pilihan 1</p>
            <DataComponent
              label="Nama Sekolah"
              value={item?.pilihan?.pilihan1?.nama_sekolah ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="Skor"
              value={item?.pilihan?.pilihan1?.skor.toString() ?? '-'}
              isOrangTua
            />
          </div>

          {jenjang?.toLowerCase() === 'smp' && (
            <div className="flex flex-col gap-16">
              <p className="font-bold underline">Pilihan 2</p>
              <DataComponent
                label="Nama Sekolah"
                value={item?.pilihan?.pilihan2?.nama_sekolah ?? '-'}
                isOrangTua
              />
              <DataComponent
                label="Skor"
                value={item?.pilihan?.pilihan2?.skor.toString() ?? '-'}
                isOrangTua
              />
            </div>
          )}
        </div>
      </div>
      {/* --- button --- */}
      <div className="flex items-center justify-end bg-primary-50 p-32">
        <div className="flex items-center gap-16 text-[2rem]">
          <button
            className="rounded-2xl bg-primary-background px-24 py-12 text-white hover:bg-primary-700"
            type="button"
            disabled={isLoading}
            onClick={() => {
              setActiveIndex(4)
              setName('kelengkapan-dokumen')
              dispatch(setStateBiodata({ page: 'kelengkapan-dokumen' }))
              navigate(
                `/permintaan-verifikasi/detail-siswa?id=${id}&page=${'kelengkapan-dokumen'}`,
              )
            }}
          >
            Kembali
          </button>

          <button
            className="rounded-2xl bg-danger-100 px-24 py-12 text-danger-tint-1 hover:bg-danger-300 disabled:cursor-not-allowed disabled:bg-white disabled:text-danger-300"
            type="submit"
            onClick={() => {
              setIsShowTolak(true)
            }}
            disabled={isLoading}
          >
            Tolak
          </button>
          <button
            className="rounded-2xl bg-green-700 px-24 py-12 text-white hover:bg-green-900 disabled:cursor-not-allowed disabled:bg-white disabled:text-danger-300"
            type="submit"
            onClick={() => {
              setIsShowSetuju(true)
            }}
            disabled={isLoading}
          >
            Setujui
          </button>
        </div>
      </div>

      <ModalValidasi
        isOpen={isShowSetuju}
        setIsOpen={setIsShowSetuju}
        children={
          <div className="flex w-full flex-col gap-32 text-[2rem]">
            <div dangerouslySetInnerHTML={{ __html: Pernyataan?.operator }} />
            <div className="flex items-center justify-end gap-12">
              <button
                disabled={isLoadingVerifikasiSetuju}
                className="rounded-lg bg-rose-700 px-24 py-12 text-center text-white hover:bg-rose-900"
                type="button"
                onClick={() => setIsShowSetuju(false)}
              >
                Tidak
              </button>
              <button
                disabled={isLoadingVerifikasiSetuju}
                className="rounded-lg bg-green-700 px-24 py-12 text-center text-white hover:bg-green-900"
                type="button"
                onClick={handleVerifikasiSetuju}
              >
                Ya
              </button>
            </div>
          </div>
        }
      />

      <ModalValidasi
        isOpen={isShowTolak}
        setIsOpen={setIsShowTolak}
        children={
          <div className="flex w-full flex-col gap-32 text-[2rem]">
            <Form {...form}>
              <form
                className="scrollbar flex h-full w-full flex-col gap-32 overflow-auto"
                onSubmit={form.handleSubmit(handleVerifikasiTolak)}
              >
                <FormLabelComponent
                  form={form}
                  label="Komentar"
                  placeHolder="Masukkan Komentar"
                  name="komentar"
                  type="text"
                  isKomentar
                />
                <div
                  dangerouslySetInnerHTML={{ __html: Pernyataan?.operator }}
                />

                <div className="flex items-center justify-end gap-12">
                  <button
                    disabled={isLoadingVerifikasiSetuju}
                    className="rounded-lg bg-rose-700 px-24 py-12 text-center text-white hover:bg-rose-900"
                    type="button"
                    onClick={() => setIsShowTolak(false)}
                  >
                    Tidak
                  </button>
                  <button
                    disabled={isLoadingVerifikasiSetuju}
                    className="rounded-lg bg-green-700 px-24 py-12 text-center text-white hover:bg-green-900"
                    type="submit"
                  >
                    Ya
                  </button>
                </div>
              </form>
            </Form>
          </div>
        }
      />
      <ToastContainer />
    </div>
  )
}
