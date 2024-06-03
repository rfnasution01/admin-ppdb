import { DataContent } from './data-content'
import {
  Accessibility,
  Backpack,
  BringToFront,
  GraduationCap,
  MapPin,
  Trophy,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { DayaTampungType } from '@/libs/types/profil-type'
import { useGetDayaTampungQuery } from '@/store/slices/dayaTampungAPI'
import { enumJalur } from '@/libs/enum/enum-jalur'
import clsx from 'clsx'
import Loading from '@/components/Loading'
import { useGetTiketNotifikasiQuery } from '@/store/slices/pertanyaanAPI'
import { ModalValidasi } from '@/layouts/root-layout/modal-validasi'

export default function DayaTampung() {
  // --- DayaTampung ---
  const [DayaTampung, setDayaTampung] = useState<DayaTampungType[]>()
  const { data, isLoading, isFetching } = useGetDayaTampungQuery()

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data?.data) {
      setDayaTampung(data?.data)
    }
  }, [data?.data])

  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const { data: notifData } = useGetTiketNotifikasiQuery()

  useEffect(() => {
    if (notifData?.jlh > 0) {
      setIsShowModal(true)
    }
  }, [notifData])

  return (
    <div className="grid w-full grid-cols-12 gap-32">
      {/* --- Gelombang 2 --- */}
      {loading ? (
        <div className="col-span-12 flex items-center justify-center p-32">
          <Loading />
        </div>
      ) : (
        <>
          {DayaTampung?.map((item, idx) => (
            <div
              key={idx}
              className={clsx(
                'w-full gap-32 rounded-2xl text-white shadow-md hover:cursor-pointer hover:shadow-lg phones:col-span-12 phones:w-full',
                {
                  'bg-gradient-to-br from-indigo-500 via-indigo-400 to-indigo-600':
                    item?.kode === enumJalur.ZONASI,
                  'bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600':
                    item?.kode === enumJalur.PRESTASI,
                  'bg-gradient-to-br from-rose-500 via-rose-400 to-rose-600':
                    item?.kode === enumJalur.AFIRMASI,
                  'via-emerlad-400 bg-gradient-to-br from-emerald-500 to-emerald-600':
                    item?.kode === enumJalur.PINDAHTUGAS,
                  'bg-gradient-to-br from-sky-500 via-sky-400 to-sky-600':
                    item?.kode === enumJalur.DISABILITAS,
                },
                {
                  'col-span-4': DayaTampung?.length > 4,
                  'col-span-3': DayaTampung?.length <= 4,
                },
              )}
            >
              <DataContent
                value={item?.jumlah}
                label={item?.nama}
                icon={
                  item?.kode === enumJalur.ZONASI ? (
                    <MapPin size={24} />
                  ) : item?.kode === enumJalur.PRESTASI ? (
                    <Trophy size={24} />
                  ) : item?.kode === enumJalur.AFIRMASI ? (
                    <Backpack size={24} />
                  ) : item?.kode === enumJalur.PINDAHTUGAS ? (
                    <BringToFront size={24} />
                  ) : item?.kode === enumJalur.DISABILITAS ? (
                    <Accessibility size={24} />
                  ) : (
                    <GraduationCap size={24} />
                  )
                }
                textColor={
                  item?.kode === enumJalur.ZONASI
                    ? 'text-indigo-700'
                    : item?.kode === enumJalur.PRESTASI
                      ? 'text-orange-700'
                      : item?.kode === enumJalur.AFIRMASI
                        ? 'text-rose-700'
                        : item?.kode === enumJalur.PINDAHTUGAS
                          ? 'text-emerald-700'
                          : item?.kode === enumJalur.DISABILITAS
                            ? 'text-sky-700'
                            : 'text-cyan-700'
                }
              />
            </div>
          ))}
        </>
      )}
      <ModalValidasi isOpen={isShowModal} setIsOpen={setIsShowModal} />
    </div>
  )
}
