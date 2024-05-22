import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'
import Loading from '@/components/Loading'
import { NoData } from '@/components/NoData'
import { enumFile } from '@/libs/enum/enum-file'
import { useState } from 'react'
import { ModalFile } from './modal-file'
import { DataComponent2 } from './data-component2'
import dayjs from 'dayjs'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ModalTOlak } from './modal-tolak'

export function FormDokumen({
  detail,
  id,
  isLoading,
  handleSubmit,
}: {
  detail: VerifikasiDetailType
  id: string
  isLoading: boolean
  handleSubmit: (
    id_dokumen: string,
    status: string,
    komentar?: string,
  ) => Promise<void>
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalId, setModalId] = useState<number>(null)
  const loading = false

  return (
    <div className="flex flex-col gap-12">
      <table className="scrollbar h-full w-full flex-1 border-collapse overflow-auto text-[2.4rem]">
        <thead className="relative z-10 align-top leading-medium">
          <tr className="border-b-[1.6rem] border-transparent">
            <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
              No
            </th>
            <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
              Nama
            </th>
            <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
              File
            </th>
            <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
              Status
            </th>
            <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
              Verifikasi
            </th>
            <th className="sticky top-0 text-nowrap border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
              Info
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="p-24">
              <td colSpan={6}>
                <Loading />
              </td>
            </tr>
          ) : !detail ? (
            <tr>
              <td colSpan={6}>
                <NoData title="Terjadi Kesalahan" />
              </td>
            </tr>
          ) : detail?.dokumen?.length === 0 ? (
            <td colSpan={6}>
              <NoData />
            </td>
          ) : (
            detail?.dokumen?.map((item, idx) => (
              <tr
                className="scrollbar h-full w-full overflow-auto border-b-[1.6rem] border-transparent transition-all ease-in odd:bg-surface-disabled hover:cursor-pointer hover:bg-warning-tint-2"
                key={idx}
              >
                <td className="px-24 py-12 leading-medium">{idx + 1}</td>
                <td className="px-24 py-12 leading-medium">{item?.nama}</td>
                <td className="px-24 py-12 leading-medium">
                  <div
                    className="text-primary"
                    onClick={() => {
                      setIsModalOpen(true)
                      setModalId(idx)
                    }}
                  >
                    Lihat File
                  </div>
                </td>
                <td className="px-24 py-12 leading-medium">
                  {item?.status_verifikasi === enumFile.FILEDITERIMA ? (
                    <p className="text-nowrap rounded-full bg-emerald-100 px-24 py-12 text-center text-[1.6rem] text-emerald-700 phones:text-[2rem]">
                      Diterima
                    </p>
                  ) : item?.status_verifikasi === enumFile.FILEDITOLAK ? (
                    <p className="text-nowrap rounded-full bg-rose-100 px-24 py-12 text-center text-[1.6rem] text-rose-700 phones:text-[2rem]">
                      Ditolak
                    </p>
                  ) : (
                    <p className="text-nowrap rounded-full bg-amber-100 px-24 py-12 text-center text-[1.6rem] text-amber-700 phones:text-[2rem]">
                      Menunggu Persetujuan
                    </p>
                  )}
                </td>
                <td className="px-24 py-12 leading-medium">
                  <div className="flex items-center gap-12">
                    <button
                      type="button"
                      disabled={isLoading || item?.status_verifikasi !== 0}
                      onClick={() => {
                        setIsOpen(true)
                        setModalId(idx)
                      }}
                      className="text-nowrap rounded-full  bg-rose-700 px-24 py-12 text-center text-[1.6rem] text-white hover:bg-rose-900 disabled:cursor-not-allowed phones:text-[2rem]"
                    >
                      Tolak
                    </button>
                    <button
                      disabled={isLoading || item?.status_verifikasi !== 0}
                      type="button"
                      onClick={() => {
                        handleSubmit(item?.id, '1')
                      }}
                      className="text-nowrap rounded-full  bg-green-700 px-24 py-12 text-center text-[1.6rem] text-white hover:bg-green-900 disabled:cursor-not-allowed phones:text-[2rem]"
                    >
                      Verifikasi
                    </button>
                  </div>
                </td>
                <td className="px-24 py-12 leading-medium">
                  <div className="flex flex-col gap-8">
                    <DataComponent2
                      label="Petugas"
                      value={item?.petugas ?? '-'}
                    />
                    <DataComponent2
                      label="Tanggal Verifikasi"
                      value={
                        item?.verifikasi_on
                          ? dayjs(item?.verifikasi_on)
                              ?.locale('id')
                              .format('DD/MMMM/YYYY hh:mm A')
                          : '-'
                      }
                    />
                    <DataComponent2
                      label="Komentar"
                      value={item?.komentar ?? '-'}
                    />
                  </div>
                </td>

                {idx === modalId && (
                  <ModalFile
                    setIsOpen={setIsModalOpen}
                    isOpen={isModalOpen}
                    gambar={item?.dok_siswa}
                  />
                )}

                {idx === modalId && (
                  <ModalTOlak
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    id={id}
                    id_dokumen={item?.id}
                  />
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  )
}
