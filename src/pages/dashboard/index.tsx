import { useEffect, useState } from 'react'
import { MappingGelombang } from './mapping-gelombang'
import { useGetDashboardQuery } from '@/store/slices/dashboardAPI'
import { DashboardType } from '@/libs/types/dashboard-type'
import { MultiSkeleton, SingleSkeleton } from '@/components/skeleton'
import dayjs from 'dayjs'

export default function Dashboard() {
  // --- Dashboard ---
  const [dashboard, setDashboard] = useState<DashboardType>()
  const { data, isLoading, isFetching } = useGetDashboardQuery()

  useEffect(() => {
    if (data?.data) {
      setDashboard(data?.data)
    }
  }, [data?.data])

  const loading = isFetching || isLoading

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-32 text-left">
      {/* --- Quotes --- */}
      {loading ? (
        <SingleSkeleton />
      ) : (
        <div className="flex w-full flex-col gap-y-16 rounded-2xl border-l-4 border-danger-100 bg-white p-24 shadow-md">
          <p className="font-mono">{dashboard?.kata_bijak?.isi ?? '-'}</p>
          <p className="font-nunito text-danger-100">
            ~~~ {dashboard?.kata_bijak?.pengarang ?? '-'} ~~~
          </p>
        </div>
      )}
      {/* --- Gelombang --- */}
      {dashboard?.gelombang?.map((item, idx) => (
        <div className="w-full" key={idx}>
          <div className="flex w-5/12 items-center justify-between phones:w-full">
            <p>Masa Pendaftaran {item?.nama}</p>
            <p>
              {dayjs(item?.tgl_awal_daftar).locale('id').format('DD MMMM')} -{' '}
              {dayjs(item?.tgl_akhir_daftar)
                .locale('id')
                .format('DD MMMM YYYY')}
            </p>
          </div>
        </div>
      ))}
      {loading ? (
        <div className="w-1/3 phones:w-full">
          <MultiSkeleton />
        </div>
      ) : (
        <MappingGelombang data={dashboard} />
      )}
    </div>
  )
}
