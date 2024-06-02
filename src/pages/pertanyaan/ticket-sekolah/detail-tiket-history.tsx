import {
  TikeetNotificationType,
  TiketSekolahDetailType,
} from '@/libs/types/tiket-type'
import { CheckCheck, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import TimeSinceUploaded from '@/libs/helpers/format-time'
import { useEffect, useState } from 'react'
import { useGetTiketNotifikasiQuery } from '@/store/slices/pertanyaanAPI'
import clsx from 'clsx'
import { PasPhoto } from '../pas-photo'

export function DetailHistory({ detail }: { detail: TiketSekolahDetailType }) {
  // --- Notifikasi ---
  const [notifikasi, setNotifikasi] = useState<TikeetNotificationType>()
  const { data: getNotifikasi } = useGetTiketNotifikasiQuery()

  useEffect(() => {
    if (getNotifikasi) {
      setNotifikasi(getNotifikasi)
    }
  }, [getNotifikasi])

  const notReadNewsId = detail?.chat?.find(
    (item) => item?.baca === '0' && item?.jenis_chat !== 'ADMIN',
  )?.id

  return (
    <div className="flex flex-col gap-32">
      {detail?.chat?.map((item, idx) => (
        <div className={`flex w-full flex-col gap-24`} key={idx}>
          {item?.jenis_chat !== 'ADMIN' &&
            notifikasi?.jlh > 0 &&
            notReadNewsId === item?.id && (
              <div className="flex w-full justify-center">
                <p className="rounded-full border bg-white px-24 py-12">
                  {notifikasi?.jlh} Pesan Belum dibaca
                </p>
              </div>
            )}
          <div
            className={`flex w-full gap-32 ${item?.jenis_chat !== 'SISWA' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex w-3/5 gap-32 ${item?.jenis_chat !== 'SISWA' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <PasPhoto pasPhoto={item?.photo} name={item?.user} />
              <div
                className={clsx(
                  'flex flex-1 flex-col gap-8 rounded-2xl border p-24',
                  {
                    'border-[#73C2FF] bg-[#f5faff]':
                      item?.jenis_chat === 'SISWA',
                    'border-green-300 bg-green-100':
                      item?.jenis_chat === 'ADMIN',
                  },
                )}
              >
                <p className="text-rose-700">
                  {item?.jenis_chat !== 'SISWA'
                    ? item?.user
                    : detail?.ticket?.pengirim}
                </p>
                <p className="font-sf-pro">{item?.isi}</p>
                {detail?.ticket?.lampiran?.length > 0 && (
                  <div className="grid grid-cols-12 gap-32">
                    {item?.lampiran?.map((list, index) => (
                      <div
                        className="col-span-12 phones:col-span-12"
                        key={index}
                      >
                        <Link
                          to={list?.dokumen}
                          target="_blank"
                          className="flex gap-24 rounded-2xl border border-[#73C2FF] bg-[#f5faff] p-12 shadow hover:cursor-pointer hover:shadow-md"
                        >
                          <img
                            src={list?.dokumen}
                            alt={list?.id}
                            className="h-[6rem] w-[5rem]"
                          />
                          <div className="flex-1 text-[2rem]">
                            image-{idx + 1}.jpg
                          </div>
                          <div className="flex items-center justify-center text-primary">
                            <Download size={24} />
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
                <div className="items-canter flex justify-end gap-16 text-[2rem] italic">
                  <TimeSinceUploaded uploadTime={item?.tanggal} />
                  {item?.baca === '0' && item?.jenis_chat !== 'SISWA' ? (
                    <span className="text-slate-500">
                      <CheckCheck size={16} />
                    </span>
                  ) : item?.baca === '1' && item?.jenis_chat !== 'SISWA' ? (
                    <span className="text-primary">
                      <CheckCheck size={16} />
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
