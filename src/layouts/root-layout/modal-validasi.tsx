/* eslint-disable @typescript-eslint/no-explicit-any */

import { X } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { AdminNotifType, NotifikasiType } from '@/libs/types/tiket-type'
import { useGetTiketNotifikasiQuery } from '@/store/slices/pertanyaanAPI'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { setStatePertanyaanSiswa } from '@/store/reducer/statePertanyaanSiswa'
import { setStatePertanyaanSekolah } from '@/store/reducer/statePertanyaanSekolah'

export function ModalValidasi({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  // --- Notifikasi ---
  const [notifikasiJumlah, setNotifikasiJumlah] = useState<number>()
  const [notifikasiSiswa, setNotifikasiSiswa] = useState<NotifikasiType[]>()
  const [notifikasiSekolah, setNotifikasiSekolah] = useState<AdminNotifType[]>()
  const { data: getNotifikasi } = useGetTiketNotifikasiQuery()

  useEffect(() => {
    if (getNotifikasi) {
      setNotifikasiSiswa(getNotifikasi?.data?.siswa)
      setNotifikasiSekolah(getNotifikasi?.data?.admin)
      setNotifikasiJumlah(getNotifikasi?.jlh)
    }
  }, [getNotifikasi])

  const dispatch = useDispatch()
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        position="middle"
        style={{
          width: '50%',
        }}
      >
        <div className="flex flex-col gap-16 p-32">
          {/* --- Header --- */}
          <DialogHeader>
            <DialogTitle>
              <p className="text-[2.4rem] font-bold phones:text-[2.8rem]">
                Pesan Notifikasi
              </p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <X size={18} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          <hr className="border" />
          <div className="flex flex-col gap-32">
            <p className="text-[2.4rem]">Masih ada pesan yang belum dibaca</p>
            <div className="flex flex-col gap-32">
              {notifikasiJumlah > 0 ? (
                <div className="flex flex-col gap-32 rounded-2xl bg-white p-24 text-[2rem] phones:text-[2.4rem]">
                  {notifikasiSiswa?.length > 0 && (
                    <div className="flex flex-col gap-12">
                      <p className="text-[2.4rem] font-bold">
                        Notifikasi Siswa
                      </p>
                      {notifikasiSiswa?.length > 0 ? (
                        notifikasiSiswa?.slice(0, 3).map((item, idx) => (
                          <Link
                            to={`/pertanyaan-siswa?detail=${item?.id}`}
                            className={clsx(
                              'hover: flex items-center gap-16 text-nowrap p-8 hover:cursor-pointer hover:bg-yellow-50',
                            )}
                            key={idx}
                            onClick={() => {
                              dispatch(
                                setStatePertanyaanSiswa({ detail: item?.id }),
                              )
                              setIsOpen(false)
                            }}
                          >
                            <div className="h-[6rem] w-[5rem]">
                              <img
                                src={item?.photo}
                                alt={item?.nama}
                                className="h-full w-full"
                              />
                            </div>
                            <div className="flex flex-col gap-4">
                              <p className="text-[2.4rem] font-bold">
                                {item?.nama}
                              </p>
                              <p>{item?.judul}</p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div
                          className={clsx(
                            'flex flex-col gap-12 rounded-2xl bg-white p-24 text-[2rem] phones:text-[2.4rem]',
                          )}
                        >
                          Tidak Ada Notifikasi
                        </div>
                      )}
                      <hr className="border" />
                      <div className="flex justify-end">
                        <Link
                          to={'/pertanyaan-siswa'}
                          className="rounded-lg bg-green-700 px-24 py-8 text-center italic text-white hover:bg-green-900"
                          onClick={() => setIsOpen(false)}
                        >
                          Lihat Pesan
                        </Link>
                      </div>
                    </div>
                  )}
                  {notifikasiSekolah?.length > 0 && (
                    <div className="flex flex-col gap-12">
                      <p className="text-[2.4rem] font-bold">
                        Notifikasi Admin
                      </p>
                      {notifikasiSekolah?.length > 0 ? (
                        notifikasiSekolah.slice(0, 3).map((item, idx) => (
                          <Link
                            to={`/pertanyaan-siswa/sekolah?page=detail&id=${item?.id}`}
                            className={clsx(
                              'hover: flex items-center gap-16 text-nowrap p-8 hover:cursor-pointer hover:bg-yellow-50',
                            )}
                            key={idx}
                            onClick={() => {
                              dispatch(
                                setStatePertanyaanSekolah({
                                  detail: item?.id,
                                  page: 'detail',
                                }),
                              )
                              setIsOpen(false)
                            }}
                          >
                            <div className="h-[6rem] w-[5rem]">
                              <img
                                src={item?.photo}
                                alt={item?.nama}
                                className="h-full w-full"
                              />
                            </div>
                            <div className="flex flex-col gap-4">
                              <p className="text-[2.4rem] font-bold">
                                {item?.nama}
                              </p>
                              <p>{item?.masalah}</p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div
                          className={clsx(
                            'flex flex-col gap-12 rounded-2xl bg-white p-24 text-[2rem] phones:text-[2.4rem]',
                          )}
                        >
                          Tidak Ada Notifikasi
                        </div>
                      )}
                      <hr className="border" />
                      <div className="flex justify-end">
                        <Link
                          to={'/pertanyaan-siswa/sekolah'}
                          className="rounded-lg bg-green-700 px-24 py-8 text-center italic text-white hover:bg-green-900"
                          onClick={() => setIsOpen(false)}
                        >
                          Lihat Pesan
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className={clsx(
                    'flex flex-col gap-12 rounded-2xl bg-white p-24 text-[2rem] phones:text-[2.4rem]',
                  )}
                >
                  Tidak Ada Notifikasi
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
