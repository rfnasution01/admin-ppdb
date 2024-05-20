import { ListDayaTampung } from '@/libs/dummy/list-daya-tampung'
import { DataContent } from './data-content'

export default function DayaTampung() {
  return (
    <div className="flex w-full items-center justify-start gap-32 phones:flex-col">
      {/* --- Gelombang 2 --- */}
      {ListDayaTampung?.map((item, idx) => (
        <div
          key={idx}
          className="flex w-1/2 flex-col items-start justify-start gap-12 rounded-2xl bg-white p-32 text-[2.4rem] shadow-md hover:cursor-pointer hover:shadow-lg phones:w-full phones:text-[2.8rem]"
        >
          <p className="font-bold uppercase">{item?.name}</p>
          <DataContent value={item?.zonasi} label="A. Jalur Zonasi" />
          <DataContent value={item?.afirmasi} label="B. Jalur Affirmasi" />
          <DataContent value={item?.prestasi} label="C. Jalur Prestasi" />
          <DataContent
            value={item?.pindah_tugas}
            label="D. Jalur Perpindahan Tugas"
          />
        </div>
      ))}
    </div>
  )
}
