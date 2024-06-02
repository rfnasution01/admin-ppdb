import { debounce } from 'lodash'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { TiketSekolahHeader } from './ticket-sekolah-header'
import { useGetTiketSekolahQuery } from '@/store/slices/tiketSekolahAPI'
import Tooltips from '@/components/Tooltip'
import { RefreshCcw } from 'lucide-react'
import { MultiSkeleton } from '@/components/skeleton'
import { TiketSekolahType } from '@/libs/types/tiket-type'
import { MappingListTiket } from './mapping-list-tiket'
import { NoData } from '@/components/NoData'
import { FormListDataPerPage } from '@/components/form/formListDataPerPage'
import { Pagination } from '@/components/Pagination'
import { PageInfoType } from '@/libs/types/pendaftar-type'

export function TiketSekolahMain({
  name,
  setName,
  setSiswa,
  setId,
}: {
  name: string
  setName: Dispatch<SetStateAction<string>>
  setSiswa: Dispatch<SetStateAction<number>>
  setId: Dispatch<SetStateAction<string>>
}) {
  const [search, setSearch] = useState<string>('')
  const [idMasalah, setIdMasalah] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [pageInfo, setPageInfo] = useState<PageInfoType>()
  const [status, setStatus] = useState<number>(null)
  const [listTiket, setListTiket] = useState<TiketSekolahType[]>([])

  // --- Tiket Sekolah ---
  const { data, isLoading, isFetching, refetch } = useGetTiketSekolahQuery({
    status: status ?? -1,
    search: search,
    page: page,
    page_size: pageSize,
    id_masalah: idMasalah,
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setListTiket(data?.data)
      setPageInfo(data?.page_info)
    }
  }, [data])

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

  return (
    <div className="flex h-full w-full flex-col gap-32">
      {/* --- Filter --- */}
      <TiketSekolahHeader
        handleClick={handleClick}
        onSearch={onSearch}
        setName={setName}
        setStatus={setStatus}
        setIdMasalah={setIdMasalah}
        setSiswa={setSiswa}
        refetch={
          <div
            onClick={refetch}
            className="rounded-2xl border border-primary p-16 text-primary hover:cursor-pointer hover:bg-primary hover:text-white"
          >
            <Tooltips
              triggerComponent={<RefreshCcw size={16} />}
              tooltipContent={<span>Perbarui</span>}
            />
          </div>
        }
      />
      {/* --- Mapping Data --- */}
      <div className="h-full flex-1 overflow-y-auto">
        {loading ? (
          <MultiSkeleton />
        ) : listTiket?.length > 0 ? (
          <MappingListTiket
            name={name}
            setName={setName}
            item={listTiket}
            setId={setId}
          />
        ) : (
          <NoData />
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
