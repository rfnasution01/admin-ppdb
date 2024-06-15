import {
  daftarUlangSchema,
  saveDaftarUlangSchema,
} from '@/libs/schema/hasil-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { Award, CheckCircle, Loader2, Search, XCircle } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import { FormListJalurMasuk } from '@/components/form/formListJalurMasuk'
import { useEffect, useState } from 'react'
import { useGetTiketNotifikasiQuery } from '@/store/slices/pertanyaanAPI'
import { ModalValidasi } from '@/layouts/root-layout/modal-validasi'
import { debounce } from 'lodash'
import {
  useCreateDaftarUlangMutation,
  useGetDaftarulangQuery,
} from '@/store/slices/daftarUlangAPI'
import { DaftarUlangType } from '@/libs/types/daftar-ulang-type'
import Loading from '@/components/Loading'
import { NoData } from '@/components/NoData'
import { HasilHeader } from '../hasil/hasil-header'
import { columnsDaftarUlang } from '@/libs/dummy/table'
import { FormListStatus } from '@/components/form/formListStatus'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TableDaftarUlang } from '@/components/TableDaftarUlang'
import { ModalValidasiDaftarUlang } from './modal-validasi'
import dayjs from 'dayjs'
import { Input } from '@/components/input'

export default function DaptarUlang() {
  const form = useForm<zod.infer<typeof daftarUlangSchema>>({
    resolver: zodResolver(daftarUlangSchema),
    defaultValues: {},
  })

  const formSaveDaftarUlang = useForm<zod.infer<typeof saveDaftarUlangSchema>>({
    resolver: zodResolver(saveDaftarUlangSchema),
    defaultValues: {},
  })

  const [search, setSearch] = useState<string>('')
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [isShowModalDaftar, setIsShowModalDaftar] = useState<boolean>(false)
  const { data: notifData } = useGetTiketNotifikasiQuery()

  useEffect(() => {
    if (notifData?.jlh > 0) {
      setIsShowModal(true)
    }
  }, [notifData])

  //   --- DaftarUlang ---
  const [daftarUlang, setDaftarUlang] = useState<DaftarUlangType>()
  const jalur = form.watch('jalur')
  const status = form.watch('status')

  const {
    data: getDaftarUlang,
    isLoading,
    isFetching,
  } = useGetDaftarulangQuery({
    jalur: jalur ?? '',
    search: search ?? '',
    status: status ?? -1,
  })

  useEffect(() => {
    if (getDaftarUlang) {
      setDaftarUlang(getDaftarUlang?.data)
    }
  }, [getDaftarUlang?.data, jalur, status])

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

  const [listIdSelect, setListIdSelect] = useState<string[]>([])

  const [
    createDaftarUlang,
    {
      isError: isErrorDaftarUlang,
      error: errorDaftarUlang,
      isLoading: isLoadingDaftarUlang,
      isSuccess: isSuccessDaftarUlang,
    },
  ] = useCreateDaftarUlangMutation()

  const handleSubmit = async (values) => {
    const body = {
      nompes: listIdSelect,
      tanggal: `${values?.tanggal ? `${values?.tanggal} ${values?.jam}:00` : dayjs().toISOString()}`,
    }

    try {
      await createDaftarUlang({ data: body })
    } catch (error) {
      console.error('Gagal mengunggah file:', error)
    }
  }

  useEffect(() => {
    if (isSuccessDaftarUlang) {
      toast.success('Tiket berhasil dibuat!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setTimeout(() => {
        form.reset()
        setIsShowModalDaftar(false)
        setListIdSelect([])
      }, 2000)
    }
  }, [isSuccessDaftarUlang])

  useEffect(() => {
    if (isErrorDaftarUlang) {
      const errorMsg = errorDaftarUlang as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [isErrorDaftarUlang, errorDaftarUlang])

  return (
    <div className="flex h-full w-full flex-col gap-32">
      {/* --- Header --- */}
      <div className="flex rounded-2xl border border-[#e0e4e5] bg-white p-32 shadow phones:flex-col phones:items-start">
        <HasilHeader
          value="Jumlah Lulus"
          label={daftarUlang?.jumlah_lulus}
          icon={<Award />}
          isBorder
        />
        <HasilHeader
          value="Sudah Registrasi"
          label={daftarUlang?.sudah_registrasi}
          icon={<CheckCircle />}
          isBorder
        />
        <HasilHeader
          value="Belum Registrasi"
          label={daftarUlang?.belum_registrasi}
          icon={<XCircle />}
        />
      </div>
      {/* --- Filter --- */}
      <div className="flex items-center justify-between gap-32">
        <Form {...form}>
          <form className="flex h-full w-full gap-48 phones:flex-col phones:items-start phones:gap-24">
            {/* --- Search --- */}
            <div className="flex w-1/2 phones:w-full">
              <input
                type="text"
                className="h-full w-full rounded-lg border border-gray-300 p-16 text-[2rem] focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 phones:w-full"
                placeholder="Search"
                onChange={(e) => onSearch(e)}
              />
              <button
                className="bg-[#005479] px-12 text-white"
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
            <div className="flex w-1/2 gap-24 phones:w-full">
              <FormListJalurMasuk
                name="jalur"
                placeholder="Jalur"
                useFormReturn={form}
              />

              <FormListStatus name="status" placeholder="Status" form={form} />
            </div>
          </form>
        </Form>
      </div>

      {isLoading || isFetching ? (
        <Loading />
      ) : daftarUlang?.siswa?.length > 0 ? (
        <div className="flex w-full flex-col gap-32">
          <TableDaftarUlang
            data={daftarUlang?.siswa}
            columns={columnsDaftarUlang}
            containerClasses="w-full"
            loading={false}
            isNo
            page={1}
            pageSize={1000}
            isSelect
            dataRow={listIdSelect}
            setDataRow={setListIdSelect}
          />
          <div className="flex justify-end">
            <div className="flex flex-col gap-24">
              Anda memilih {listIdSelect?.length ?? 0} peserta
              <button
                type="button"
                onClick={() => setIsShowModalDaftar(true)}
                className="rounded-lg bg-green-700 px-24 py-12 text-[2rem] text-green-100 hover:bg-green-900"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      ) : (
        <NoData />
      )}

      <ModalValidasi isOpen={isShowModal} setIsOpen={setIsShowModal} />
      <ModalValidasiDaftarUlang
        isOpen={isShowModalDaftar}
        setIsOpen={setIsShowModalDaftar}
      >
        <Form {...formSaveDaftarUlang}>
          <form
            className="flex flex-col gap-32"
            onSubmit={formSaveDaftarUlang.handleSubmit(handleSubmit)}
          >
            <div className="flex items-center gap-32">
              <FormField
                name="tanggal"
                control={formSaveDaftarUlang.control}
                render={({ field }) => (
                  <FormItem
                    className={`flex w-full items-center gap-32 text-[2rem] phones:w-full phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]`}
                  >
                    <div className="w-1/6 text-left phones:w-full phones:text-left">
                      <FormLabel>Tanggal</FormLabel>
                    </div>
                    <div className={`w-full`}>
                      <FormControl>
                        <Input
                          {...field}
                          className={`w-full disabled:cursor-not-allowed phones:w-full`}
                          placeholder={dayjs().toISOString()}
                          type="date"
                          disabled={isLoadingDaftarUlang}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="jam"
                control={formSaveDaftarUlang.control}
                render={({ field }) => (
                  <FormItem
                    className={`flex w-full items-center gap-32 text-[2rem] phones:w-full phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]`}
                  >
                    <div className="w-1/6 text-left phones:w-full phones:text-left">
                      <FormLabel>Jam</FormLabel>
                    </div>
                    <div className={`w-full`}>
                      <FormControl>
                        <Input
                          {...field}
                          className={`w-full disabled:cursor-not-allowed phones:w-full`}
                          placeholder={dayjs().toISOString()}
                          type="time"
                          disabled={isLoadingDaftarUlang}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-32">
              <button
                type="button"
                disabled={isLoadingDaftarUlang}
                onClick={() => setIsShowModalDaftar(false)}
                className="rounded-lg bg-red-700 px-24 py-12 text-[2rem] text-red-100 hover:bg-red-900"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoadingDaftarUlang}
                className="flex items-center gap-12 rounded-lg bg-green-700 px-24 py-12 text-[2rem] text-green-100 hover:bg-green-900 disabled:cursor-not-allowed"
              >
                {isLoadingDaftarUlang && (
                  <span className="animate-spin duration-300">
                    <Loader2 size={16} />
                  </span>
                )}
                Simpan
              </button>
            </div>
          </form>
        </Form>
      </ModalValidasiDaftarUlang>
      <ToastContainer />
    </div>
  )
}
