import Loading from '@/components/Loading'
import { NoData } from '@/components/NoData'
import { PendaftarType } from '@/libs/types/pendaftar-type'
import dayjs from 'dayjs'
import { useState } from 'react'
import React from 'react'
import { ExpandData } from './expand-data'
import { CetakBuktiPendaftaran } from './cetak-bukti-pendaftaran'
import { CetakHasilVerifikasi } from './cetak-hasil-verifikasi'
import { MenubarVerifikasi } from './menubar-verifikasi'

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

  const handlePrintClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation()
  }

  return (
    <div className="flex w-full flex-col gap-12 overflow-x-auto">
      <table className="scrollbar h-full w-full border-collapse overflow-auto text-[2rem] phones:text-[2.4rem]">
        <thead className="relative z-10 w-full align-top leading-medium">
          <tr className="w-full border-b-[1.6rem] border-transparent">
            <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
              #
            </th>
            <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
              Nama/Tgl Lahir/NISN/NIK/Daftar
            </th>
            <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
              Pilihan
            </th>
            <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
              Cetak
            </th>
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
                  className="scrollbar h-full w-full overflow-auto border-b border-black transition-all ease-in odd:bg-surface-disabled hover:cursor-pointer hover:bg-warning-tint-2"
                  onClick={() => toggleRow(idx)}
                >
                  <td className="px-24 py-12 align-top leading-medium">
                    {idx + 1}
                  </td>
                  <td className="text-nowrap px-24 py-12 align-top leading-medium">
                    <div className="flex items-start gap-24">
                      <div className="h-[10rem] w-[10rem]">
                        <img src="/img/tutwuri.png" className="h-full w-full" />
                      </div>
                      <div className="flex flex-col gap-4">
                        <p>{item?.nama ?? '-'}</p>
                        <p>
                          {item?.nisn
                            ? `NISN:${item?.nisn}/NIK:${item?.nik}`
                            : `NIK:${item?.nik}`}
                        </p>
                        <p className="italic text-danger-100">
                          Daftar{' '}
                          {dayjs(item?.daftar)
                            .locale('id')
                            .format('DD-MM-YYYY HH:mm:ss')}
                        </p>

                        <button onClick={handlePrintClick}>
                          <MenubarVerifikasi
                            verifikasiPetugas={item?.verifikasi_user ?? '-'}
                            verifikasiSekolah={item?.verifikasi_sekolah ?? '-'}
                            verifikasiTanggal={item?.verifikasi_on}
                          />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-24 py-12 align-top leading-medium">
                    <div className="flex flex-col gap-4">
                      <p className="text-nowrap">
                        Pilihan 1 - {item?.pilihan1 ?? '-'} (Skore:{' '}
                        {Math.round(Number(item?.skor1)) ?? '0'})
                      </p>
                      <p className="text-nowrap">
                        Pilihan 2 - {item?.pilihan2 ?? '-'} (Skore:{' '}
                        {Math.round(Number(item?.skor2)) ?? '0'})
                      </p>
                    </div>
                  </td>

                  <td className="px-24 py-12 align-top leading-medium">
                    <div className="flex flex-col items-start justify-start gap-12">
                      <button onClick={handlePrintClick}>
                        <CetakBuktiPendaftaran
                          profil={item}
                          jenjang={jenjang}
                        />
                      </button>
                      <button onClick={handlePrintClick}>
                        <CetakHasilVerifikasi profil={item} jenjang={jenjang} />
                      </button>
                    </div>
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
