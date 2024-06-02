/* eslint-disable @typescript-eslint/no-explicit-any */
import { TiketSekolahDetailType } from '@/libs/types/tiket-type'
import clsx from 'clsx'
import { Loader, Ticket } from 'lucide-react'
import { Form } from '@/components/Form'
import { UseFormReturn } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'
import { PasPhoto } from '../pas-photo'
import { FormChat } from '../form-chat'
import { DetailHistory } from './detail-tiket-history'
import { DetailTiketData } from './detail-tiket-data'

export function MappingDetail({
  item,
  formClose,
  form,
  handleSubmit,
  handleSubmitClose,
  isLoadingClose,
  isLoadingUpload,
  setUrls,
}: {
  item: TiketSekolahDetailType
  formClose: UseFormReturn
  form: UseFormReturn
  handleSubmitClose: () => Promise<void>
  handleSubmit: (values: any) => Promise<void>
  isLoadingUpload: boolean
  isLoadingClose: boolean
  setUrls: Dispatch<SetStateAction<string[]>>
}) {
  return (
    <div className="flex h-full w-full flex-col gap-32">
      {/* --- Header --- */}
      <div className="flex flex-col gap-12 border-b border-[#ccd2da] pb-16">
        <p className="text-[3rem]">{item?.ticket?.judul ?? '-'}</p>
        <div className="flex items-center justify-between">
          <div
            className={clsx('rounded-full px-24 py-8 text-[2rem]', {
              'bg-blue-300 text-blue-700': item?.ticket?.status === 0,
              'bg-orange-300 text-orange-700': item?.ticket?.status === 1,
              'bg-green-300 text-green-700': item?.ticket?.status === 2,
            })}
          >
            {item?.ticket?.status === 1
              ? 'Berlangsung'
              : item?.ticket?.status === 2
                ? 'Selesai'
                : 'Menunggu'}
          </div>
          <div className="flex">
            {item?.ticket?.status !== 2 && (
              <Form {...formClose}>
                <form
                  className="scrollbar flex h-full w-full flex-col gap-32 overflow-auto rounded-2xl border"
                  onSubmit={formClose.handleSubmit(handleSubmitClose)}
                >
                  <button
                    disabled={item?.ticket?.status === 2}
                    type="submit"
                    className="flex items-center gap-12 rounded-full bg-blue-500 px-24 py-12 text-[2rem] text-white hover:bg-blue-700 disabled:hover:cursor-not-allowed"
                  >
                    Tutup Tiket
                    {isLoadingClose ? (
                      <span className="animate-spin duration-300">
                        <Loader size={16} />
                      </span>
                    ) : (
                      <Ticket size={16} />
                    )}
                  </button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
      {/* --- Tiket --- */}
      <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto">
        <div className="flex gap-32">
          {/* --- Image Profil --- */}
          <PasPhoto
            pasPhoto={item?.ticket?.photo}
            name={item?.ticket?.pengirim}
          />
          {/* --- Data Tiket --- */}
          <DetailTiketData detail={item} />
        </div>
        <hr className="border" />

        {/* --- Chat --- */}
        <DetailHistory detail={item} />

        {item?.ticket?.status !== 2 ? (
          <div className="flex gap-32">
            {/* --- Image Profil --- */}
            <PasPhoto
              pasPhoto={item?.ticket?.photo}
              name={item?.ticket?.pengirim}
            />
            {/* --- Data Tiket --- */}
            <FormChat
              form={form}
              handleSubmit={handleSubmit}
              isLoadingUpload={isLoadingUpload}
              setUrls={setUrls}
            />
          </div>
        ) : (
          <div className="rounded-2xl border border-red-300 bg-red-100 p-24 text-red-700">
            Tiket telah ditutup
          </div>
        )}
      </div>
    </div>
  )
}
