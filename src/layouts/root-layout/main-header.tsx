import { ListNavigasi } from '@/libs/dummy/list-navigasi'
import { convertToSlug } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import { useGetTiketNotifikasiQuery } from '@/store/slices/pertanyaanAPI'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import { Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export function MainHeader() {
  const { firstPathname, secondPathname } = usePathname()
  const navigate = useNavigate()

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

  const handleLogout = () => {
    Cookies.remove('token')
    navigate('/login')
  }

  const level = Cookies.get('level')
  const menuOperator = ListNavigasi?.filter(
    (item) => item?.title !== 'Data Operator',
  )

  const menu = level === 'Operator' ? menuOperator : ListNavigasi

  // --- Notifikasi ---
  const { refetch } = useGetTiketNotifikasiQuery()

  return (
    <div className="flex h-full flex-col gap-64">
      {/* --- Logo --- */}
      <Link to="/" className="flex justify-center gap-12 text-center">
        <img src="/img/batubara.png" alt="PPDB" className="w-[4rem]" />
        <div className="flex flex-col items-start justify-start">
          <p>Pemerintah</p>
          <p>Kabupaten Batu Bara</p>
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        {/* --- Navigasi --- */}
        <div className="flex flex-col gap-12">
          {menu.map((item, idx) => (
            <Link
              to={
                item?.title === 'Dashboard'
                  ? ''
                  : item?.title === 'Hubungi Disdik'
                    ? '/pertanyaan-siswa/sekolah'
                    : `/${convertToSlug(item?.title)}`
              }
              key={idx}
              onClick={refetch}
              className={clsx(
                'flex items-center gap-16 border-l-2 px-24 py-8 hover:cursor-pointer hover:border-danger-300 hover:bg-danger-tint-1 hover:bg-opacity-20 hover:text-danger-300',
                {
                  'border-danger-300 bg-danger-tint-1 bg-opacity-20 text-danger-300':
                    isActivePage(convertToSlug(item?.title)),
                  'text-balance border-transparent': !isActivePage(
                    convertToSlug(item?.title),
                  ),
                },
              )}
            >
              {item?.icon}
              <p>{item?.title}</p>
            </Link>
          ))}
        </div>
        <div
          onClick={() => {
            handleLogout()
          }}
          className="flex items-center gap-16 border-l-2 border-transparent px-24 py-8 hover:cursor-pointer hover:border-danger-300 hover:bg-danger-tint-1 hover:bg-opacity-20 hover:text-danger-300"
        >
          <Trash2 size={16} />
          <p>Keluar</p>
        </div>
      </div>
    </div>
  )
}
