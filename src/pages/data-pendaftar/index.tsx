import { SingleSkeleton } from '@/components/skeleton'
import { enumJalur } from '@/libs/enum/enum-jalur'
import {
  PageInfoType,
  PendaftarJalur,
  PendaftarType,
} from '@/libs/types/pendaftar-type'
import { useGetDataPendaftarQuery } from '@/store/slices/dataPendaftarAPI'
import clsx from 'clsx'
import { debounce } from 'lodash'
import { Filter, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MappingDataPendaftar } from './mapping-pendaftar'
import { FormListDataPerPage } from '@/components/form/formListDataPerPage'
import { Pagination } from '@/components/Pagination'

export default function DataPendaftar() {
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [jalur, setJalur] = useState<string>('')
  const [isShow, setIsShow] = useState<boolean>(false)

  const handleSearch = debounce((searchValue: string) => {
    setSearch(searchValue)
  }, 300)

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    handleSearch(value)
  }

  const handleClick = () => {
    const inputElement = document.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement
    handleSearch(inputElement.value)
  }

  //   --- Jalur ---
  const [pendaftarMasuk, setPendaftarMasuk] = useState<PendaftarType[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfoType>()
  const [pendaftarJalur, setPendaftarJalur] = useState<PendaftarJalur[]>([])

  const {
    data: getPendaftarMasuk,
    isLoading: isLoadingPendaftarMasuk,
    isFetching: isFetchingPendaftarmasuk,
  } = useGetDataPendaftarQuery({
    jalur: jalur,
    page: page,
    page_size: pageSize,
    search: search,
  })

  useEffect(() => {
    if (getPendaftarMasuk) {
      setPageInfo(getPendaftarMasuk?.page_info)
      setPendaftarJalur(getPendaftarMasuk?.pendaftar_jalur)
      setPendaftarMasuk(getPendaftarMasuk?.data)
    }
  }, [getPendaftarMasuk?.data, jalur, search, page, pageSize])

  const isLoading = isFetchingPendaftarmasuk || isLoadingPendaftarMasuk

  return (
    <div className="flex h-full w-full flex-col gap-32">
      {/* --- Header --- */}
      <div className="flex flex-col gap-24">
        <div className="flex items-center justify-between gap-32">
          {/* --- Filter --- */}
          <div
            onClick={() => setIsShow(!isShow)}
            className="flex items-center gap-12 rounded-lg bg-green-700 px-24 py-12 text-white hover:cursor-pointer"
          >
            <p>Filter</p>
            <Filter size={16} />
          </div>

          {/* --- Search --- */}
          <div className="flex flex-1 justify-end">
            <input
              type="text"
              className="h-1/2 w-4/6 rounded-lg border border-gray-300 p-16 text-[2rem] focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 phones:w-full"
              placeholder="Search"
              onChange={(e) => onSearch(e)}
            />
            <button
              className="bg-green-700 px-12 text-white"
              type="button"
              style={{
                borderTopRightRadius: '1rem',
                borderBottomRightRadius: '1rem',
              }}
              onClick={() => handleClick()}
            >
              <Search size={20} />
            </button>
          </div>
        </div>
        {isShow && (
          <div className="scrollbar flex items-center gap-16 overflow-x-auto">
            <div
              onClick={() => setJalur('')}
              className="rounded-full bg-slate-700 px-16 py-12 text-[2rem] text-white hover:cursor-pointer hover:shadow-lg phones:text-[2.4rem]"
            >
              <p className="text-nowrap">Semua Jalur</p>
            </div>
            {isLoading ? (
              <SingleSkeleton width="w-1/5" />
            ) : (
              <>
                {pendaftarJalur?.map((item, idx) => (
                  <div
                    onClick={() => setJalur(item?.kode)}
                    className={clsx(
                      'rounded-full px-16 py-12 text-[2rem] text-white hover:cursor-pointer hover:shadow-lg phones:text-[2.4rem]',
                      {
                        'bg-gradient-to-br from-indigo-500 via-indigo-400 to-indigo-600':
                          item?.kode === enumJalur.ZONASI,
                        'bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600':
                          item?.kode === enumJalur.PRESTASI,
                        'bg-gradient-to-br from-rose-500 via-rose-400 to-rose-600':
                          item?.kode === enumJalur.AFIRMASI,
                        'via-emerlad-400 bg-gradient-to-br from-emerald-500 to-emerald-600':
                          item?.kode === enumJalur.PINDAHTUGAS,
                        'bg-gradient-to-br from-sky-500 via-sky-400 to-sky-600':
                          item?.kode === enumJalur.DISABILITAS,
                      },
                    )}
                    key={idx}
                  >
                    <p className="text-nowrap">
                      {item?.nama} ({item?.jumlah})
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
      {/* --- Content --- */}
      <div className="h-full w-full flex-1">
        <MappingDataPendaftar loading={isLoading} data={pendaftarMasuk} />
      </div>
      {/* --- Footer --- */}
      <div className="flex items-center justify-end">
        <FormListDataPerPage setDataPerPage={setPageSize} />
        {pendaftarMasuk?.length > 0 && (
          <Pagination
            setPage={setPage}
            pageNow={pageInfo?.current_page ?? 0}
            lastPage={pageInfo?.last_page ?? 0}
          />
        )}
      </div>
    </div>
  )
}
