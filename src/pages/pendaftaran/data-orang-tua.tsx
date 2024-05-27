import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'
import { DataComponent } from './data-component'
import { Dispatch, SetStateAction, useState } from 'react'
import { setStateBiodata } from '@/store/reducer/stateBiodata'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Pencil } from 'lucide-react'
import { ModalEditBiodata } from './modal-edit-biodata'
import { BiodataOrangTua } from '@/features/biodata'

export function DataOrangTua({
  setName,
  setActiveIndex,
  isLoading,
  id,
  item,
  jenjang,
}: {
  setName: Dispatch<SetStateAction<string>>
  setActiveIndex: Dispatch<SetStateAction<number>>
  isLoading: boolean
  id: string
  item?: VerifikasiDetailType
  jenjang: string
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="flex h-full flex-col gap-12">
      <div className="flex h-full gap-32">
        <div className="scrollbar flex h-full w-full flex-1 flex-col gap-32 overflow-auto">
          {/* --- Ayah --- */}
          <div className="flex flex-col gap-16">
            <p className="font-bold underline">Ayah</p>
            <DataComponent
              label="Status"
              value={
                item?.orangtua?.ayah?.status === 'Hidup'
                  ? 'Hidup'
                  : 'Meninggal' ?? '-'
              }
              isOrangTua
            />
            <DataComponent
              label="Nama"
              value={item?.orangtua?.ayah?.nama ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="NIK"
              value={item?.orangtua?.ayah?.nik ?? '-'}
              isOrangTua
            />

            <DataComponent
              label="No. Hp"
              value={item?.orangtua?.ayah?.hp ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="Pendidikan Terakhir"
              value={item?.orangtua?.ayah?.pendidikan ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="Pekerjaan"
              value={item?.orangtua?.ayah?.pekerjaan ?? '-'}
              isOrangTua
            />
          </div>
          {/* --- Ibu --- */}
          <div className="flex flex-col gap-16">
            <p className="font-bold underline">Ibu</p>
            <DataComponent
              label="Status"
              value={
                item?.orangtua?.ibu?.status === 'Hidup'
                  ? 'Hidup'
                  : 'Meninggal' ?? '-'
              }
              isOrangTua
            />
            <DataComponent
              label="Nama"
              value={item?.orangtua?.ibu?.nama ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="NIK"
              value={item?.orangtua?.ibu?.nik ?? '-'}
              isOrangTua
            />

            <DataComponent
              label="No. Hp"
              value={item?.orangtua?.ibu?.hp ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="Pendidikan Terakhir"
              value={item?.orangtua?.ibu?.pendidikan ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="Pekerjaan"
              value={item?.orangtua?.ibu?.pekerjaan ?? '-'}
              isOrangTua
            />
          </div>
          {/* --- Wali --- */}
          <div className="flex flex-col gap-16">
            <p className="font-bold underline">Wali</p>

            <DataComponent
              label="Nama"
              value={item?.orangtua?.wali?.nama ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="NIK"
              value={item?.orangtua?.wali?.nik ?? '-'}
              isOrangTua
            />

            <DataComponent
              label="No. Hp"
              value={item?.orangtua?.wali?.hp ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="Pendidikan Terakhir"
              value={item?.orangtua?.wali?.pendidikan ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="Pekerjaan"
              value={item?.orangtua?.wali?.pekerjaan ?? '-'}
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
              if (jenjang.toLowerCase() === 'sd') {
                setActiveIndex(1)
                setName('informasi-pribadi')
                dispatch(setStateBiodata({ page: 'informasi-pribadi' }))
                navigate(
                  `/permintaan-verifikasi/detail-siswa?id=${id}&page=${'informasi-pribadi'}`,
                )
              } else {
                setActiveIndex(2)
                setName('pendidikan-sebelumnya')
                dispatch(setStateBiodata({ page: 'pendidikan-sebelumnya' }))
                navigate(
                  `/permintaan-verifikasi/detail-siswa?id=${id}&page=${'pendidikan-sebelumnya'}`,
                )
              }
            }}
          >
            Kembali
          </button>
          <button
            className="rounded-2xl bg-danger-100 px-24 py-12 text-danger-tint-1 hover:bg-danger-300 disabled:cursor-not-allowed disabled:bg-white disabled:text-danger-300"
            type="submit"
            onClick={() => {
              setActiveIndex(4)
              setName('kelengkapan-dokumen')
              dispatch(setStateBiodata({ page: 'kelengkapan-dokumen' }))
              navigate(
                `/permintaan-verifikasi/detail-siswa?id=${id}&page=${'kelengkapan-dokumen'}`,
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
          <BiodataOrangTua
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
