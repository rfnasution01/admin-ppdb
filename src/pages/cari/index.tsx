import { Pagination } from '@/components/Pagination'
import { Table } from '@/components/Table'
import { FormListDataPerPage } from '@/components/form/formListDataPerPage'
import { ModalValidasi } from '@/layouts/root-layout/modal-validasi'
import { columnsCari } from '@/libs/dummy/table'
import { PageInfoType } from '@/libs/types/pendaftar-type'
import { useGetNISNQuery } from '@/store/slices/dataPendaftarAPI'
import { useGetTiketNotifikasiQuery } from '@/store/slices/pertanyaanAPI'
import { debounce } from 'lodash'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function CariSiswa() {
  const [siswa, setSiswa] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [pageInfo, setPageInfo] = useState<PageInfoType>()

  const { data, isLoading, isFetching } = useGetNISNQuery({
    page: page,
    page_size: pageSize,
    search: search,
  })

  useEffect(() => {
    if (data) {
      setSiswa(data?.data)
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

  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const { data: notifData } = useGetTiketNotifikasiQuery()

  useEffect(() => {
    if (notifData?.jlh > 0) {
      setIsShowModal(true)
    }
  }, [notifData])

  return (
    <div className="flex h-full w-full flex-col gap-32">
      {/* --- Header --- */}
      <div className="flex flex-col gap-24">
        <div className="flex items-center justify-end gap-32">
          {/* --- Search --- */}
          <div className="flex w-1/2 justify-end">
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
      </div>
      {/* --- Content --- */}
      <div className="scrollbar h-full w-full flex-1 overflow-auto">
        <Table
          data={siswa}
          columns={columnsCari}
          containerClasses="w-full"
          loading={isLoading || isFetching}
          isNo
          page={page}
          pageSize={pageSize}
        />
      </div>
      {/* --- Footer --- */}
      <div className="flex items-center justify-end">
        <FormListDataPerPage setDataPerPage={setPageSize} />
        {siswa?.length > 0 && (
          <Pagination
            setPage={setPage}
            pageNow={pageInfo?.current_page ?? 0}
            lastPage={pageInfo?.last_page ?? 0}
          />
        )}
      </div>
      <ModalValidasi isOpen={isShowModal} setIsOpen={setIsShowModal} />
    </div>
  )
}
