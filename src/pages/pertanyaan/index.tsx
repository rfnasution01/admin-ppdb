import { useEffect, useState } from 'react'
import { DetailPertanyaanSiswa } from './detail-pertanyaan-siswa'
import { ListPertanyaanSiswa } from './list-pertanyaan-siswa'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { chatSchema, closeSchema } from '@/libs/schema/ticket-schema'
import {
  useCreateTiketChatMutation,
  useCreateTutupChatMutation,
} from '@/store/slices/pertanyaanAPI'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { getPertanyaanSiswaSlice } from '@/store/reducer/statePertanyaanSiswa'

export default function Pertanyaan() {
  const stateName = useSelector(getPertanyaanSiswaSlice)?.detail

  useEffect(() => {
    if (stateName) {
      setName(stateName)
    }
  }, [stateName])

  const searchParams = new URLSearchParams(location.search)
  const detailParams = searchParams.get('detail')

  const [name, setName] = useState<string>(detailParams ?? stateName ?? '')

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

  // --- Create Close ---
  const [
    createClose,
    {
      isError: isErrorClose,
      isLoading: isLoadingClose,
      error: errorClose,
      isSuccess: isSuccessClose,
    },
  ] = useCreateTutupChatMutation()

  const formClose = useForm<zod.infer<typeof closeSchema>>({
    resolver: zodResolver(closeSchema),
    defaultValues: {},
  })

  const handleSubmitClose = async () => {
    const body = {
      id: name,
    }
    try {
      await createClose({ data: body })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessClose) {
      toast.success('Tiket berhasil ditutup!', {
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
  }, [isSuccessClose])

  useEffect(() => {
    if (isErrorClose) {
      const errorMsg = errorClose as { data?: { message?: string } }

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
  }, [isErrorClose, errorClose])

  return (
    <div className="h-full w-full grid-cols-12 gap-32">
      <div className="grid h-full grid-cols-12 gap-32">
        <div className="scrollbar col-span-5 h-full w-full overflow-y-auto phones:col-span-12">
          <ListPertanyaanSiswa name={name} setName={setName} />
        </div>
        <div className="scrollbar col-span-7 h-full overflow-y-auto phones:col-span-12">
          <DetailPertanyaanSiswa
            name={name}
            form={form}
            formClose={formClose}
            handleSubmit={handleSubmit}
            handleSubmitClose={handleSubmitClose}
            setUrls={setUrls}
            isLoadingClose={isLoadingClose}
            isLoadingUpload={isLoadingUpload}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
