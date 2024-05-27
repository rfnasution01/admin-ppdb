import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'
import { DataComponent } from './data-component'
import { Dispatch, SetStateAction, useState } from 'react'
import { setStateBiodata } from '@/store/reducer/stateBiodata'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Pencil } from 'lucide-react'
import { ModalEditBiodata } from './modal-edit-biodata'
import { BiodataPendidikan } from '@/features/biodata'

export function DataPendidikanSebelumnya({
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
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="flex h-full flex-col gap-12">
      <div className="flex h-full gap-32">
        <div className="scrollbar flex h-full w-full flex-1 flex-col gap-32 overflow-auto">
          {/* --- Informasi Pendidikan Sebelumnya --- */}
          <div className="flex flex-col gap-16">
            <DataComponent
              label="NISN"
              value={item?.sekolah?.nisn ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="NPSN"
              value={item?.sekolah?.npsn ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="Nama Sekolah"
              value={item?.sekolah?.nama_sekolah ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="Tahun Lulus"
              value={item?.sekolah?.tahun_lulus ?? '-'}
              isOrangTua
            />
          </div>

          {/* --- Button --- */}
          <button
            className="flex items-center justify-center gap-12 rounded-2xl bg-danger-100 px-24 py-12 text-danger-tint-1 hover:bg-danger-300 disabled:cursor-not-allowed disabled:bg-white disabled:text-danger-300"
            type="submit"
            onClick={() => {
              setIsOpen(true)
            }}
            disabled={isLoading}
          >
            <Pencil size={16} />
            Edit
          </button>
        </div>
      </div>
      {/* --- button --- */}
      <div className="flex items-center justify-end bg-primary-50 p-32">
        <div className="flex items-center gap-16 text-[2rem]">
          <button
            className="rounded-2xl bg-primary-background px-24 py-12 text-white hover:bg-primary-700"
            type="button"
            disabled={isLoading}
            onClick={() => {
              setActiveIndex(1)
              setName('informasi-pribadi')
              dispatch(setStateBiodata({ page: 'informasi-pribadi' }))
              navigate(
                `/permintaan-verifikasi/detail-siswa?id=${id}&page=${'informasi-pribadi'}`,
              )
            }}
          >
            Kembali
          </button>
          <button
            className="rounded-2xl bg-danger-100 px-24 py-12 text-danger-tint-1 hover:bg-danger-300 disabled:cursor-not-allowed disabled:bg-white disabled:text-danger-300"
            type="submit"
            onClick={() => {
              setActiveIndex(3)
              setName('orang-tua')
              dispatch(setStateBiodata({ page: 'orang-tua' }))
              navigate(
                `/permintaan-verifikasi/detail-siswa?id=${id}&page=${'orang-tua'}`,
              )
            }}
            disabled={isLoading}
          >
            Lanjut
          </button>
        </div>
      </div>
      <ModalEditBiodata
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        children={
          <BiodataPendidikan
            getProfil={item}
            isLoading={isLoading}
            id={id}
            setIsOpen={setIsOpen}
          />
        }
      />
    </div>
  )
}
