import { NoData } from '@/components/NoData'
import { VerifikasiType } from '@/libs/types/verifikasi-type'
import {
  useCreateVerifikasiClaimMutation,
  useGetVerifikasiQuery,
} from '@/store/slices/verifikasiAPI'
import { useEffect, useState } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useNavigate } from 'react-router-dom'
import { DataComponent } from './data-component'
import dayjs from 'dayjs'
import Loading from '@/components/Loading'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function DashboardVerifikasiData() {
  const navigate = useNavigate()

  // --- Verifikasi ---
  const [verifikasi, setVerifikasi] = useState<VerifikasiType[]>()
  const [name, setName] = useState<string | null>(null)
  const { data, isLoading, isFetching } = useGetVerifikasiQuery()
  const [indexNow, setIndexNow] = useState<number>(0)

  useEffect(() => {
    if (data) {
      setVerifikasi(data?.data)
    }
  }, [data])

  // --- Claim ---
  const [
    createClaim,
    {
      isError: isErrorClaim,
      error: errorClaim,
      isLoading: isLoadingClaim,
      isSuccess: isSuccessClaim,
    },
  ] = useCreateVerifikasiClaimMutation()

  const handleSubmit = async (id: string) => {
    const body = {
      id: id,
    }

    try {
      await createClaim({ data: body })
    } catch (error) {
      console.log(error)
    }
  }

  // --- Sukses ---
  useEffect(() => {
    if (isSuccessClaim) {
      toast.success(`Claim data berhasil!`, {
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
      if (name) {
        setTimeout(() => {
          navigate(`/permintaan-verifikasi/detail-siswa?id=${name}`)
        }, 1000)
      }
    }
  }, [isSuccessClaim])

  // --- Error ---
  useEffect(() => {
    if (isErrorClaim) {
      const errorMsg = errorClaim as {
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
  }, [isErrorClaim, errorClaim])

  return (
    <div className="flex flex-col gap-64">
      <div className="flex justify-between gap-32 text-[#005479]">
        <p className="text-[3.2rem] font-bold">Verifikasi Data</p>
        <Link
          to="/permintaan-verifikasi"
          className="underline hover:text-primary"
        >
          Lihat Semua
        </Link>
      </div>
      {/* --- Data --- */}
      {isLoading || isFetching ? (
        <Loading />
      ) : verifikasi?.length > 0 ? (
        <div>
          {verifikasi?.slice(indexNow, indexNow + 1).map((item, idx) => (
            <div className="flex flex-col gap-64" key={idx}>
              <div className="flex flex-col gap-24">
                <DataComponent label="Nama" value={item?.nama ?? '-'} />
                <DataComponent label="Jalur" value={item?.jalur ?? '-'} />
                <DataComponent
                  label="T. Tgl Lahir"
                  value={`${item?.tempat_lahir}, ${dayjs(item?.tanggal_lahir).locale('id').format('DD MMMM YYYY')}`}
                />
                <DataComponent
                  label="Asal Sekolah"
                  value={item?.asal_sekolah ?? '-'}
                />
                <DataComponent
                  label="Pilihan 1"
                  value={item?.pilihan1 ?? '-'}
                />
                <DataComponent
                  label="Pilihan 2"
                  value={item?.pilihan2 ?? '-'}
                />
                <DataComponent
                  label="Diajukan"
                  value={dayjs(item?.diajukan)
                    .locale('id')
                    .format('DD MMM YYYY HH:mm')}
                />
              </div>
              <div className="flex items-center justify-between gap-32">
                <button
                  type="button"
                  disabled={isLoadingClaim}
                  className="rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 px-32 py-16 text-white hover:shadow-md disabled:cursor-not-allowed"
                  onClick={() => {
                    setName(item?.id)
                    handleSubmit(item?.id)
                  }}
                >
                  {item?.verifikasi === 1
                    ? 'Proses Verifikasi'
                    : 'Verifikasi Data'}
                </button>
                <div className="flex items-center gap-32">
                  <button
                    type="button"
                    disabled={indexNow === 0}
                    onClick={() => {
                      setIndexNow(indexNow - 1)
                    }}
                    className="rounded-lg border border-[#005479] p-8 text-[#005479] hover:cursor-pointer hover:bg-[#005479] hover:text-white disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    disabled={indexNow > verifikasi?.length - 1}
                    onClick={() => {
                      setIndexNow(indexNow + 1)
                    }}
                    className="rounded-lg border border-[#005479] p-8 text-[#005479] hover:cursor-pointer hover:bg-[#005479] hover:text-white disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoData />
      )}
      <ToastContainer />
    </div>
  )
}
