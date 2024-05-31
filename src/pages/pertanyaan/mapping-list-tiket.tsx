import TimeSinceUploaded from '@/libs/helpers/format-time'
import { TiketType } from '@/libs/types/tiket-type'
import { PasPhoto } from './pas-photo'
import { Dispatch, SetStateAction, useState } from 'react'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

export function MappingListTiket({
  item,
  name,
  setName,
}: {
  item: TiketType[]
  name: string
  setName: Dispatch<SetStateAction<string>>
}) {
  const [show, setShow] = useState<boolean>(true)
  const navigate = useNavigate()
  return (
    <div className="scrollbar flex h-full flex-col gap-24 overflow-y-auto">
      {item?.map((list, idx) => (
        <div
          onClick={() => {
            setShow(false)
            setName(list?.id)
            navigate(`/open-ticket?detail=${list?.id}`)
          }}
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
              <div className="flex flex-col gap-8">
                <p>{list?.nama}</p>
                <div
                  className={clsx('rounded-full px-24 py-8 text-[1.8rem]', {
                    'bg-blue-300 text-blue-700': list?.status === 0,
                    'bg-orange-300 text-orange-700': list?.status === 1,
                    'bg-green-300 text-green-700': list?.status === 2,
                  })}
                >
                  {list?.status === 1
                    ? 'Berlangsung'
                    : list?.status === 2
                      ? 'Selesai'
                      : 'Menunggu'}
                </div>
              </div>
            </div>
            <div className="text-[1.8rem] italic">
              <TimeSinceUploaded uploadTime={list?.tanggal} />
            </div>
          </div>
          {/* --- Deskripsi --- */}
          <div className="flex items-center justify-between">
            <p className="limited-text">{list?.judul}</p>
            {list?.belum_baca > 0 && show && (
              <p className="flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-rose-500 p-8 text-[1.6rem] text-white">
                {list?.belum_baca}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
