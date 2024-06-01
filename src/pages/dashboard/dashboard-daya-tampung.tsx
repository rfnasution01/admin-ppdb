import Loading from '@/components/Loading'
import { DayaTampungType } from '@/libs/types/profil-type'
import { useGetDayaTampungQuery } from '@/store/slices/dayaTampungAPI'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { StatistikDayaTampung } from './statistik-daya-tampung'
import { MultiSkeleton } from '@/components/skeleton'

export function DashboardDayaTampung() {
  // --- DayaTampung ---
  const [DayaTampung, setDayaTampung] = useState<DayaTampungType[]>()
  const { data, isLoading, isFetching } = useGetDayaTampungQuery()

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data?.data) {
      setDayaTampung(data?.data)
    }
  }, [data?.data])

  const total = DayaTampung?.flatMap((item) =>
    item?.jumlah ? parseInt(item.jumlah) : 0,
  ).reduce((acc, curr) => acc + curr, 0)

  return (
    <div className="grid w-full grid-cols-12 flex-col gap-32 rounded-2xl bg-white p-32 shadow-md">
      <div className="col-span-6 phones:col-span-12">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-32">
            <div className="flex items-center gap-32">
              {/* --- Progress Bar --- */}
              <StatistikDayaTampung jsonData={DayaTampung} />
              <div className="flex flex-col gap-8">
                <p className="text-[4rem] font-bold text-[#005479]">
                  Daya Tampung
                </p>
                <p>
                  <span className="text-[4rem] font-bold text-[#005479]">
                    {total}
                  </span>{' '}
                  siswa
                </p>
              </div>
            </div>
            {/* --- Detail --- */}
            <div className="flex flex-wrap gap-16">
              {DayaTampung?.map((item, idx) => (
                <div className="flex items-center gap-12" key={idx}>
                  <div
                    className={clsx('h-[1.6rem] w-[1.6rem] rounded-full', {
                      'bg-[#ff6384]': item?.kode.toLowerCase() === 'zn',
                      'bg-[#36a2eb]': item?.kode.toLowerCase() === 'afr',
                      'bg-[#ffcd56]': item?.kode.toLowerCase() === 'afrd',
                      'bg-[#4bc0c0]': item?.kode.toLowerCase() === 'tr',
                      'bg-[#9966ff]': item?.kode.toLowerCase() === 'pr',
                    })}
                  />
                  <p>
                    {item?.nama}: {item?.jumlah}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="col-span-6">
        {loading ? (
          <MultiSkeleton />
        ) : (
          <div className="flex flex-col gap-32">
            {DayaTampung?.map((item, idx) => (
              <div className="flex flex-col gap-12" key={idx}>
                <div className="flex items-center gap-12">
                  <div
                    className={clsx('h-[1.6rem] w-[1.6rem] rounded-full', {
                      'bg-[#ff6384]': item?.kode.toLowerCase() === 'zn',
                      'bg-[#36a2eb]': item?.kode.toLowerCase() === 'afr',
                      'bg-[#ffcd56]': item?.kode.toLowerCase() === 'afrd',
                      'bg-[#4bc0c0]': item?.kode.toLowerCase() === 'tr',
                      'bg-[#9966ff]': item?.kode.toLowerCase() === 'pr',
                    })}
                  />
                  <p>
                    {item?.nama}: {item?.jumlah}
                  </p>
                </div>
                <div className="h-[1rem] w-full rounded-full bg-slate-200">
                  <div
                    className={clsx('h-full rounded-full', {
                      'bg-[#ff6384]': item?.kode.toLowerCase() === 'zn',
                      'bg-[#36a2eb]': item?.kode.toLowerCase() === 'afr',
                      'bg-[#ffcd56]': item?.kode.toLowerCase() === 'afrd',
                      'bg-[#4bc0c0]': item?.kode.toLowerCase() === 'tr',
                      'bg-[#9966ff]': item?.kode.toLowerCase() === 'pr',
                    })}
                    style={{
                      width: `${(Number(item?.jumlah) / total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
