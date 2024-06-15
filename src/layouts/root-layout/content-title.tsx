import { SingleSkeleton } from '@/components/skeleton'
import { convertSlugToText, convertToSlug } from '@/libs/helpers/format-text'
import { getGreetingBasedOnTime } from '@/libs/helpers/time-greetings'
import { usePathname } from '@/libs/hooks/usePathname'
import { BiodataType } from '@/libs/types/biodata-type'
import { AdminNotifType, NotifikasiType } from '@/libs/types/tiket-type'
import { useGetBiodataQuery } from '@/store/slices/biodataAPI'
import { useGetTiketNotifikasiQuery } from '@/store/slices/pertanyaanAPI'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MenubarNotifikasi } from './menubar-notifikasi'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { hasilFilterSchema } from '@/libs/schema/hasil-schema'
import { FormListGelombang } from '@/components/form/formListGelombang'
import { Form } from '@/components/Form'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { useCreateGelombangMutation } from '@/store/slices/dashboardAPI'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { getIdGelombangSlice } from '@/store/reducer/stateIdGelombang'

export function ContentTitle() {
  const { firstPathname, secondPathname, splittedPath } = usePathname()
  const navigate = useNavigate()

  // --- Biodata ---
  const [biodata, setBiodata] = useState<BiodataType>()
  const { data, isLoading, isFetching, isError, error } = useGetBiodataQuery()

  useEffect(() => {
    if (data?.data) {
      setBiodata(data?.data)
    }
    const errorMsg = error as {
      data?: {
        message?: string
      }
    }

    if (errorMsg?.data?.message === 'Token Tidak Sesuai') {
      Cookies.remove('token')
      navigate('/login')
    }
  }, [data?.data, isError, error])

  const loading = isFetching || isLoading

  // --- Notifikasi ---
  const [notifikasiJumlah, setNotifikasiJumlah] = useState<number>()
  const [notifikasiSiswa, setNotifikasiSiswa] = useState<NotifikasiType[]>()
  const [notifikasiSekolah, setNotifikasiSekolah] = useState<AdminNotifType[]>()
  const { data: getNotifikasi } = useGetTiketNotifikasiQuery()

  useEffect(() => {
    if (getNotifikasi) {
      setNotifikasiSiswa(getNotifikasi?.data?.siswa)
      setNotifikasiSekolah(getNotifikasi?.data?.admin)
      setNotifikasiJumlah(getNotifikasi?.jlh)
    }
  }, [getNotifikasi])

  const form = useForm<zod.infer<typeof hasilFilterSchema>>({
    resolver: zodResolver(hasilFilterSchema),
    defaultValues: {},
  })

  const [
    createGelombang,
    {
      isSuccess: gelombangIsSuccess,
      isError: gelombangIsError,
      error: gelombangError,
      isLoading: gelombangIsLoading,
    },
  ] = useCreateGelombangMutation()

  async function handleFormGelombang(values: string) {
    try {
      await createGelombang({ data: { id: values } })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (gelombangIsSuccess) {
      toast.success('Gelombang berhasil diganti!', {
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
  }, [gelombangIsSuccess])

  useEffect(() => {
    if (gelombangIsError) {
      const errorMsg = gelombangError as {
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
  }, [gelombangIsError, gelombangError])

  const stateId = useSelector(getIdGelombangSlice)?.id

  useEffect(() => {
    if (stateId) {
      setId(stateId)
    }
  }, [stateId])

  const idGelombang = Cookies.get('idGelombang') ?? ''

  const [id, setId] = useState<string>(idGelombang ?? stateId ?? null)

  return (
    <div className="flex w-full items-center justify-between gap-32 phones:flex-col-reverse phones:items-start phones:gap-12">
      {/* --- Title --- */}
      <div className="w-full flex-1 text-[2.4rem] phones:text-[2.8rem]">
        {firstPathname === '' ? (
          <>
            {loading ? (
              <div className="flex w-2/6 items-center gap-12">
                <p className="text-nowrap">{getGreetingBasedOnTime()}</p>,{' '}
                <SingleSkeleton />
              </div>
            ) : (
              <p>
                {getGreetingBasedOnTime()},{' '}
                <span className="font-bold">{biodata?.nama}</span>
              </p>
            )}
          </>
        ) : firstPathname === 'hasil-ppdb' ? (
          <p className="text-[3rem] font-bold">Hasil PPDB</p>
        ) : (
          <p className="text-[3rem] font-bold">
            {convertSlugToText(firstPathname)}{' '}
            {secondPathname === 'sekolah' && 'Sekolah'}
          </p>
        )}
      </div>
      {/* --- BreadCrumbs ---- */}
      <div className="flex w-full flex-1 items-center gap-32 phones:flex-col-reverse phones:gap-24">
        <Form {...form}>
          <form className="flex-1 phones:w-full">
            <FormListGelombang
              name="gelombang"
              placeholder="Gelombang"
              useFormReturn={form}
              handleFormGelombang={handleFormGelombang}
              isDisabled={gelombangIsLoading}
              id={id}
            />
          </form>{' '}
        </Form>
        <div className="flex items-center gap-32 phones:w-full phones:justify-end">
          <MenubarNotifikasi
            dataSiswa={notifikasiSiswa}
            dataSekolah={notifikasiSekolah}
            jlh={notifikasiJumlah}
          />
          <div className="flex items-center gap-12">
            {splittedPath?.map((item, idx) => (
              <div className="flex items-center gap-12" key={idx}>
                <Link
                  to={
                    idx !== splittedPath.length - 1 ? convertToSlug(item) : ''
                  }
                  className={clsx('text-nowrap', {
                    'hover:cursor-not-allowed': idx === splittedPath.length - 1,
                  })}
                >
                  {item === ''
                    ? 'Dashboard'
                    : item === 'hasil-ppdb'
                      ? 'Hasil PPDB'
                      : convertSlugToText(item)}
                </Link>
                <p className="text-nowrap">
                  {idx < splittedPath.length - 1 ? ' / ' : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
