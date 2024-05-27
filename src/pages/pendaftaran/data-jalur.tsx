import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'
import { DataComponent } from './data-component'
import { enumJalur } from '@/libs/enum/enum-jalur'
import { Dispatch, SetStateAction } from 'react'
import { setStateBiodata } from '@/store/reducer/stateBiodata'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function DataJalur({
  setName,
  setActiveIndex,
  isLoading,
  id,
  item,
}: {
  setName: Dispatch<SetStateAction<string>>
  setActiveIndex: Dispatch<SetStateAction<number>>
  isLoading: boolean
  id: string
  item?: VerifikasiDetailType
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col gap-12">
      <div className="h-full w-full flex-1">
        <DataComponent
          label="Jalur"
          value={
            item?.jalur === enumJalur.AFIRMASI
              ? 'Afirmasi Ekonomi Tidak Mampus'
              : item?.jalur === enumJalur.DISABILITAS
                ? 'Afirmasi Penyandang Disabilitas'
                : item?.jalur === enumJalur.PINDAHTUGAS
                  ? 'Pindah Tugas Orang Tua'
                  : item?.jalur === enumJalur.PRESTASI
                    ? 'Prestasi'
                    : item?.jalur === enumJalur.ZONASI
                      ? 'Zonasi'
                      : 'Zonasi' ?? '-'
          }
        />
      </div>
      {/* --- button --- */}
      <div className="flex items-center justify-end bg-primary-50 p-32">
        <div className="flex items-center gap-16 text-[2rem]">
          <button
            className="rounded-2xl bg-danger-100 px-24 py-12 text-danger-tint-1 hover:bg-danger-300 disabled:cursor-not-allowed disabled:bg-white disabled:text-danger-300"
            type="submit"
            onClick={() => {
              setActiveIndex(1)
              setName('informasi-pribadi')
              dispatch(setStateBiodata({ page: 'informasi-pribadi' }))
              navigate(
                `/permintaan-verifikasi/detail-siswa?id=${id}&page=${'informasi-pribadi'}`,
              )
            }}
            disabled={isLoading}
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  )
}
