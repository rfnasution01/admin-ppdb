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
  User,
} from 'lucide-react'
import { FormListLulus } from '@/components/form/formListLulus'
import { Form } from '@/components/Form'
import { FormListJalurMasuk } from '@/components/form/formListJalurMasuk'
import { FormListGelombang } from '@/components/form/formListGelombang'
import { useState } from 'react'
import { debounce } from 'lodash'
import Tooltips from '@/components/Tooltip'

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

  return (
    <div className="flex h-full w-full flex-col gap-32">
      {/* --- Header --- */}
      <div className="flex rounded-2xl border border-[#e0e4e5] bg-white p-32 shadow">
        <HasilHeader value="Daya Tampung" label="124" icon={<Box />} isBorder />
        <HasilHeader value="Lulus" label="124" icon={<Award />} isBorder />
        <HasilHeader value="Kekurangan" label="124" icon={<User />} />
      </div>
      {/* --- Filter --- */}
      <div className="flex items-center justify-between gap-32">
        <Form {...form}>
          <form className="flex h-full w-full gap-48">
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
          </form>
        </Form>
      </div>
    </div>
  )
}
