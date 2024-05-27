import Breadcrumb from './Breadcrumbs'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { convertSlugToText } from '@/libs/helpers/format-text'
import clsx from 'clsx'
import { getBiodataSlice } from '@/store/reducer/stateBiodata'
import { enumPendaftaran } from '@/libs/enum/enum-pendaftaran'
import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'
import { useGetVerifikasiByIdQuery } from '@/store/slices/verifikasiAPI'
import { ProfilType } from '@/libs/types/profil-type'
import { useGetProfilQuery } from '@/store/slices/profilAPI'
import { BiodataDokumen } from '@/features/biodata'
import { DataJalur } from './data-jalur'
import { DataBiodata } from './data-biodata'
import { DataPendidikanSebelumnya } from './data-pendidikan-sebelumnya'
import { DataOrangTua } from './data-orang-tua'
import { DataPilihSekolah } from './data-pilih-sekolah'

export default function Pendaftaran() {
  const searchParams = new URLSearchParams(location.search)
  const pageParams = searchParams.get('page')
  const stateBiodata = useSelector(getBiodataSlice)?.page
  const [name, setName] = useState<string>(
    pageParams ?? stateBiodata ?? 'jalur-pendaftaran',
  )
  const idParams = searchParams.get('id')
  const id = idParams ?? null

  const [activeIndex, setActiveIndex] = useState<number>(
    name === 'jalur-pendaftaran'
      ? enumPendaftaran?.JALUR_PENDAFTARAN
      : name === 'informasi-pribadi'
        ? enumPendaftaran?.INFORMASI_PRIBADI
        : name === 'pendidikan-sebelumnya'
          ? enumPendaftaran?.PENDIDIKAN_SEBELUMNYA
          : name === 'orang-tua'
            ? enumPendaftaran.ORANGTUA
            : name === 'kelengkapan-dokumen'
              ? enumPendaftaran.DOKUMEN
              : name === 'pilih-sekolah'
                ? enumPendaftaran?.PilihSEKOLAH
                : enumPendaftaran.JALUR_PENDAFTARAN,
  )

  useEffect(() => {
    if (stateBiodata) {
      setName(stateBiodata)
    }
  }, [stateBiodata])

  // --- Detail ---
  const [jalur, setJalur] = useState<string>()
  const [detail, setDetail] = useState<VerifikasiDetailType>()
  const { data, isLoading, isFetching } = useGetVerifikasiByIdQuery(
    { id: id },
    { skip: id === null || id === undefined },
  )

  useEffect(() => {
    if (data?.data) {
      setDetail(data?.data)
      setJalur(data?.data?.jalur.toLowerCase())
    }
  }, [data?.data])

  const loading = isFetching || isLoading

  // --- Profil ---
  const [profil, setProfil] = useState<ProfilType>()
  const { data: dataProfil } = useGetProfilQuery()

  useEffect(() => {
    if (dataProfil?.data) {
      setProfil(dataProfil?.data)
    }
  }, [dataProfil?.data])

  const jenjang = profil?.identitas?.jenjang

  return (
    <div className="flex h-full flex-col gap-64">
      {/* --- Header --- */}
      <div>
        <Breadcrumb
          setName={setName}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          id={id}
          jenjang={jenjang}
        />
      </div>
      {/* --- Content --- */}
      <div className="scrollbar flex h-full flex-1 justify-center overflow-auto">
        <div
          className={clsx(
            'flex flex-col gap-32 rounded-2xl bg-white p-32 shadow-md phones:w-full',
            {
              'w-full':
                name === 'kelengkapan-dokumen' || name === 'informasi-pribadi',
              'w-4/6': !(
                name === 'kelengkapan-dokumen' || name === 'informasi-pribadi'
              ),
            },
          )}
        >
          <p className="border-b-2 pb-16 text-[3rem]">
            {name === 'informasi-pribadi' ? 'Biodata' : convertSlugToText(name)}
          </p>
          <div className="scrollbar h-full overflow-auto">
            {name === 'jalur-pendaftaran' ? (
              <DataJalur
                setName={setName}
                setActiveIndex={setActiveIndex}
                isLoading={loading}
                id={id}
                item={detail}
              />
            ) : name === 'informasi-pribadi' ? (
              <DataBiodata
                setName={setName}
                setActiveIndex={setActiveIndex}
                item={detail}
                isLoading={loading}
                id={id}
                jenjang={jenjang}
              />
            ) : name === 'pendidikan-sebelumnya' ? (
              <DataPendidikanSebelumnya
                setName={setName}
                setActiveIndex={setActiveIndex}
                item={detail}
                isLoading={loading}
                id={id}
              />
            ) : name === 'orang-tua' ? (
              <DataOrangTua
                setName={setName}
                setActiveIndex={setActiveIndex}
                item={detail}
                isLoading={loading}
                id={id}
                jenjang={jenjang}
              />
            ) : name === 'kelengkapan-dokumen' ? (
              <BiodataDokumen
                setName={setName}
                setActiveIndex={setActiveIndex}
                getProfil={detail}
                isLoading={loading}
                id={id}
                jalur={jalur}
                jenjang={profil?.identitas?.jenjang?.toLowerCase()}
              />
            ) : name === 'pilih-sekolah' ? (
              <DataPilihSekolah
                setName={setName}
                setActiveIndex={setActiveIndex}
                item={detail}
                isLoading={loading}
                id={id}
                jenjang={jenjang}
              />
            ) : (
              <DataJalur
                setName={setName}
                setActiveIndex={setActiveIndex}
                isLoading={loading}
                id={id}
                item={detail}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
