/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiodataType } from '@/libs/types/biodata-type'
import { Dispatch, SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormTiket } from './form-tambah'
import { TiketSekolahType } from '@/libs/types/tiket-type'

export function TiketSekolahTambah({
  siswa,
  handleSubmit,
  form,
  isLoadingUpload,
  setUrls,
  biodata,
  setSiswa,
  isEdit,
  data,
  handleSubmitEdit,
  isLoadingEdit,
}: {
  siswa: number
  biodata: BiodataType
  form: UseFormReturn
  isEdit?: boolean
  setUrls: Dispatch<SetStateAction<string[]>>
  setSiswa: Dispatch<SetStateAction<number>>
  data?: TiketSekolahType
  handleSubmitEdit?: (values: any) => Promise<void>
  handleSubmit?: (values: any) => Promise<void>
  isLoadingUpload?: boolean
  isLoadingEdit?: boolean
}) {
  return (
    <div className="flex h-full flex-col gap-32">
      <div className="flex flex-col gap-12">
        <p className="text-[2.8rem] font-bold">
          {isEdit ? 'Edit' : 'Tambah'} Tiket Sekolah
        </p>
        <p>
          Silahkan sampaikan keluhan Anda dengan mengisi formulir di bawah ini
        </p>
      </div>

      <div className="scrollbar flex h-full w-full flex-1 flex-col gap-32 overflow-y-auto">
        {/* --- Info Biodata --- */}
        <div className="flex w-full items-center gap-32 text-[2rem] phones:w-full">
          <div className="flex w-1/2 flex-col gap-12">
            <p>Operator</p>
            <div className="flex rounded-lg bg-[#d9d9d9] p-16 hover:cursor-not-allowed">
              {biodata?.nama ?? '-'}
            </div>
          </div>
          <div className="flex w-1/2 flex-col gap-12">
            <p>Sekolah</p>
            <div className="flex rounded-lg bg-[#d9d9d9] p-16 text-[2rem] hover:cursor-not-allowed">
              {biodata?.sekolah ?? '-'}
            </div>
          </div>
        </div>

        {/* --- Form --- */}
        <FormTiket
          form={form}
          handleSubmit={handleSubmit}
          handleSubmitEdit={handleSubmitEdit}
          isLoadingUpload={isLoadingUpload}
          isLoadingEdit={isLoadingEdit}
          setUrls={setUrls}
          siswa={siswa}
          setSiswa={setSiswa}
          isEdit={isEdit}
          data={data}
        />
      </div>
    </div>
  )
}
