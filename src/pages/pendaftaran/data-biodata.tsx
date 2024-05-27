import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'
import { DataComponent } from './data-component'
import { Dispatch, SetStateAction, useState } from 'react'
import { setStateBiodata } from '@/store/reducer/stateBiodata'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { Pencil } from 'lucide-react'
import { ModalEditBiodata } from './modal-edit-biodata'
import { BiodataPribadi } from '@/features/biodata'
import clsx from 'clsx'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export function DataBiodata({
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
  const [names, setNames] = useState<string>('akta')

  return (
    <div className="flex h-full flex-col gap-12">
      <div className="flex h-full gap-32">
        <div className="scrollbar flex h-full w-full flex-1 flex-col gap-32 overflow-auto">
          {/* --- Informasi Pribadi --- */}
          <div className="flex flex-col gap-16">
            <p className="font-bold underline">Informasi Pribadi</p>
            <DataComponent
              label="Nama Lengkap"
              value={item?.biodata?.nama ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="Tempat Lahir"
              value={item?.biodata?.tempat_lahir ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="Tanggal Lahir"
              value={
                dayjs(item?.biodata?.tanggal_lahir)
                  .locale('id')
                  .format('DD MMMM YYYY') ?? '-'
              }
              isOrangTua
            />

            <DataComponent
              label="NIK"
              value={item?.biodata?.nik ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="KK"
              value={item?.biodata?.nomor_kk ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="No. Hp"
              value={item?.biodata?.telepon ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="Jenis Kelamin"
              isOrangTua
              value={
                item?.biodata?.jenis_kelamin === 'L'
                  ? 'Laki-laki'
                  : 'Perempuan' ?? '-'
              }
            />
            <DataComponent
              label="Agama"
              value={item?.biodata?.agama ?? '-'}
              isOrangTua
            />
          </div>
          {/* --- Alamat --- */}
          <div className="flex flex-col gap-16">
            <p className="font-bold underline ">Alamat</p>
            <DataComponent
              label="Provinsi"
              value={item?.biodata?.provinsi ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="Kabupaten"
              value={item?.biodata?.kabupaten ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="Kecamatan"
              value={item?.biodata?.kecamatan ?? '-'}
              isOrangTua
            />

            <DataComponent
              label="Desa"
              value={item?.biodata?.desa ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="Dusun"
              value={item?.biodata?.dusun ?? '-'}
              isOrangTua
            />
            <DataComponent
              label="Alamat"
              value={item?.biodata?.alamat_lengkap ?? '-'}
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
        <div className="flex h-full w-full flex-1 flex-col gap-12">
          <div className="flex">
            <p
              onClick={() => setNames('akta')}
              className={clsx('flex-1 hover:cursor-pointer', {
                'text-danger-100': names === 'akta',
                'text-black': names !== 'akta',
              })}
            >
              Lihat Akta Lahir
            </p>
            <p
              onClick={() => setNames('kk')}
              className={clsx('flex-1 hover:cursor-pointer', {
                'text-danger-100': names === 'kk',
                'text-black': names !== 'kk',
              })}
            >
              Lihat Kartu Keluarga
            </p>
          </div>
          <div className="scrollbar h-full w-full flex-1 overflow-auto">
            <Zoom>
              <img
                src={
                  names === 'akta'
                    ? item?.dokumen?.find((item) => item?.id === '3')?.dok_siswa
                    : item?.dokumen?.find((item) => item?.id === '4')?.dok_siswa
                }
                alt={names === 'akta' ? 'Akta' : 'KK'}
                className="h-full w-full"
                style={{ cursor: 'pointer' }}
              />
            </Zoom>
          </div>
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
              setActiveIndex(0)
              setName('jalur-pendaftaran')
              dispatch(setStateBiodata({ page: 'jalur-pendaftaran' }))
              navigate(
                `/permintaan-verifikasi/detail-siswa?id=${id}&page=${'jalur-pendaftaran'}`,
              )
            }}
          >
            Kembali
          </button>
          <button
            className="rounded-2xl bg-danger-100 px-24 py-12 text-danger-tint-1 hover:bg-danger-300 disabled:cursor-not-allowed disabled:bg-white disabled:text-danger-300"
            type="submit"
            onClick={() => {
              if (jenjang.toLowerCase() === 'sd') {
                setActiveIndex(3)
                setName('orang-tua')
                dispatch(setStateBiodata({ page: 'orang-tua' }))
                navigate(
                  `/permintaan-verifikasi/detail-siswa?id=${id}&page=${'orang-tua'}`,
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
          <BiodataPribadi
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
