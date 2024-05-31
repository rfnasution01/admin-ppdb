/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { NoDetail } from './no-detail'
import { TiketDetailType } from '@/libs/types/tiket-type'
import { useGetTiketDetailQuery } from '@/store/slices/pertanyaanAPI'
import { MultiSkeleton } from '@/components/skeleton'
import { MappingDetail } from './mapping-detail'
import { UseFormReturn } from 'react-hook-form'

export function DetailPertanyaanSiswa({
  name,
  formClose,
  form,
  handleSubmit,
  handleSubmitClose,
  isLoadingClose,
  isLoadingUpload,
  setUrls,
}: {
  name: string
  formClose: UseFormReturn
  form: UseFormReturn
  handleSubmitClose: () => Promise<void>
  handleSubmit: (values: any) => Promise<void>
  isLoadingUpload: boolean
  isLoadingClose: boolean
  setUrls: Dispatch<SetStateAction<string[]>>
}) {
  const [detail, setDetail] = useState<TiketDetailType>()
  const { data, isLoading, isFetching } = useGetTiketDetailQuery(
    { id: name },
    { skip: !name },
  )
  const loading = isLoading || isFetching

  useEffect(() => {
    if (data?.data) {
      setDetail(data?.data)
    }
  }, [data?.data])
  return (
    <div className="flex h-full flex-col gap-32 rounded-2xl bg-white p-32">
      {name ? (
        loading ? (
          <MultiSkeleton />
        ) : (
          <MappingDetail
            item={detail}
            form={form}
            formClose={formClose}
            handleSubmit={handleSubmit}
            handleSubmitClose={handleSubmitClose}
            setUrls={setUrls}
            isLoadingClose={isLoadingClose}
            isLoadingUpload={isLoadingUpload}
          />
        )
      ) : (
        <NoDetail />
      )}
    </div>
  )
}
