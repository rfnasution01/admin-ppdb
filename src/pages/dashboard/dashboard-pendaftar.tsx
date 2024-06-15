import { DashboardType } from '@/libs/types/dashboard-type'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { StatistikPendaftar } from './statistik-pendaftar'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { getIdGelombangSlice } from '@/store/reducer/stateIdGelombang'
import { useEffect, useState } from 'react'

export function DashboardPendaftar({
  dashboard,
}: {
  dashboard: DashboardType
}) {
  const stateId = useSelector(getIdGelombangSlice)?.id

  useEffect(() => {
    if (stateId) {
      setId(stateId)
    }
  }, [stateId])

  const idGelombang = Cookies.get('idGelombang') ?? ''

  const [id, setId] = useState<string>(idGelombang ?? stateId ?? null)

  const gelombangNow = dashboard?.gelombang?.find((item) => item?.id === id)

  return (
    <div className="flex w-full flex-col gap-48 rounded-2xl bg-white p-32 shadow-md">
      <div className="flex items-center justify-between gap-32 phones:flex-col phones:items-start">
        {dashboard?.gelombang?.map((item, idx) => (
          <div className="w-full" key={idx}>
            <div className="flex items-center justify-between phones:w-full phones:flex-col phones:items-start">
              <p>
                Masa Pendaftaran {item?.nama}:{' '}
                {dayjs(item?.tgl_awal_daftar).locale('id').format('DD MMMM')} -{' '}
                {dayjs(item?.tgl_akhir_daftar)
                  .locale('id')
                  .format('DD MMMM YYYY')}
              </p>
            </div>
          </div>
        ))}
        <Link
          to="/data-pendaftar"
          className="text-nowrap underline hover:text-primary"
        >
          Lihat Data Pendaftar
        </Link>
      </div>
      {/* --- Data --- */}
      <div className="flex phones:flex-col">
        {/* --- Gelombang --- */}
        <Link
          to="/pendaftar"
          className="flex flex-1 gap-32 border-r border-[#e0e4e5] p-32 text-slate-500"
        >
          <StatistikPendaftar
            jsonData={[
              {
                nama: 'Divalidasi',
                jumlah: gelombangNow?.validasi,
              },
              {
                nama: 'Belum Divalidasi',
                jumlah: gelombangNow?.pendaftar - gelombangNow?.validasi,
              },
            ]}
          />
          <div className="flex flex-col gap-8">
            <p className="text-[4rem] font-bold text-[#005479]">
              Validasi Siswa
            </p>
            <p>
              <span className="text-[4rem] font-bold text-[#005479]">
                {gelombangNow?.validasi}
              </span>{' '}
              / {gelombangNow?.pendaftar} Pendaftar
            </p>
          </div>
        </Link>
        {/* --- Pendaftar --- */}
        <Link
          to="/data-pendaftar"
          className="flex flex-1 gap-32 border-r border-[#e0e4e5] p-32 text-slate-500"
        >
          <StatistikPendaftar
            jsonData={[
              {
                nama: 'Diverfikasi',
                jumlah: gelombangNow?.diverifikasi,
              },
              {
                nama: 'Validasi',
                jumlah: gelombangNow?.belum_diverifikasi,
              },
            ]}
          />
          <div className="flex flex-col gap-8">
            <p className="text-[4rem] font-bold text-[#005479]">Diverifikasi</p>
            <p>
              <span className="text-[4rem] font-bold text-[#005479]">
                {gelombangNow?.diverifikasi}
              </span>{' '}
              / {gelombangNow?.validasi} Pendaftar
            </p>
          </div>
        </Link>
        {/* --- Lulus --- */}
        <Link
          to="/hasil-ppdb"
          className="flex flex-1 gap-32 border-r border-[#e0e4e5] p-32 text-slate-500"
        >
          <StatistikPendaftar
            jsonData={[
              { nama: 'Lulus', jumlah: dashboard?.lulus?.lulus },
              {
                nama: 'Tidak Lulus',
                jumlah:
                  dashboard?.lulus?.daya_tampung - dashboard?.lulus?.lulus,
              },
            ]}
          />
          <div className="flex flex-col gap-8">
            <p className="text-[4rem] font-bold text-[#005479]">Lulus</p>
            <p>
              <span className="text-[4rem] font-bold text-[#005479]">
                {dashboard?.lulus?.lulus}
              </span>{' '}
              / {dashboard?.lulus?.daya_tampung} Daya Tampung
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
