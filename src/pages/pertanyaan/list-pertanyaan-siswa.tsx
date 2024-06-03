import { TiketType } from '@/libs/types/tiket-type'
import { useGetTiketQuery } from '@/store/slices/pertanyaanAPI'
import clsx from 'clsx'
import { debounce } from 'lodash'
import { Home, ListFilter, RefreshCcw, Search } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { MappingListTiket } from './mapping-list-tiket'
import { MultiSkeleton } from '@/components/skeleton'
import { FormListDataPerPage } from '@/components/form/formListDataPerPage'
import { Pagination } from '@/components/Pagination'
import { PageInfoType } from '@/libs/types/pendaftar-type'
import { NoData } from '@/components/NoData'
import Tooltips from '@/components/Tooltip'
import { useNavigate } from 'react-router-dom'

export function ListPertanyaanSiswa({
  name,
  setName,
}: {
  name: string
  setName: Dispatch<SetStateAction<string>>
}) {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [status, setStatus] = useState<number>(null)
  const [search, setSearch] = useState<string>('')
  const [listTiket, setListTiket] = useState<TiketType[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfoType>()

  const { data, isLoading, isFetching, refetch } = useGetTiketQuery({
    page: page,
    page_size: pageSize,
    status: status ?? -1,
    search: search,
  })
  const loading = isFetching || isLoading

  useEffect(() => {
    if (data) {
      setListTiket(data?.data)
      setPageInfo(data?.page_info)
    }
  }, [data])

  const [isShow, setIsShow] = useState<boolean>(false)
  const handleSearch = debounce((searchValue: string) => {
    setPage(1)
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

  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col gap-32 rounded-2xl bg-white p-32">
      {/* --- Filter --- */}
      <div className="flex flex-col gap-16">
        <div className="flex items-center gap-16">
          {/* --- Search --- */}
          <div className="flex w-full flex-1">
            <input
              type="text"
              className="w-full border border-gray-300 p-16 text-[2rem] focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 phones:w-full"
              style={{
                borderTopLeftRadius: '1rem',
                borderBottomLeftRadius: '1rem',
              }}
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
          <div
            onClick={() => setIsShow(!isShow)}
            className="rounded-2xl border border-primary p-16 text-primary hover:cursor-pointer hover:bg-primary hover:text-white"
          >
            <Tooltips
              triggerComponent={<ListFilter size={16} />}
              tooltipContent={<span>Filter</span>}
            />
          </div>

          <div
            onClick={refetch}
            className="rounded-2xl border border-primary p-16 text-primary hover:cursor-pointer hover:bg-primary hover:text-white"
          >
            <Tooltips
              triggerComponent={<RefreshCcw size={16} />}
              tooltipContent={<span>Perbarui</span>}
            />
          </div>
          <div
            onClick={() => {
              navigate(`/pertanyaan-siswa/sekolah`)
            }}
            className="rounded-2xl border border-primary p-16 text-primary hover:cursor-pointer hover:bg-primary hover:text-white"
          >
            <Tooltips
              triggerComponent={<Home size={16} />}
              tooltipContent={<span>Ticket Sekolah</span>}
            />
          </div>
        </div>
        {isShow && (
          <div className="flex items-center gap-16">
            {['Semua', 'Menunggu', 'Berlangsung', 'Selesai'].map(
              (item, idx) => (
                <div
                  className={clsx(
                    'text-nowrap rounded-full px-24 py-12 text-[1.6rem] hover:cursor-pointer',
                    {
                      'bg-red-300 text-red-700': item === 'Semua',
                      'bg-blue-300 text-blue-700': item === 'Menunggu',
                      'bg-orange-300 text-orange-700': item === 'Berlangsung',
                      'bg-green-300 text-green-700': item === 'Selesai',
                    },
                  )}
                  key={idx}
                  onClick={() => {
                    switch (item) {
                      case 'Menunggu':
                        setStatus(0)
                        break
                      case 'Berlangsung':
                        setStatus(1)
                        break
                      case 'Selesai':
                        setStatus(2)
                        break
                      default:
                        setStatus(null)
                        break
                    }
                  }}
                >
                  {item}
                </div>
              ),
            )}
          </div>
        )}
      </div>
      {/* --- Mapping --- */}
      <div className="scrollbar h-full w-full flex-1 overflow-y-auto">
        {loading ? (
          <MultiSkeleton />
        ) : listTiket ? (
          listTiket?.length === 0 ? (
            <NoData />
          ) : (
            <MappingListTiket item={listTiket} name={name} setName={setName} />
          )
        ) : (
          ''
        )}
      </div>

      {/* --- Footer --- */}
      {listTiket?.length > 0 && (
        <div className="flex items-center justify-end">
          <FormListDataPerPage setDataPerPage={setPageSize} />
          <Pagination
            setPage={setPage}
            pageNow={pageInfo?.current_page ?? 0}
            lastPage={pageInfo?.last_page ?? 0}
          />
        </div>
      )}
    </div>
  )
}
