import { ListDayaTampung } from '@/libs/dummy/list-daya-tampung'
import { DataContent } from './data-content'
import { Backpack, BringToFront, MapPin, Trophy, Users } from 'lucide-react'

export default function DayaTampung() {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-32 phones:flex-col">
      {/* --- Gelombang 2 --- */}
      {ListDayaTampung?.map((item, idx) => (
        <div
          key={idx}
          className="flex w-full flex-col items-start justify-start gap-32"
        >
          <p className="text-[2.4rem] font-bold phones:text-[2.8rem]">
            {item?.name}
          </p>
          <div className="flex w-full items-start justify-start gap-32 phones:flex-col">
            <DataContent
              value={item?.zonasi}
              label="Zonasi"
              icon={<MapPin size={24} />}
              bgColor="bg-gradient-to-br from-indigo-500 via-indigo-400 to-indigo-600"
              textColor="text-indigo-700"
            />
            <DataContent
              value={item?.afirmasi}
              label="Afirmasi"
              icon={<Backpack size={24} />}
              bgColor="bg-gradient-to-br from-rose-500 via-rose-400 to-rose-600"
              textColor="text-rose-700"
            />
            <DataContent
              value={item?.prestasi}
              label="Prestasi"
              icon={<Trophy size={24} />}
              bgColor="bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600"
              textColor="text-orange-500"
            />
            <DataContent
              value={item?.pindah_tugas}
              label="Pindah Tugas"
              icon={<BringToFront size={24} />}
              bgColor="bg-gradient-to-br from-emerald-500 via-emerlad-400 to-emerald-600"
              textColor="text-lime-500"
            />
            <DataContent
              value={item?.prestasi}
              label="Total"
              icon={<Users size={24} />}
              bgColor="bg-gradient-to-br from-sky-500 via-sky-400 to-sky-600"
              textColor="text-sky-700"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
