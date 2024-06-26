import { Dialog, DialogContent } from '@/components/Dialog'
import { ListNavigasi } from '@/libs/dummy/list-navigasi'
import { convertToSlug } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import { DoorClosed, DoorOpen } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function ModalAside({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { firstPathname, secondPathname } = usePathname()
  const token = Cookies.get('token')
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('token')
    navigate('/login')
  }

  const isActivePage = (item: string) => {
    if (
      (item.toLowerCase() === 'dashboard' && firstPathname === '') ||
      (item.toLowerCase() === 'dashboard' && firstPathname === 'pendaftar') ||
      (item.toLowerCase() === 'pertanyaan-siswa' &&
        firstPathname === 'pertanyaan-siswa' &&
        secondPathname !== 'sekolah') ||
      (convertToSlug(item) === firstPathname && secondPathname !== 'sekolah') ||
      (item.toLowerCase() === 'hubungi-disdik' &&
        firstPathname === 'pertanyaan-siswa' &&
        secondPathname === 'sekolah')
    ) {
      return true
    }
    return false
  }

  const level = Cookies.get('level')
  const menuOperator = ListNavigasi?.filter(
    (item) => item?.title !== 'Data Operator',
  )

  const menu = level === 'Operator' ? menuOperator : ListNavigasi

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        style={{
          width: '80%',
          height: '100%',
        }}
        position="left"
      >
        <div className="flex flex-col gap-16">
          {/* --- Header --- */}
          <div className="flex items-center gap-32 bg-gradient-to-br from-danger-300 via-danger-100 to-danger-200 p-32 text-white">
            {/* --- Logo --- */}
            <div className="rounded-lg bg-white p-16">
              <img
                src="/img/tutwuri.png"
                alt="tut wuri handayani"
                className="w-[7rem]"
              />
            </div>
            {/* --- Sekolah --- */}
            <div className="flex w-full flex-col gap-16">
              <p className="text-[2.8rem] font-bold uppercase">
                kab. Batu Bara
              </p>
              <hr className="w-full border border-white" />
              <p className="text-[2.4rem]">PPDB ADMIN</p>
            </div>
          </div>
          {/* --- Navigasi --- */}
          <div className="flex flex-col gap-16 pl-16">
            {menu.map((item, idx) => (
              <Link
                to={
                  item?.title === 'Dashboard'
                    ? ''
                    : item?.title === 'Hubungi Disdik'
                      ? '/pertanyaan-siswa/sekolah'
                      : `/${convertToSlug(item?.title)}`
                }
                onClick={() => {
                  setIsOpen(false)
                }}
                className={clsx('flex items-center gap-16 border-b p-16', {
                  'text-danger-300': isActivePage(convertToSlug(item?.title)),
                  'text-balance': !isActivePage(convertToSlug(item?.title)),
                })}
                key={idx}
              >
                <span>{item?.icon}</span>
                <p className="text-[2.4rem]">{item?.title}</p>
              </Link>
            ))}
          </div>

          {token ? (
            <div
              onClick={() => handleLogout()}
              className="flex items-center gap-16 border-b pl-16"
            >
              <div className="flex items-center gap-16 p-16">
                <DoorOpen size={16} />
                <p className="text-[2.4rem]">Logout</p>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-16 border-b pl-16"
            >
              <div className="flex items-center gap-16 p-16">
                <DoorClosed size={16} />
                <p className="text-[2.4rem]">Login</p>
              </div>
            </Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
