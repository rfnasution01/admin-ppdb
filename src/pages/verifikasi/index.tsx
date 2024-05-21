import { ListDataVerifikasi } from '@/libs/dummy/list-data-verifikasi'
import { enumJalur } from '@/libs/enum/enum-jalur'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { DataComponent } from './data-component'

export default function ListVerifikasi() {
  return (
    <div className="grid h-full w-full grid-cols-12 gap-32">
      {/* --- Verifikasi Data --- */}
      <div className="scrollbar col-span-4 h-full overflow-auto phones:col-span-12">
        <div className="flex flex-col gap-32">
          {ListDataVerifikasi.map((item, idx) => (
            <div
              className={clsx(
                'flex flex-col rounded-2xl border bg-white shadow hover:cursor-pointer hover:shadow-md',
                {
                  'border-indigo-100': item?.jalur === enumJalur?.ZONASI,
                  'border-rose-100': item?.jalur === enumJalur?.AFIRMASI,
                  'border-orange-100': item?.jalur === enumJalur?.PRESTASI,
                  'border-emerald-100': item?.jalur === enumJalur?.PINDAHTUGAS,
                  'border-sky-100': item?.jalur === enumJalur?.DISABILITAS,
                },
              )}
              key={idx}
            >
              <p
                className={clsx('p-32 text-white', {
                  'bg-gradient-to-br from-indigo-500 via-indigo-400 to-indigo-600':
                    item?.jalur === enumJalur.ZONASI,
                  'bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600':
                    item?.jalur === enumJalur.PRESTASI,
                  'bg-gradient-to-br from-rose-500 via-rose-400 to-rose-600':
                    item?.jalur === enumJalur.AFIRMASI,
                  'via-emerlad-400 bg-gradient-to-br from-emerald-500 to-emerald-600':
                    item?.jalur === enumJalur.PINDAHTUGAS,
                  'bg-gradient-to-br from-sky-500 via-sky-400 to-sky-600':
                    item?.jalur === enumJalur.DISABILITAS,
                })}
                style={{
                  borderTopLeftRadius: '1rem',
                  borderTopRightRadius: '1rem',
                }}
              >
                {item?.name}
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
      </div>
      <div className="scrollbar col-span-8 h-full overflow-auto bg-red-300 phones:col-span-12 phones:hidden">
        Test
      </div>
    </div>
  )
}
