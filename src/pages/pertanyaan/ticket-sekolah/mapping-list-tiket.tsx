import TimeSinceUploaded from '@/libs/helpers/format-time'
import { TiketSekolahType } from '@/libs/types/tiket-type'
import { Dispatch, SetStateAction } from 'react'
import clsx from 'clsx'
import { MenubarLayanan } from './menubar-edit'
import { useNavigate } from 'react-router-dom'

export function MappingListTiket({
  item,
  name,
  setName,
  setId,
}: {
  item: TiketSekolahType[]
  name: string
  setName: Dispatch<SetStateAction<string>>
  setId: Dispatch<SetStateAction<string>>
}) {
  const navigate = useNavigate()
  return (
    <div className="scrollbar flex h-full flex-col gap-24 overflow-y-auto">
      {item?.map((list, idx) => (
        <div
          onClick={() => {
            setName(list?.id)
            setId(list?.id)
            navigate(`/open-ticket/sekolah?page=detail&id=${list?.id}`)
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
            <div className="flex w-full flex-col gap-8">
              <div className="flex justify-between gap-32">
                <div className="flex flex-col gap-8">
                  <p className="text-[1.8rem] underline">{list?.pengirim}</p>
                  <p>{list?.judul}</p>
                </div>
                <div className="flex flex-col gap-8">
                  <button
                    className="flex justify-end"
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    <MenubarLayanan
                      isDisabled={list?.status !== 0}
                      id={list?.id}
                      setName={setName}
                      setId={setId}
                    />
                  </button>
                  <div className="flex">
                    <div
                      className={clsx('rounded-full px-16 py-4 text-[1.6rem]', {
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
              </div>

              <div
                className="limited-text-2-lines"
                dangerouslySetInnerHTML={{ __html: list?.keterangan }}
              />
              <div className="flex w-full justify-end text-[1.8rem] italic">
                <TimeSinceUploaded uploadTime={list?.tanggal} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
