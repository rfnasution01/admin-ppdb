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
import { AlertCircle } from 'lucide-react'

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
      status: '2',
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
      status: '3',
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

  // --- Mengecek apakah masih ada dokumen yang belum di setujui ---
  const isWajibFileNotVerified = item?.dokumen?.some(
    (list) => list?.status_verifikasi !== 1,
  )

  const isFileNotVerified = item?.dokumen?.some(
    (list) => list?.status_verifikasi === 0,
  )

  // --- Mengecek apakah masih ada prestasi yang belum di validasi ---
  const isPrestasiNotVerified = item?.prestasi?.data?.some(
    (list) => list?.validasi === 0,
  )

  const fileNotVerified = item?.dokumen?.filter(
    (list) => list?.status_verifikasi === 0,
  )

  const fileNotAccepted = item?.dokumen?.filter(
    (list) => list?.status_verifikasi === 2,
  )

  const prestasiNotVerified = item?.prestasi?.data?.filter(
    (list) => list?.validasi === 0,
  )

  const disableSetuju = isWajibFileNotVerified || isPrestasiNotVerified
  const disableTOlak = isFileNotVerified || isPrestasiNotVerified

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
          <div>
            {disableSetuju ? (
              <div className="flex flex-col gap-32">
                <div className="flex items-center gap-12 border border-red-700 text-[2.2rem] text-red-700">
                  <span className="bg-red-700 p-12 text-white">
                    <AlertCircle size={16} />
                  </span>
                  <p>
                    Maaf! Masih ada Dokumen yang belum di Verifikasi / di
                    Setujui.
                  </p>
                </div>
                <div className="flex flex-col gap-24 text-[2.4rem]">
                  {/* --- DOkumen Belum Diverifikasi --- */}
                  {fileNotVerified?.length > 0 && (
                    <div className="flex flex-col gap-16">
                      <p>Dokumen yang belum validasi:</p>
                      <ol className="list-decimal pl-48">
                        {fileNotVerified?.map((item, idx) => (
                          <li key={idx}>{item?.nama}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {/* --- DOkumen Belum Disetujui --- */}
                  {fileNotAccepted?.length > 0 && (
                    <div className="flex flex-col gap-16">
                      <p>Dokumen yang belum disetujui:</p>
                      <ol className="list-decimal pl-48">
                        {fileNotAccepted?.map((item, idx) => (
                          <li key={idx}>{item?.nama}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {/* --- Prestasi Belum Divalidasi--- */}
                  {prestasiNotVerified?.length > 0 && (
                    <div className="flex flex-col gap-16">
                      <p>Prestasi yang belum divalidasi:</p>
                      <ol className="list-decimal pl-48">
                        {prestasiNotVerified?.map((item, idx) => (
                          <li key={idx}>{item?.nama_prestasi}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-end gap-12">
                  <button
                    disabled={isLoadingVerifikasiSetuju}
                    className="rounded-lg bg-green-700 px-24 py-12 text-center text-white hover:bg-green-900"
                    type="button"
                    onClick={() => setIsShowSetuju(false)}
                  >
                    Kembali
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex w-full flex-col gap-32 text-[2rem]">
                <div
                  dangerouslySetInnerHTML={{ __html: Pernyataan?.operator }}
                />
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
            )}
          </div>
        }
      />

      <ModalValidasi
        isOpen={isShowTolak}
        setIsOpen={setIsShowTolak}
        children={
          <div>
            {disableTOlak ? (
              <div className="flex flex-col gap-32">
                <div className="flex items-center gap-12 border border-red-700 text-[2.2rem] text-red-700">
                  <span className="bg-red-700 p-12 text-white">
                    <AlertCircle size={16} />
                  </span>
                  <p>Maaf! Masih ada Dokumen yang belum di Verifikasi.</p>
                </div>
                <div className="flex flex-col gap-24 text-[2.4rem]">
                  {/* --- DOkumen Belum Diverifikasi --- */}
                  {fileNotVerified?.length > 0 && (
                    <div className="flex flex-col gap-16">
                      <p>Dokumen yang belum validasi:</p>
                      <ol className="list-decimal pl-48">
                        {fileNotVerified?.map((item, idx) => (
                          <li key={idx}>{item?.nama}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* --- Prestasi Belum Divalidasi--- */}
                  {prestasiNotVerified?.length > 0 && (
                    <div className="flex flex-col gap-16">
                      <p>Prestasi yang belum divalidasi:</p>
                      <ol className="list-decimal pl-48">
                        {prestasiNotVerified?.map((item, idx) => (
                          <li key={idx}>{item?.nama_prestasi}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-end gap-12">
                  <button
                    disabled={isLoadingVerifikasiSetuju}
                    className="rounded-lg bg-green-700 px-24 py-12 text-center text-white hover:bg-green-900"
                    type="button"
                    onClick={() => setIsShowTolak(false)}
                  >
                    Kembali
                  </button>
                </div>
              </div>
            ) : (
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
            )}
          </div>
        }
      />
      <ToastContainer />
    </div>
  )
}
