import { useEffect, useState } from 'react'
import { useGetDashboardQuery } from '@/store/slices/dashboardAPI'
import { DashboardType } from '@/libs/types/dashboard-type'
import { SingleSkeleton } from '@/components/skeleton'
import { DashboardDayaTampung } from './dashboard-daya-tampung'
import { DashboardVerifikasiData } from './dashboard-verifikaasi-data'
import { DashboardTiket } from './dashboard-ticket'
import { DashboardPendaftar } from './dashboard-pendaftar'

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
      {/* --- Daya Tampung --- */}
      <DashboardDayaTampung />
      {/* --- Pendaftar --- */}
      <DashboardPendaftar dashboard={dashboard} />
      {/* --- Link Info --- */}
      <div className="grid w-full grid-cols-12 gap-32">
        <div className="col-span-6 rounded-2xl bg-white p-32 shadow-md phones:col-span-12">
          <DashboardVerifikasiData />
        </div>
        <div className="col-span-6 rounded-2xl bg-white p-32 shadow-md phones:col-span-12">
          <DashboardTiket />
        </div>
      </div>
    </div>
  )
}
