import Loading from '@/components/Loading'
import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'
import {
  useCreateVerifikasiDokumenMutation,
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
  FormSekolah,
} from '@/features/verifikasi'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { enumVerifikasi } from '@/libs/enum/enum-verifikasi'
import { ModalTOlak } from './modal-tolak'
import { useNavigate } from 'react-router-dom'

export default function DetailSiswa() {
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const idParams = searchParams.get('id')
  const [isOpen, setIsOpen] = useState<boolean>(false)

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

  const handleSubmit = async (
    id_dokumen: string,
    status: string,
    komentar?: string,
  ) => {
    const body = {
      id: id,
      id_dokumen: id_dokumen,
      status: status,
      komentar: komentar ?? null,
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
                id={id}
                isLoading={isLoadingDokumen}
                handleSubmit={handleSubmit}
              />
            }
            idx={3}
          />

          <Accordion
            title="Pilihan"
            content={<FormPilihan detail={detail} />}
            idx={4}
          />
        </div>
      )}

      <div className="flex justify-end">
        <div className="flex items-center gap-12">
          <button
            type="button"
            disabled={isLoadingVerifikasiSetuju}
            onClick={() => {
              setIsOpen(true)
            }}
            className="text-nowrap rounded-full  bg-rose-700 px-24 py-12 text-center text-[1.6rem] text-white hover:bg-rose-900 disabled:cursor-not-allowed phones:text-[2rem]"
          >
            Tolak
          </button>
          <button
            disabled={isLoadingVerifikasiSetuju}
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
