import { hasilFilterSchema } from '@/libs/schema/hasil-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { HasilHeader } from './hasil-header'
import {
  Award,
  Box,
  Download,
  Printer,
  RefreshCcw,
  Search,
  TriangleAlert,
  User,
} from 'lucide-react'
import { FormListLulus } from '@/components/form/formListLulus'
import { Form } from '@/components/Form'
import { FormListJalurMasuk } from '@/components/form/formListJalurMasuk'
import { FormListGelombang } from '@/components/form/formListGelombang'
import { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import Tooltips from '@/components/Tooltip'
import { DashboardType } from '@/libs/types/dashboard-type'
import { useGetDashboardQuery } from '@/store/slices/dashboardAPI'
import dayjs from 'dayjs'
import { useGetTiketNotifikasiQuery } from '@/store/slices/pertanyaanAPI'
import { ModalValidasi } from '@/layouts/root-layout/modal-validasi'
import { PendaftarType } from '@/libs/types/pendaftar-type'
import { useGetDataPendaftarQuery } from '@/store/slices/dataPendaftarAPI'
import ExportCSV from '@/components/ExportCSV'
import { PrintHasil } from '@/components/PrintHasil'

export default function HasilPPDB() {
  const form = useForm<zod.infer<typeof hasilFilterSchema>>({
    resolver: zodResolver(hasilFilterSchema),
    defaultValues: {},
  })

  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)

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

  console.log({ search })
  console.log({ page })

  // --- Dashboard ---
  const [dashboard, setDashboard] = useState<DashboardType>()
  const { data } = useGetDashboardQuery()

  useEffect(() => {
    if (data?.data) {
      setDashboard(data?.data)
    }
  }, [data?.data])

  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const { data: notifData } = useGetTiketNotifikasiQuery()

  useEffect(() => {
    if (notifData?.jlh > 0) {
      setIsShowModal(true)
    }
  }, [notifData])

  //   --- Jalur ---
  const [pendaftarMasuk, setPendaftarMasuk] = useState<PendaftarType[]>([])

  const { data: getPendaftarMasuk } = useGetDataPendaftarQuery({
    jalur: '',
    page: 1,
    page_size: 1000,
    search: '',
    verifikasi: 0,
  })

  useEffect(() => {
    if (getPendaftarMasuk) {
      setPendaftarMasuk(getPendaftarMasuk?.data)
    }
  }, [getPendaftarMasuk?.data])

  return (
    <div className="flex h-full w-full flex-col gap-32">
      {/* --- Header --- */}
      <div className="flex rounded-2xl border border-[#e0e4e5] bg-white p-32 shadow phones:flex-col phones:items-start">
        <HasilHeader
          value="Daya Tampung"
          label={dashboard?.lulus?.daya_tampung?.toString()}
          icon={<Box />}
          isBorder
        />
        <HasilHeader value="Lulus" label="-" icon={<Award />} isBorder />
        <HasilHeader value="Kekurangan" label="-" icon={<User />} />
      </div>
      {/* --- Filter --- */}
      <div className="flex items-center justify-between gap-32">
        <Form {...form}>
          <form className="flex h-full w-full gap-48 phones:flex-col phones:items-start phones:gap-24">
            <div className="flex w-full flex-1 gap-32">
              <div className="flex w-full">
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
              <div className="hidden phones:block">
                <div className="flex items-center gap-24">
                  <button
                    type="button"
                    className="flex items-center gap-12 rounded-2xl border border-primary p-16 text-primary hover:cursor-pointer hover:bg-primary hover:text-white"
                  >
                    <Tooltips
                      triggerComponent={<RefreshCcw size={16} />}
                      tooltipContent={<span>Refresh</span>}
                    />
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-12 rounded-2xl border border-primary p-16 text-primary hover:cursor-pointer hover:bg-primary hover:text-white"
                  >
                    <Tooltips
                      triggerComponent={<Download size={16} />}
                      tooltipContent={<span>Unduh Excel</span>}
                    />
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-12 rounded-2xl border border-primary p-16 text-primary hover:cursor-pointer hover:bg-primary hover:text-white"
                  >
                    <Tooltips
                      triggerComponent={<Printer size={16} />}
                      tooltipContent={<span>Cetak</span>}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-1 gap-24">
              <FormListJalurMasuk
                name="jalur"
                placeholder="Jalur"
                useFormReturn={form}
              />
              <FormListGelombang
                name="gelombang"
                placeholder="Gelombang"
                useFormReturn={form}
              />
              <FormListLulus name="lulus" placeholder="Status" form={form} />
              <div className="block phones:hidden">
                <div className="flex items-center gap-24">
                  <button
                    type="button"
                    className="flex items-center gap-12 rounded-2xl border border-primary p-16 text-primary hover:cursor-pointer hover:bg-primary hover:text-white"
                  >
                    <Tooltips
                      triggerComponent={<RefreshCcw size={16} />}
                      tooltipContent={<span>Refresh</span>}
                    />
                  </button>
                  <ExportCSV csvData={pendaftarMasuk} />
                  <PrintHasil profil={pendaftarMasuk} />
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>

      <div className="flex items-center justify-center gap-12 rounded-2xl bg-danger-100 p-32 text-danger-tint-1 shadow-md">
        <TriangleAlert size={16} />
        <p className="text-center">
          Hasil PPDB akan diumumkan pada tanggal{' '}
          {dayjs(dashboard?.tgl_pengumuman)
            .locale('id')
            .format('DD MMMM YYYY HH:mm:ss')}
        </p>
      </div>
      <ModalValidasi isOpen={isShowModal} setIsOpen={setIsShowModal} />
    </div>
  )
}
