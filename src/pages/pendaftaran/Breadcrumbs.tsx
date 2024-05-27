import { Dispatch, SetStateAction } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { convertToSlug } from '@/libs/helpers/format-text'
import clsx from 'clsx'
import { setStateBiodata } from '@/store/reducer/stateBiodata'

export default function Breadcrumb({
  setName,
  activeIndex,
  setActiveIndex,
  id,
  jenjang,
}: {
  setName: Dispatch<SetStateAction<string>>
  activeIndex: number
  setActiveIndex: Dispatch<SetStateAction<number>>
  id: string
  jenjang: string
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const menu = [
    'Jalur Pendaftaran',
    'Informasi Pribadi',
    'Pendidikan Sebelumnya',
    'Orang Tua',
    'Kelengkapan Dokumen',
    'Pilih Sekolah',
  ]

  const menuSD = menu?.filter((item) => item !== 'Pendidikan Sebelumnya')

  const filteredMenu = jenjang?.toLowerCase() === 'sd' ? menuSD : menu

  const isSD = (id: number) => {
    if (
      (jenjang?.toLowerCase() === 'sd' && id === 3) ||
      (jenjang?.toLowerCase() === 'sd' && id === 4) ||
      (jenjang?.toLowerCase() === 'sd' && id === 5)
    ) {
      return id - 1
    }
    return id
  }

  const isSDOnClick = (id: number) => {
    if (
      (jenjang?.toLowerCase() === 'sd' && id === 3) ||
      (jenjang?.toLowerCase() === 'sd' && id === 4) ||
      (jenjang?.toLowerCase() === 'sd' && id === 5)
    ) {
      return id + 1
    }
    return id
  }

  const menuCondition = (idx: number) => {
    return idx <= 5
  }

  return (
    <div className="breadcrumb scrollbar flex overflow-auto text-center">
      {filteredMenu.map((item, idx) => (
        <a
          href="#"
          className={clsx('', {
            'breadcrumb__step--active breadcrumb__step':
              isSD(activeIndex) === idx,
            'breadcrumb__status--active breadcrumb__status':
              !(isSD(activeIndex) === idx) && menuCondition(idx),
            'breadcrumb__step hover:cursor-not-allowed':
              !(isSD(activeIndex) === idx) && !menuCondition(idx),
          })}
          key={idx}
          onClick={() => {
            if (activeIndex > idx || menuCondition(idx)) {
              setActiveIndex(isSDOnClick(idx))
              setName(convertToSlug(item))
              dispatch(setStateBiodata({ page: convertToSlug(item) }))
              navigate(
                `/permintaan-verifikasi/detail-siswa?id=${id}&page=${convertToSlug(item)}`,
              )
            }
          }}
        >
          <p className="text-nowrap">{item}</p>
        </a>
      ))}
    </div>
  )
}
