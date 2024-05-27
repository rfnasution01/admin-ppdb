import { NoData } from '@/components/NoData'
import { MultiSkeleton } from '@/components/skeleton'
import { enumJalur } from '@/libs/enum/enum-jalur'
import { VerifikasiType } from '@/libs/types/verifikasi-type'
import {
  useCreateVerifikasiClaimMutation,
  useGetVerifikasiQuery,
} from '@/store/slices/verifikasiAPI'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { DataComponent } from './data-component'
import { ProfilType } from '@/libs/types/profil-type'
import { useGetProfilQuery } from '@/store/slices/profilAPI'
import { Table } from '@/components/Table'
import { columnsVerifikasi } from '@/libs/dummy/table'

export default function Verif() {
  const navigate = useNavigate()
  const [title, setTitle] = useState<string>('verifikasi')

  // --- Verifikasi ---
  const [verifikasi, setVerifikasi] = useState<VerifikasiType[]>()
  const [lainnya, setLainnya] = useState<VerifikasiType[]>()
  const [name, setName] = useState<string | null>(null)
  const { data, isLoading, isFetching } = useGetVerifikasiQuery()

  useEffect(() => {
    if (data) {
      setVerifikasi(data?.data)
      setLainnya(data?.user_lain)
    }
  }, [data])

  // --- Profil ---
  const [profil, setProfil] = useState<ProfilType>()
  const { data: dataProfil } = useGetProfilQuery()

  useEffect(() => {
    if (dataProfil?.data) {
      setProfil(dataProfil?.data)
    }
  }, [dataProfil?.data])

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

  const loading = isFetching || isLoading

  return (
    <div className="scrollbar flex h-full w-full flex-col gap-32 overflow-auto pb-32">
      <div className="flex items-center gap-32">
        <p
          className={clsx('hover:cursor-pointer', {
            'text-danger-100': title === 'verifikasi',
          })}
          onClick={() => {
            setTitle('verifikasi')
          }}
        >
          Verifikasi Data
        </p>
        <p
          className={clsx('hover:cursor-pointer', {
            'text-danger-100': title === 'lainnya',
          })}
          onClick={() => {
            setTitle('lainnya')
          }}
        >
          Data Dari Sekolah Lain
        </p>
      </div>
      {title === 'verifikasi' ? (
        <div className="grid grid-cols-12 gap-32 ">
          {loading ? (
            <div className="col-span-4 phones:col-span-12">
              <MultiSkeleton />
            </div>
          ) : verifikasi?.length === 0 ? (
            <div className="col-span-4 phones:col-span-12">
              <NoData />
            </div>
          ) : (
            <>
              {verifikasi?.map((item, idx) => (
                <div
                  className="col-span-4 rounded-2xl border bg-white shadow hover:cursor-pointer hover:shadow-md phones:col-span-12"
                  key={idx}
                >
                  <div
                    className={clsx('flex flex-col ', {
                      'border-indigo-100':
                        item?.kode?.toUpperCase() === enumJalur?.ZONASI,
                      'border-rose-100':
                        item?.kode?.toUpperCase() === enumJalur?.AFIRMASI,
                      'border-orange-100':
                        item?.kode?.toUpperCase() === enumJalur?.PRESTASI,
                      'border-emerald-100':
                        item?.kode?.toUpperCase() === enumJalur?.PINDAHTUGAS,
                      'border-sky-100':
                        item?.kode?.toUpperCase() === enumJalur?.DISABILITAS,
                    })}
                  >
                    <p
                      className={clsx('p-32 text-white', {
                        'bg-gradient-to-br from-indigo-500 via-indigo-400 to-indigo-600':
                          item?.kode?.toUpperCase() === enumJalur.ZONASI,
                        'bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600':
                          item?.kode?.toUpperCase() === enumJalur.PRESTASI,
                        'bg-gradient-to-br from-rose-500 via-rose-400 to-rose-600':
                          item?.kode?.toUpperCase() === enumJalur.AFIRMASI,
                        'via-emerlad-400 bg-gradient-to-br from-emerald-500 to-emerald-600':
                          item?.kode?.toUpperCase() === enumJalur.PINDAHTUGAS,
                        'bg-gradient-to-br from-sky-500 via-sky-400 to-sky-600':
                          item?.kode?.toUpperCase() === enumJalur.DISABILITAS,
                      })}
                      style={{
                        borderTopLeftRadius: '1rem',
                        borderTopRightRadius: '1rem',
                      }}
                    >
                      {item?.nama}
                    </p>
                    <div className="flex flex-col gap-12 p-32">
                      <DataComponent label="Jalur" value={item?.jalur ?? '-'} />
                      {profil?.identitas?.jenjang.toLowerCase() === 'smp' && (
                        <DataComponent label="NISN" value={item?.nisn ?? '-'} />
                      )}
                      <DataComponent label="NIK" value={item?.nik ?? '-'} />
                      <DataComponent
                        label="TTL"
                        value={`${item?.tempat_lahir}, 
                ${dayjs(item?.tanggal_lahir).format('DD MMMM YYYY')}`}
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
                        value={
                          dayjs(item?.diajukan).format('DD MMMM YYYY') ?? '-'
                        }
                        isItalic
                      />
                      <button
                        type="button"
                        disabled={isLoadingClaim}
                        onClick={() => {
                          setName(item?.id)
                          handleSubmit(item?.id)
                        }}
                        className={clsx(
                          'rounded-lg py-12 text-center text-[2rem] text-white phones:text-[2.4rem]',
                          {
                            'bg-gradient-to-br from-indigo-500 via-indigo-400 to-indigo-600':
                              item?.kode?.toUpperCase() === enumJalur.ZONASI,
                            'bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600':
                              item?.kode?.toUpperCase() === enumJalur.PRESTASI,
                            'bg-gradient-to-br from-rose-500 via-rose-400 to-rose-600':
                              item?.kode?.toUpperCase() === enumJalur.AFIRMASI,
                            'via-emerlad-400 bg-gradient-to-br from-emerald-500 to-emerald-600':
                              item?.kode?.toUpperCase() ===
                              enumJalur.PINDAHTUGAS,
                            'bg-gradient-to-br from-sky-500 via-sky-400 to-sky-600':
                              item?.kode?.toUpperCase() ===
                              enumJalur.DISABILITAS,
                          },
                        )}
                      >
                        {item?.verifikasi === 1
                          ? 'Proses Verifikasi'
                          : 'Verifikasi Data'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <div className="h-full w-full">
          <Table
            data={lainnya}
            columns={columnsVerifikasi}
            containerClasses="w-full"
          />
        </div>
      )}
      <ToastContainer />
    </div>
  )
}
