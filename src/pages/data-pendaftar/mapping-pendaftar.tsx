import Loading from '@/components/Loading'
import { NoData } from '@/components/NoData'
import { PendaftarType } from '@/libs/types/pendaftar-type'
import dayjs from 'dayjs'
import { DataComponent } from './data-component'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import React from 'react'
import { ExpandData } from './expand-data'

export function MappingDataPendaftar({
  loading,
  data,
  jenjang,
}: {
  loading: boolean
  data: PendaftarType[]
  jenjang: string
}) {
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null)

  const toggleRow = (index: number) => {
    setExpandedRowIndex(expandedRowIndex === index ? null : index)
  }

  return (
    <div className="flex w-full flex-col gap-12 overflow-x-auto">
      <table className="scrollbar h-full w-full border-collapse overflow-auto text-[2rem] phones:text-[2.4rem]">
        <thead className="relative z-10 w-full align-top leading-medium">
          <tr className="w-full border-b-[1.6rem] border-transparent">
            <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
              No
            </th>
            <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
              Biodata
            </th>
            <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
              Tujuan Sekolah
            </th>
            <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
              Verifikasi
            </th>
            <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase"></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="p-24">
              <td colSpan={5}>
                <Loading />
              </td>
            </tr>
          ) : !data ? (
            <tr>
              <td colSpan={5}>
                <NoData title="Terjadi Kesalahan" />
              </td>
            </tr>
          ) : data?.length === 0 ? (
            <tr>
              <td colSpan={5}>
                <NoData />
              </td>
            </tr>
          ) : (
            data?.map((item, idx) => (
              <React.Fragment key={idx}>
                <tr
                  className="scrollbar h-full w-full overflow-auto border-b-[1.6rem] border-transparent transition-all ease-in odd:bg-surface-disabled hover:cursor-pointer hover:bg-warning-tint-2"
                  onClick={() => toggleRow(idx)}
                >
                  <td className="px-24 py-12 align-top leading-medium">
                    {idx + 1}
                  </td>
                  <td className="text-nowrap px-24 py-12 align-top leading-medium">
                    <div className="flex flex-col gap-4">
                      <DataComponent label="Nama" value={item?.nama ?? '-'} />
                      <DataComponent
                        label="TTL"
                        value={
                          `${item?.tempat_lahir}, ${dayjs(item?.tanggal_lahir)
                            .locale('id')
                            .format('DD MMMM YYYY')}` ?? '-'
                        }
                      />
                      {item?.nisn && (
                        <DataComponent label="NISN" value={item?.nisn ?? '-'} />
                      )}
                      <DataComponent label="NIK" value={item?.nik ?? '-'} />
                      <DataComponent
                        label="Daftar"
                        value={dayjs(item?.daftar)
                          .locale('id')
                          .format('DD MMMM YYYY HH:mm:ss')}
                      />
                    </div>
                  </td>
                  <td className="px-24 py-12 align-top leading-medium">
                    <div className="flex flex-col gap-4">
                      <p className="text-nowrap">
                        Pilihan 1 - {item?.pilihan1 ?? '-'} (Skor:{' '}
                        {item?.skor1 ?? '0'})
                      </p>
                      <p className="text-nowrap">
                        Pilihan 2 - {item?.pilihan2 ?? '-'} (Skor:{' '}
                        {item?.skor2 ?? '0'})
                      </p>
                    </div>
                  </td>
                  <td className="px-24 py-12 align-top leading-medium">
                    <div className="flex flex-col gap-4">
                      <div className="pr-32">
                        <DataComponent
                          label="Sekolah"
                          value={item?.verifikasi_sekolah}
                        />
                      </div>
                      <div className="pr-32">
                        <DataComponent
                          label="Petugas"
                          value={item?.verifikasi_user}
                        />
                      </div>
                      <div className="pr-32">
                        <DataComponent
                          label="Tanggal"
                          value={dayjs(item?.verifikasi_on)
                            .locale('id')
                            .format('DD MMMM YYYY HH:mm:ss')}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="align-top">
                    {expandedRowIndex === idx ? <ChevronUp /> : <ChevronDown />}
                  </td>
                </tr>
                {expandedRowIndex === idx && (
                  <tr key={`expanded-${idx}`}>
                    <td
                      colSpan={5}
                      className="pb-12 align-top leading-medium shadow"
                    >
                      <ExpandData item={item} jenjang={jenjang} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
