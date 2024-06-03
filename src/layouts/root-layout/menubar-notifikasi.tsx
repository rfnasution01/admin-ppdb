import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/Menubar'
import { AdminNotifType, NotifikasiType } from '@/libs/types/tiket-type'
import { setStatePertanyaanSekolah } from '@/store/reducer/statePertanyaanSekolah'
import { setStatePertanyaanSiswa } from '@/store/reducer/statePertanyaanSiswa'
import clsx from 'clsx'
import { Bell } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function MenubarNotifikasi({
  dataSiswa,
  dataSekolah,
  jlh,
}: {
  jlh: number
  dataSiswa: NotifikasiType[]
  dataSekolah: AdminNotifType[]
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleCloseMenubarContent = () => {
    setIsMenuOpen(false)
  }

  const dispatch = useDispatch()

  return (
    <Menubar className="px-4">
      <MenubarMenu>
        <MenubarTrigger
          className="w-full text-center transition-all duration-300"
          variant="nothing"
          layout="icon"
          size="fit"
          onClick={handleMenuClick}
        >
          {jlh > 0 ? (
            <div style={{ position: 'relative' }}>
              <Bell size={20} />
              <div
                style={{
                  position: 'absolute',
                  top: '1px',
                  right: '0px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: 'red',
                  borderRadius: '50%',
                }}
              />
            </div>
          ) : (
            <Bell size={20} />
          )}
        </MenubarTrigger>
        {isMenuOpen && (
          <MenubarContent className="shadow-grey-light-1 absolute -right-[1rem] -top-[1rem] w-[50rem] transition-all duration-300">
            {jlh > 0 ? (
              <div className="flex flex-col gap-32 rounded-2xl bg-white p-24 text-[2rem] phones:text-[2.4rem]">
                {dataSiswa?.length > 0 && (
                  <div className="flex flex-col gap-12">
                    <p className="text-[2.4rem] font-bold">Notifikasi Siswa</p>
                    {dataSiswa?.length > 0 ? (
                      dataSiswa?.slice(0, 3).map((item, idx) => (
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
                            handleCloseMenubarContent()
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
                    <Link
                      to={'/pertanyaan-siswa'}
                      className="text-center italic hover:text-primary"
                      onClick={handleCloseMenubarContent}
                    >
                      Lihat Selengkapnya
                    </Link>
                  </div>
                )}
                {dataSekolah?.length > 0 && (
                  <div className="flex flex-col gap-12">
                    <p className="text-[2.4rem] font-bold">Notifikasi Admin</p>
                    {dataSekolah?.length > 0 ? (
                      dataSekolah.slice(0, 3).map((item, idx) => (
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
                            handleCloseMenubarContent()
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
                    <Link
                      to={'/pertanyaan-siswa/sekolah'}
                      className="text-center italic hover:text-primary"
                      onClick={handleCloseMenubarContent}
                    >
                      Lihat Selengkapnya
                    </Link>
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
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
}
