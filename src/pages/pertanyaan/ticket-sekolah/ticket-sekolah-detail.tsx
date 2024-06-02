/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiodataType } from '@/libs/types/biodata-type'
import { NoDetail } from '../no-detail'
import { TiketSekolahTambah } from './ticket-sekolah-tambah'
import { UseFormReturn } from 'react-hook-form'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  TiketSekolahDetailType,
  TiketSekolahType,
} from '@/libs/types/tiket-type'
import {
  useGetTiketDetailSekolahQuery,
  useGetTiketSekolahQuery,
} from '@/store/slices/tiketSekolahAPI'
import { MultiSkeleton } from '@/components/skeleton'
import { MappingDetail } from './mapping-detail'

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
  formClose,
  formChat,
  handleSubmitChat,
  handleSubmitClose,
  isLoadingChat,
  isLoadingClose,
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
  formClose: UseFormReturn
  formChat: UseFormReturn
  handleSubmitChat: (values: any) => Promise<void>
  handleSubmitClose: () => Promise<void>
  isLoadingClose: boolean
  isLoadingChat
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

  const [detail, setDetail] = useState<TiketSekolahDetailType>()
  const {
    data: dataDetail,
    isLoading,
    isFetching,
  } = useGetTiketDetailSekolahQuery({ id: id }, { skip: !id })
  const loading = isLoading || isFetching

  useEffect(() => {
    if (dataDetail?.data) {
      setDetail(dataDetail?.data)
    }
  }, [dataDetail?.data])

  return (
    <div className="flex h-full w-full flex-col gap-32">
      {name ? (
        loading ? (
          <MultiSkeleton />
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
          <MappingDetail
            item={detail}
            form={formChat}
            formClose={formClose}
            handleSubmit={handleSubmitChat}
            handleSubmitClose={handleSubmitClose}
            setUrls={setUrls}
            isLoadingClose={isLoadingClose}
            isLoadingUpload={isLoadingChat}
          />
        )
      ) : (
        <NoDetail />
      )}
    </div>
  )
}
