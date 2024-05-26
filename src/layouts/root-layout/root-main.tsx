import { AlignJustify } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { MainHeader } from './main-header'
import { ModalAside } from './modal-aside'
import { ContentTitle } from './content-title'
import { RunningText } from './running-text'
import { Pemberitahuan } from './pemberitahuan'
import { DashboardType } from '@/libs/types/dashboard-type'
import { useGetDashboardQuery } from '@/store/slices/dashboardAPI'
import dayjs from 'dayjs'
import { SingleSkeleton } from '@/components/skeleton'

export default function RootMain() {
  const [isShow, setIsShow] = useState<boolean>(false)
  // --- Dashboard ---
  const [dashboard, setDashboard] = useState<DashboardType>()
  const { data, isLoading, isFetching } = useGetDashboardQuery()

  useEffect(() => {
    if (data?.data) {
      setDashboard(data?.data)
    }
  }, [data?.data])

  const batasVerifikasi = dayjs(dashboard?.batas_verifikasi)
    .locale('id')
    .format('DD MMMM YYYY HH:mm:ss')
  const tglPengumuman = dayjs(dashboard?.tgl_pengumuman)
    .locale('id')
    .format('DD MMMM YYYY HH:mm:ss')
  const batas_daftar_ulang = dayjs(dashboard?.batas_daftar_ulang)
    .locale('id')
    .format('DD MMMM YYYY HH:mm:ss')

  const isLoadingText = isLoading || isFetching
  const runningText = `Batas Verifikasi: ${batasVerifikasi} • Tanggal Pengumuman: ${tglPengumuman} • Batas Daftar Ulang: ${batas_daftar_ulang}`

  return (
    <main className="scrollbar flex h-screen overflow-auto bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50 text-[2.4rem] text-slate-700 phones:text-[2.8rem]">
      <aside className="scrollbar h-full overflow-auto bg-white p-32 shadow-md phones:hidden">
        <MainHeader />
      </aside>
      <section className="scrollbar h-full w-full flex-1 overflow-auto">
        <div className="flex h-full w-full flex-col items-start justify-start gap-32">
          <div className="hidden w-full phones:block">
            {/* --- Header --- */}
            <div className="flex items-center justify-between gap-32 bg-white p-32 shadow-md">
              <Link to="/">
                <img src="/img/logo.png" alt="PPDB" className="h-[5rem]" />
              </Link>
              <span onClick={() => setIsShow(true)}>
                <AlignJustify size={20} />
              </span>
            </div>
          </div>
          <div className="flex h-full w-full flex-1 flex-col items-start justify-start gap-32 p-32">
            <ContentTitle />
            {isLoadingText ? (
              <SingleSkeleton />
            ) : (
              <div className="flex w-full items-center gap-32 rounded-2xl bg-danger-100 p-16 shadow">
                <Pemberitahuan />
                <RunningText>{runningText}</RunningText>
              </div>
            )}
            <div className="scrollbar flex h-full w-full flex-1 items-start justify-start overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
      <ModalAside setIsOpen={setIsShow} isOpen={isShow} />
    </main>
  )
}
