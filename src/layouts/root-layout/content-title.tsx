import { SingleSkeleton } from '@/components/skeleton'
import { convertSlugToText, convertToSlug } from '@/libs/helpers/format-text'
import { getGreetingBasedOnTime } from '@/libs/helpers/time-greetings'
import { usePathname } from '@/libs/hooks/usePathname'
import { BiodataType } from '@/libs/types/biodata-type'
import { TikeetNotificationType } from '@/libs/types/tiket-type'
import { useGetBiodataQuery } from '@/store/slices/biodataAPI'
import { useGetTiketNotifikasiQuery } from '@/store/slices/pertanyaanAPI'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MenubarNotifikasi } from './menubar-notifikasi'

export function ContentTitle() {
  const { firstPathname, splittedPath } = usePathname()
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
  const [notifikasi, setNotifikasi] = useState<TikeetNotificationType>()
  const { data: getNotifikasi } = useGetTiketNotifikasiQuery()

  useEffect(() => {
    if (getNotifikasi) {
      setNotifikasi(getNotifikasi)
    }
  }, [getNotifikasi])

  return (
    <div className="flex w-full items-center justify-between gap-32 phones:flex-col-reverse phones:items-start phones:gap-12">
      {/* --- Title --- */}
      <div className="w-full text-[2.4rem] phones:text-[2.8rem]">
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
        ) : (
          <p className="text-[3rem] font-bold">
            {convertSlugToText(firstPathname)}
          </p>
        )}
      </div>
      {/* --- BreadCrumbs ---- */}
      <div className="flex items-center gap-32">
        <MenubarNotifikasi data={notifikasi} />
        <div className="flex items-center gap-12">
          {splittedPath?.map((item, idx) => (
            <div className="flex items-center gap-12" key={idx}>
              <Link
                to={idx !== splittedPath.length - 1 ? convertToSlug(item) : ''}
                className={clsx('', {
                  'text-nowrap hover:cursor-not-allowed':
                    idx === splittedPath.length - 1,
                })}
              >
                {item === '' ? 'Dashboard' : convertSlugToText(item)}
              </Link>
              <p>{idx < splittedPath.length - 1 ? ' / ' : ''}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
