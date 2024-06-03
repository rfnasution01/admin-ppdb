import Loading from '@/components/Loading'
import { NoData } from '@/components/NoData'
import { TiketSekolahType, TiketType } from '@/libs/types/tiket-type'
import { useGetTiketQuery } from '@/store/slices/pertanyaanAPI'
import { useGetTiketSekolahQuery } from '@/store/slices/tiketSekolahAPI'
import clsx from 'clsx'
import { Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function DashboardTiket() {
  const [listTiket, setListTiket] = useState<TiketType[]>([])
  const [listTiketSekolah, setListTiketSekolah] = useState<TiketSekolahType[]>(
    [],
  )
  const [menu, setMenu] = useState<string>('Siswa')

  const { data, isLoading, isFetching } = useGetTiketQuery({
    page: 1,
    page_size: 5,
    status: -1,
    search: '',
  })
  const loading = isFetching || isLoading

  useEffect(() => {
    if (data) {
      setListTiket(data?.data)
    }
  }, [data])
  const navigate = useNavigate()

  const {
    data: sekolah,
    isLoading: sekolahLoading,
    isFetching: sekolahFetching,
  } = useGetTiketSekolahQuery({
    page: 1,
    page_size: 5,
    status: -1,
    search: '',
    id_masalah: '',
  })
  const loadingSekolah = sekolahFetching || sekolahLoading

  useEffect(() => {
    if (sekolah) {
      setListTiketSekolah(sekolah?.data)
    }
  }, [sekolah])

  return (
    <div className="flex flex-col gap-64">
      <div className="flex justify-between gap-32 text-[#005479]">
        <p className="text-[3.2rem] font-bold">Ticket Terbaru</p>
        {menu === 'Siswa' ? (
          <Link
            to="/pertanyaan-siswat"
            className="underline hover:text-primary"
          >
            Lihat Semua
          </Link>
        ) : (
          <Link
            to="/pertanyaan-siswa/sekolah"
            className="underline hover:text-primary"
          >
            Lihat Semua
          </Link>
        )}
      </div>
      {/* --- Data --- */}
      <div className="flex flex-col gap-32">
        <div className="flex">
          <div className="flex items-center gap-32">
            {['Siswa', 'Admin'].map((item, idx) => (
              <div
                className={clsx(
                  'border-b pb-8 hover:cursor-pointer hover:text-[#005479]',
                  {
                    ' border-[#005479] text-[#005479]': item === menu,
                    ' border-transparent': item !== menu,
                  },
                )}
                key={idx}
                onClick={() => {
                  setMenu(item)
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        {menu === 'Siswa' ? (
          loading ? (
            <Loading />
          ) : listTiket?.length > 0 ? (
            <div className="flex flex-col">
              {listTiket?.slice(0, 5).map((item, idx) => (
                <div
                  className="flex items-center gap-32 border-b border-[#e0e4e5] py-24 hover:cursor-pointer hover:bg-yellow-50"
                  key={idx}
                  onClick={() => {
                    navigate(`/pertanyaan-siswa?detail=${item?.id}`)
                  }}
                >
                  <div className="limited-text-2-lines flex-1 overflow-hidden">
                    <div
                      dangerouslySetInnerHTML={{ __html: item?.keterangan }}
                    />
                  </div>
                  <span className="rounded-2xl bg-yellow-500 p-8 text-white">
                    <Mail size={16} />
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <NoData />
          )
        ) : loadingSekolah ? (
          <Loading />
        ) : listTiketSekolah?.length > 0 ? (
          <div className="flex flex-col">
            {listTiketSekolah?.slice(0, 5).map((item, idx) => (
              <div
                className="flex items-center gap-32 border-b border-[#e0e4e5] py-24 hover:cursor-pointer hover:bg-yellow-50"
                key={idx}
                onClick={() => {
                  navigate(`/pertanyaan-siswa?detail=${item?.id}`)
                }}
              >
                <div className="limited-text-2-lines flex-1 overflow-hidden">
                  <div dangerouslySetInnerHTML={{ __html: item?.keterangan }} />
                </div>
                <span className="rounded-2xl bg-yellow-500 p-8 text-white">
                  <Mail size={16} />
                </span>
              </div>
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  )
}
