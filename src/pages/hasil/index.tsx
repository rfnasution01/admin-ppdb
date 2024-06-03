import { hasilFilterSchema } from '@/libs/schema/hasil-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, useForm } from 'react-hook-form'
import * as zod from 'zod'

export default function HasilPPDB() {
  const form = useForm<zod.infer<typeof hasilFilterSchema>>({
    resolver: zodResolver(hasilFilterSchema),
    defaultValues: {},
  })

  return (
    <div className="flex h-full w-full flex-col gap-32">
      {/* --- Header --- */}
      <div className="flex gap-32">
        <div className="flex-1">
          <div className="w-2/3 rounded-2xl bg-[#73C2FF] px-32 pb-64 pt-32 text-white shadow">
            Daya Tampung:
          </div>
        </div>
        <div className="flex-1">
          <div className="w-2/3 rounded-2xl bg-[#73C2FF] px-32 pb-64 pt-32 text-white shadow">
            Lulus:
          </div>
        </div>
        <div className="flex-1">
          <div className="w-2/3 rounded-2xl bg-[#73C2FF] px-32 pb-64 pt-32 text-white shadow">
            Kekurangan: Siswa
          </div>
        </div>
      </div>
      {/* --- Filter --- */}
      <div className="flex items-center justify-between gap-32">
        <Form {...form}>
          <form className="scrollbar flex h-full w-full flex-col gap-32 overflow-auto rounded-2xl border border-[#73C2FF] p-24 hover:bg-[#f5faff]">
            {/* <FormListDayaTampung
              name="jalur"
              placeholder="Daya Tampung"
              useFormReturn={form}
              headerLabel="Daya Tampung"
            /> */}
          </form>
        </Form>
      </div>
    </div>
  )
}
