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
  TriangleAlert,
  User,
} from 'lucide-react'
import { FormListLulus } from '@/components/form/formListLulus'
import { Form } from '@/components/Form'
import { FormListJalurMasuk } from '@/components/form/formListJalurMasuk'
import { FormListGelombang } from '@/components/form/formListGelombang'
import { useEffect, useState } from 'react'
import Tooltips from '@/components/Tooltip'
import { DashboardType } from '@/libs/types/dashboard-type'
import { useGetDashboardQuery } from '@/store/slices/dashboardAPI'
import dayjs from 'dayjs'
import { useGetTiketNotifikasiQuery } from '@/store/slices/pertanyaanAPI'
import { ModalValidasi } from '@/layouts/root-layout/modal-validasi'
import ExportCSV from '@/components/ExportCSV'
import { columnsLulus } from '@/libs/dummy/table'
import { useGetHasilQuery } from '@/store/slices/hasilAPI'
import { HasilType } from '@/libs/types/hasil-type'
import { Table } from '@/components/Table'
import { PrintHasil } from '@/components/PrintHasil'

export default function HasilPPDB() {
  const form = useForm<zod.infer<typeof hasilFilterSchema>>({
    resolver: zodResolver(hasilFilterSchema),
    defaultValues: {},
  })

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

  //   --- Hasil ---
  const [hasil, setHasil] = useState<HasilType>()
  const jalur = form.watch('jalur')

  const { data: getHasil } = useGetHasilQuery({
    jalur: jalur,
  })

  useEffect(() => {
    if (getHasil) {
      setHasil(getHasil?.data)
    }
  }, [getHasil?.data, jalur])

  const lulus = form.watch('lulus')

  const showSemua = [...(hasil?.lulus || []), ...(hasil?.tidak_lulus || [])]

  const dataShow =
    lulus === undefined || lulus === 'semua'
      ? showSemua
      : lulus === 'lulus'
        ? hasil?.lulus
        : hasil?.tidak_lulus

  return (
    <div className="flex h-full w-full flex-col gap-32">
      {/* --- Header --- */}
      <div className="flex rounded-2xl border border-[#e0e4e5] bg-white p-32 shadow phones:flex-col phones:items-start">
        <HasilHeader
          value="Daya Tampung"
          label={hasil?.daya_tampung}
          icon={<Box />}
          isBorder
        />
        <HasilHeader
          value="Lulus"
          label={hasil?.jumlah_lulus}
          icon={<Award />}
          isBorder
        />
        <HasilHeader
          value="Kekurangan"
          label={hasil?.kekurangan}
          icon={<User />}
        />
      </div>
      {/* --- Filter --- */}
      <div className="flex items-center justify-between gap-32">
        <Form {...form}>
          <form className="flex h-full w-full gap-48 phones:flex-col phones:items-start phones:gap-24">
            <div className="flex w-full flex-1 gap-32">
              <div className="hidden phones:block">
                <div className="flex items-center gap-24">
                  <button
                    type="button"
                    className="flex items-center gap-12 rounded-2xl border border-[#005479] p-16 text-[#005479] hover:cursor-pointer hover:bg-[#005479] hover:text-white"
                  >
                    <Tooltips
                      triggerComponent={<RefreshCcw size={16} />}
                      tooltipContent={<span>Refresh</span>}
                    />
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-12 rounded-2xl border border-[#005479] p-16 text-[#005479] hover:cursor-pointer hover:bg-[#005479] hover:text-white"
                  >
                    <Tooltips
                      triggerComponent={<Download size={16} />}
                      tooltipContent={<span>Unduh Excel</span>}
                    />
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-12 rounded-2xl border border-[#005479] p-16 text-[#005479] hover:cursor-pointer hover:bg-[#005479] hover:text-white"
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
                    className="flex items-center gap-12 rounded-2xl border border-[#005479] p-16 text-[#005479] hover:cursor-pointer hover:bg-[#005479] hover:text-white"
                  >
                    <Tooltips
                      triggerComponent={<RefreshCcw size={16} />}
                      tooltipContent={<span>Refresh</span>}
                    />
                  </button>
                  <ExportCSV csvData={dataShow} />
                  <PrintHasil
                    profil={showSemua}
                    sekolah={hasil?.nama_sekolah}
                    alamat={hasil?.alamat_sekolah}
                    diterbitkan_di={hasil?.tempat}
                    diterbitkan_tgl={dayjs(hasil?.tanggal)
                      .locale('id')
                      .format('DD MMMM YYYY')}
                    kepsek={hasil?.nama_kepsek}
                    nip_kepsek={hasil?.nip_kepsek}
                  />
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>

      {dataShow?.length > 0 ? (
        <>
          {/* --- Content --- */}
          <div className="scrollbar h-full w-full flex-1 overflow-auto">
            <Table
              data={dataShow}
              columns={columnsLulus}
              containerClasses="w-full"
              loading={false}
              isNo
              page={1}
              pageSize={1000}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center gap-12 rounded-2xl bg-danger-100 p-32 text-danger-tint-1 shadow-md">
          <TriangleAlert size={16} />
          <p className="text-center">
            Hasil PPDB akan diumumkan pada tanggal{' '}
            {dayjs(dashboard?.tgl_pengumuman)
              .locale('id')
              .format('DD MMMM YYYY HH:mm:ss')}
          </p>
        </div>
      )}

      <ModalValidasi isOpen={isShowModal} setIsOpen={setIsShowModal} />
    </div>
  )
}
