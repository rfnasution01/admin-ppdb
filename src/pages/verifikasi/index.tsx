import { enumJalur } from '@/libs/enum/enum-jalur'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { DataComponent } from './data-component'
import { useGetVerifikasiQuery } from '@/store/slices/verifikasiAPI'
import { useEffect, useState } from 'react'
import { PilihData } from './pilih-data'
import { VerifikasiType } from '@/libs/types/verifikasi-type'
import { MultiSkeleton } from '@/components/skeleton'

export default function ListVerifikasi() {
  const [name, setName] = useState<string | null>(null)
  // --- Verifikasi ---
  const [verifikasi, setVerifikasi] = useState<VerifikasiType[]>()
  const { data, isLoading, isFetching } = useGetVerifikasiQuery()

  useEffect(() => {
    if (data?.data) {
      setVerifikasi(data?.data)
    }
  }, [data?.data])

  const loading = isFetching || isLoading

  return (
    <div className="grid h-full w-full grid-cols-12 gap-32">
      {/* --- Verifikasi Data --- */}
      <div className="scrollbar col-span-4 h-full overflow-auto phones:col-span-12">
        {loading ? (
          <MultiSkeleton />
        ) : (
          <div className="flex flex-col gap-32">
            {verifikasi?.map((item, idx) => (
              <div
                className={clsx(
                  'flex flex-col rounded-2xl border bg-white shadow hover:cursor-pointer hover:shadow-md',
                  {
                    'border-indigo-100':
                      item?.kode?.toUpperCase() === enumJalur?.ZONASI,
                    'border-rose-100':
                      item?.kode?.toUpperCase() === enumJalur?.AFIRMASI,
                    'border-orange-100':
                      item?.kode?.toUpperCase() === enumJalur?.PRESTASI,
                    'border-emerald-100':
                      item?.kode?.toUpperCase() === enumJalur?.PINDAHTUGAS,
                    'border-sky-100':
                      item?.kode?.toUpperCase() === enumJalur?.DISABILITAS,
                  },
                )}
                key={idx}
                onClick={() => {
                  setName(item?.id)
                }}
              >
                <p
                  className={clsx('p-32 text-white', {
                    'bg-gradient-to-br from-indigo-500 via-indigo-400 to-indigo-600':
                      item?.kode?.toUpperCase() === enumJalur.ZONASI,
                    'bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600':
                      item?.kode?.toUpperCase() === enumJalur.PRESTASI,
                    'bg-gradient-to-br from-rose-500 via-rose-400 to-rose-600':
                      item?.kode?.toUpperCase() === enumJalur.AFIRMASI,
                    'via-emerlad-400 bg-gradient-to-br from-emerald-500 to-emerald-600':
                      item?.kode?.toUpperCase() === enumJalur.PINDAHTUGAS,
                    'bg-gradient-to-br from-sky-500 via-sky-400 to-sky-600':
                      item?.kode?.toUpperCase() === enumJalur.DISABILITAS,
                  })}
                  style={{
                    borderTopLeftRadius: '1rem',
                    borderTopRightRadius: '1rem',
                  }}
                >
                  {item?.nama}
                </p>
                <div className="flex flex-col gap-12 p-32">
                  <DataComponent label="Jalur" value={item?.jalur ?? '-'} />
                  <DataComponent label="NISN" value={item?.nisn ?? '-'} />
                  <DataComponent label="NIK" value={item?.nik ?? '-'} />
                  <DataComponent
                    label="TTL"
                    value={`${item?.tempat_lahir}, 
                ${dayjs(item?.tanggal_lahir).format('DD MMMM YYYY')}`}
                  />
                  <DataComponent
                    label="Asal Sekolah"
                    value={item?.asal_sekolah ?? '-'}
                  />
                  <DataComponent
                    label="Pilihan 1"
                    value={item?.pilihan1 ?? '-'}
                  />
                  <DataComponent
                    label="Pilihan 2"
                    value={item?.pilihan2 ?? '-'}
                  />
                  <DataComponent
                    label="Diajukan"
                    value={dayjs(item?.diajukan).format('DD MMMM YYYY') ?? '-'}
                    isItalic
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="scrollbar col-span-8 h-full overflow-auto phones:col-span-12 phones:hidden">
        {name ? name : <PilihData />}
      </div>
    </div>
  )
}
