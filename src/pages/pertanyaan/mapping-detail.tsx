import { TiketDetailType } from '@/libs/types/tiket-type'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { PasPhoto } from './pas-photo'
import { DetailTiketData } from './detail-tiket-data'
import { DetailHistory } from './detail-tiket-history'
import { FormChat } from './form-chat'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { chatSchema } from '@/libs/schema/ticket-schema'
import { useCreateTiketChatMutation } from '@/store/slices/pertanyaanAPI'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

export function MappingDetail({
  item,
  name,
}: {
  item: TiketDetailType
  name: string
}) {
  const [urls, setUrls] = useState<string[]>([])

  // --- Form Schema ---
  const form = useForm<zod.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: {},
  })

  // --- Create Upload ---
  const [
    createUpload,
    {
      isError: isErrorUpload,
      error: errorUpload,
      isLoading: isLoadingUpload,
      isSuccess: isSuccessUpload,
    },
  ] = useCreateTiketChatMutation()

  const handleSubmit = async (values) => {
    const body = {
      id: name,
      isi: values?.isi,
      berkas: urls,
    }
    try {
      await createUpload({ data: body })
    } catch (error) {
      console.error('Gagal mengunggah file:', error)
    }
  }

  useEffect(() => {
    if (isSuccessUpload) {
      toast.success('Pesan berhasil dikirim!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      form.reset()
      setUrls([])
      //   window.location.reload()
    }
  }, [isSuccessUpload])

  useEffect(() => {
    if (isErrorUpload) {
      const errorMsg = errorUpload as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [isErrorUpload, errorUpload])

  return (
    <div className="flex h-full w-full flex-col gap-32">
      {/* --- Header --- */}
      <div className="flex flex-col gap-12 border-b border-[#ccd2da] pb-16">
        <p className="text-[3rem]">{item?.ticket?.judul ?? '-'}</p>
        <div className="flex">
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
        </div>
      </div>
      {/* --- Tiket --- */}
      <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto">
        <div className="flex gap-32">
          {/* --- Image Profil --- */}
          <PasPhoto pasPhoto={item?.ticket?.photo} name={item?.ticket?.nama} />
          {/* --- Data Tiket --- */}
          <DetailTiketData detail={item} />
        </div>
        <hr className="border" />

        {/* --- Chat --- */}
        <DetailHistory detail={item} />

        <div className="flex gap-32">
          {/* --- Image Profil --- */}
          <PasPhoto pasPhoto={item?.ticket?.photo} name={item?.ticket?.nama} />
          {/* --- Data Tiket --- */}
          <FormChat
            form={form}
            handleSubmit={handleSubmit}
            isLoadingUpload={isLoadingUpload}
            setUrls={setUrls}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
