import { Form } from '@/components/Form'
import Tooltips from '@/components/Tooltip'
import { chatSchema } from '@/libs/schema/ticket-schema'
import clsx from 'clsx'
import { ListFilter, Pencil, Search } from 'lucide-react'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormListMasalah } from '@/components/form/formListMasalah'
import { useNavigate } from 'react-router-dom'

export function TiketSekolahHeader({
  onSearch,
  handleClick,
  refetch,
  setStatus,
  setName,
  setIdMasalah,
  setSiswa,
}: {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleClick: () => void
  refetch: ReactNode
  setName: Dispatch<SetStateAction<string>>
  setStatus: Dispatch<SetStateAction<number>>
  setIdMasalah: Dispatch<SetStateAction<string>>
  setSiswa: Dispatch<SetStateAction<number>>
}) {
  const [isShow, setIsShow] = useState<boolean>(false)

  // --- Form Schema ---
  const form = useForm<zod.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: {},
  })

  const navigate = useNavigate()

  return (
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
          onClick={() => {
            setName('tambah')
            navigate('/open-ticket/sekolah?page=tambah')
          }}
          className="rounded-2xl border border-primary p-16 text-primary hover:cursor-pointer hover:bg-primary hover:text-white"
        >
          <Tooltips
            triggerComponent={<Pencil size={16} />}
            tooltipContent={<span>Tambah Tiket Sekolah</span>}
          />
        </div>

        {refetch}
      </div>
      {isShow && (
        <div className="flex items-center gap-16">
          {['Semua', 'Menunggu', 'Berlangsung', 'Selesai'].map((item, idx) => (
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
          ))}
        </div>
      )}
      {isShow && (
        <Form {...form}>
          <form className="flex items-center gap-32">
            <FormListMasalah
              name="idMasalah"
              useFormReturn={form}
              placeholder="Pilih Masalah"
              setIdMasalah={setIdMasalah}
              setSiswa={setSiswa}
            />
          </form>
        </Form>
      )}
    </div>
  )
}
