/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiodataType } from '@/libs/types/biodata-type'
import { NoDetail } from '../no-detail'
import { TiketSekolahTambah } from './ticket-sekolah-tambah'
import { UseFormReturn } from 'react-hook-form'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { TiketSekolahType } from '@/libs/types/tiket-type'
import { useGetTiketSekolahQuery } from '@/store/slices/tiketSekolahAPI'

export function TiketSekolahDetail({
  name,
  siswa,
  biodata,
  handleSubmit,
  form,
  isLoadingUpload,
  setUrls,
  setSiswa,
  handleSubmitEdit,
  isLoadingUploadEdit,
  id,
}: {
  name: string
  siswa: number
  biodata: BiodataType
  handleSubmit: (values: any) => Promise<void>
  handleSubmitEdit: (values: any) => Promise<void>
  form: UseFormReturn
  isLoadingUpload: boolean
  isLoadingUploadEdit: boolean
  setUrls: Dispatch<SetStateAction<string[]>>
  setSiswa: Dispatch<SetStateAction<number>>
  id: string
}) {
  const [listTiket, setListTiket] = useState<TiketSekolahType[]>([])

  // --- Tiket Sekolah ---
  const { data } = useGetTiketSekolahQuery({
    status: -1,
    search: '',
    page: 1,
    page_size: 10000,
    id_masalah: '',
  })

  useEffect(() => {
    if (data) {
      setListTiket(data?.data)
    }
  }, [data])

  const dataEdit = listTiket?.find((item) => item?.id === id)

  return (
    <div className="flex h-full w-full flex-col gap-32">
      {name === '' ? (
        <NoDetail />
      ) : name === 'tambah' ? (
        <TiketSekolahTambah
          siswa={siswa}
          handleSubmit={handleSubmit}
          setUrls={setUrls}
          form={form}
          isLoadingUpload={isLoadingUpload}
          biodata={biodata}
          setSiswa={setSiswa}
        />
      ) : name === 'edit' ? (
        <TiketSekolahTambah
          siswa={siswa}
          handleSubmitEdit={handleSubmitEdit}
          setUrls={setUrls}
          form={form}
          isLoadingEdit={isLoadingUploadEdit}
          biodata={biodata}
          setSiswa={setSiswa}
          isEdit
          data={dataEdit}
        />
      ) : (
        'no'
      )}
    </div>
  )
}
