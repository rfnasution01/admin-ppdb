import Loading from '@/components/Loading'
import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'
import {
  useCreateVerifikasiDokumenMutation,
  useCreateVerifikasiPrestasiMutation,
  useCreateVerifikasiSetujuMutation,
  useGetVerifikasiByIdQuery,
} from '@/store/slices/verifikasiAPI'
import { useEffect, useState } from 'react'
import { Accordion } from './accordion-verifikasi'
import {
  FormBiodata,
  FormDokumen,
  FormJalur,
  FormOrangTua,
  FormPilihan,
  FormPrestasi,
  FormSekolah,
} from '@/features/verifikasi'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { enumVerifikasi } from '@/libs/enum/enum-verifikasi'
import { ModalTOlak } from './modal-tolak'
import { useNavigate } from 'react-router-dom'
import { enumFile } from '@/libs/enum/enum-file'
import { TolakSchema } from '@/libs/schema/operator-schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

export default function DetailSiswa() {
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const idParams = searchParams.get('id')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [idData, setIdData] = useState<string>(null)
  const [status, setStatus] = useState<number>(null)

  // --- Form Schema ---
  const form = useForm<zod.infer<typeof TolakSchema>>({
    resolver: zodResolver(TolakSchema),
    defaultValues: {},
  })

  const id = idParams ?? null
  // --- Detail ---
  const [detail, setDetail] = useState<VerifikasiDetailType>()
  const { data, isLoading, isFetching } = useGetVerifikasiByIdQuery(
    { id: id },
    { skip: id === null || id === undefined },
  )

  useEffect(() => {
    if (data?.data) {
      setDetail(data?.data)
    }
  }, [data?.data])

  const loading = isFetching || isLoading

  // --- Dokumen ---
  const [
    createDokumen,
    {
      isError: isErrorDokumen,
      error: errorDokumen,
      isLoading: isLoadingDokumen,
      isSuccess: isSuccessDokumen,
    },
  ] = useCreateVerifikasiDokumenMutation()

  const handleSubmit = async (values) => {
    const body = {
      id: id,
      id_dokumen: idData,
      status: status.toString(),
      komentar: values?.komentar ?? null,
    }

    try {
      await createDokumen({ data: body })
    } catch (error) {
      console.log(error)
    }
  }

  // --- Sukses ---
  useEffect(() => {
    if (isSuccessDokumen) {
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
  }, [isSuccessDokumen])

  // --- Error ---
  useEffect(() => {
    if (isErrorDokumen) {
      const errorMsg = errorDokumen as {
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
  }, [isErrorDokumen, errorDokumen])

  // --- Prestasi ---
  const [
    createPrestasi,
    {
      isError: isErrorPrestasi,
      error: errorPrestasi,
      isLoading: isLoadingPrestasi,
      isSuccess: isSuccessPrestasi,
    },
  ] = useCreateVerifikasiPrestasiMutation()

  const handleSubmitPrestasi = async (
    id_prestasi: string,
    status: string,
    komentar?: string,
  ) => {
    const body = {
      id: id,
      id_prestasi: id_prestasi,
      validasi: status,
      catatan: komentar ?? null,
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
      toast.success(`Veerifikasi file berhasil!`, {
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

  async function handleVerifikasiSetuju(status: string) {
    const body = {
      id: id,
      status: status,
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
      toast.success(`Data berhasil diverifikasi!`, {
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
        navigate(`/permintaan-verifikasi`)
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

  const isWajibDiIsiSemua = detail?.dokumen?.some(
    (item) =>
      item.status === 'Wajib' &&
      item.status_verifikasi === enumFile.BELUMUPLOAD,
  )

  return (
    <div className="flex h-full w-full flex-col gap-32">
      <p className="font-bold">Detail Data</p>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-12">
          <Accordion
            title="Jalur"
            content={<FormJalur detail={detail} />}
            idx={0}
          />
          <Accordion
            title="Biodata"
            content={<FormBiodata detail={detail} />}
            idx={1}
          />
          <Accordion
            title="Sekolah"
            content={<FormSekolah detail={detail} />}
            idx={2}
          />
          <Accordion
            title="Orang Tua"
            content={<FormOrangTua detail={detail} />}
            idx={2}
          />

          <Accordion
            title="Dokumen"
            content={
              <FormDokumen
                detail={detail}
                idData={idData}
                isLoading={isLoadingDokumen}
                handleSubmit={handleSubmit}
                form={form}
                setIdData={setIdData}
                setStatus={setStatus}
              />
            }
            idx={3}
          />

          <Accordion
            title="Prestasi"
            content={
              <FormPrestasi
                detail={detail}
                id={id}
                isLoading={isLoadingPrestasi}
                handleSubmit={handleSubmitPrestasi}
              />
            }
            idx={4}
          />

          <Accordion
            title="Pilihan"
            content={<FormPilihan detail={detail} />}
            idx={5}
          />
        </div>
      )}

      <div className="flex justify-end">
        <div className="flex items-center gap-12">
          <button
            type="button"
            disabled={isLoadingVerifikasiSetuju || isWajibDiIsiSemua}
            onClick={() => {
              setIsOpen(true)
            }}
            className="text-nowrap rounded-full  bg-rose-700 px-24 py-12 text-center text-[1.6rem] text-white hover:bg-rose-900 disabled:cursor-not-allowed phones:text-[2rem]"
          >
            Tolak
          </button>
          <button
            disabled={isLoadingVerifikasiSetuju || isWajibDiIsiSemua}
            type="button"
            onClick={() => {
              handleVerifikasiSetuju(enumVerifikasi.DISETUJUI.toString())
            }}
            className="text-nowrap rounded-full bg-green-700 px-24 py-12 text-center text-[1.6rem] text-white hover:bg-green-900 disabled:cursor-not-allowed phones:text-[2rem]"
          >
            Verifikasi
          </button>
        </div>
      </div>
      <ModalTOlak isOpen={isOpen} setIsOpen={setIsOpen} id={id} />
      <ToastContainer />
    </div>
  )
}
