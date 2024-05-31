import TimeSinceUploaded from '@/libs/helpers/format-time'
import { TiketType } from '@/libs/types/tiket-type'
import { PasPhoto } from './pas-photo'
import { Dispatch, SetStateAction } from 'react'
import clsx from 'clsx'

export function MappingListTiket({
  item,
  name,
  setName,
}: {
  item: TiketType[]
  name: string
  setName: Dispatch<SetStateAction<string>>
}) {
  return (
    <div className="scrollbar flex h-full flex-col gap-24 overflow-y-auto">
      {item?.map((list, idx) => (
        <div
          onClick={() => setName(list?.id)}
          className={clsx(
            'flex flex-col gap-16 rounded-2xl border p-32 hover:cursor-pointer hover:border-[#73C2FF] hover:bg-[#f5faff]',
            {
              'border-[#73C2FF] bg-[#f5faff]': name === list?.id,
            },
          )}
          key={idx}
        >
          <div className="flex items-center justify-between gap-16">
            <div className="flex items-center gap-16">
              <PasPhoto pasPhoto={list?.photo} name={list?.nama} />
              <p>{list?.nama}</p>
            </div>
            <div className="text-[1.8rem] italic">
              <TimeSinceUploaded uploadTime={list?.tanggal} />
            </div>
          </div>
          {/* --- Deskripsi --- */}
          <div
            dangerouslySetInnerHTML={{ __html: list?.keterangan }}
            className="limited-text-2-lines"
          />
        </div>
      ))}
    </div>
  )
}
