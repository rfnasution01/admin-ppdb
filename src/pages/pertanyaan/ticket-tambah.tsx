import { useEffect, useState } from 'react'
import { TiketSekolahDetail, TiketSekolahMain } from './ticket-sekolah'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  chatSchema,
  closeSchema,
  tiketSchema,
} from '@/libs/schema/ticket-schema'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import {
  useCreateTiketChatSekolahMutation,
  useCreateTiketSekolahMutation,
  useCreateTutupChatSekolahMutation,
  useEditTiketSekolahMutation,
} from '@/store/slices/tiketSekolahAPI'
import { useGetBiodataQuery } from '@/store/slices/biodataAPI'
import { BiodataType } from '@/libs/types/biodata-type'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { getPertanyaanSekolahSlice } from '@/store/reducer/statePertanyaanSekolah'

export default function TIcketTambah() {
  const stateName = useSelector(getPertanyaanSekolahSlice)?.page
  const stateId = useSelector(getPertanyaanSekolahSlice)?.detail

  useEffect(() => {
    if (stateName) {
      setName(stateName)
    }
  }, [stateName])

  useEffect(() => {
    if (stateId) {
      setId(stateId)
    }
  }, [stateId])

  const searchParams = new URLSearchParams(location.search)
  const detailParams = searchParams.get('page')
  const idParams = searchParams.get('id')

  const [name, setName] = useState<string>(detailParams ?? stateName ?? '')

  const [id, setId] = useState<string>(idParams ?? stateId ?? null)
  const [siswa, setSiswa] = useState<number>()

  const [urls, setUrls] = useState<string[]>([])

  // --- Form Schema ---
  const form = useForm<zod.infer<typeof tiketSchema>>({
    resolver: zodResolver(tiketSchema),
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
  ] = useCreateTiketSekolahMutation()

  const handleSubmit = async (values) => {
    const body = {
      judul: values?.judul,
      keterangan: values?.keterangan,
      berkas: urls,
      id_masalah: values?.idMasalah,
      id_pendaftaran: values?.idPendaftaran ?? null,
    }
    try {
      await createUpload({ data: body })
    } catch (error) {
      console.error('Gagal mengunggah file:', error)
    }
  }

  useEffect(() => {
    if (isSuccessUpload) {
      toast.success('Tiket berhasil dibuat!', {
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
      setTimeout(() => {
        form.reset()
        setUrls([])
        setName('')
      }, 2000)
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

  // --- Profil ---
  const [profil, setProfil] = useState<BiodataType>()
  const { data: getProfil } = useGetBiodataQuery()

  useEffect(() => {
    if (getProfil?.data) {
      setProfil(getProfil?.data)
    }
  }, [getProfil?.data])

  // --- Create Edit ---
  const [
    createEdit,
    {
      isError: isErrorEdit,
      error: errorEdit,
      isLoading: isLoadingEdit,
      isSuccess: isSuccessEdit,
    },
  ] = useEditTiketSekolahMutation()

  const handleSubmitEdit = async (values) => {
    const body = {
      id: id,
      judul: values?.judul,
      keterangan: values?.keterangan,
      berkas: urls,
      id_masalah: values?.idMasalah,
      id_pendaftaran: values?.idPendaftaran ?? null,
    }
    try {
      await createEdit({ data: body })
    } catch (error) {
      console.error('Gagal mengunggah file:', error)
    }
  }

  useEffect(() => {
    if (isSuccessEdit) {
      toast.success('Tiket berhasil diedit!', {
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
      setTimeout(() => {
        form.reset()
        setUrls([])
        setName(``)
      }, 2000)
    }
  }, [isSuccessEdit])

  useEffect(() => {
    if (isErrorEdit) {
      const errorMsg = errorEdit as { data?: { message?: string } }

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
  }, [isErrorEdit, errorEdit])

  // --- Form Schema ---
  const formChat = useForm<zod.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: {},
  })

  // --- Create Chat ---
  const [
    createChat,
    {
      isError: isErrorChat,
      error: errorChat,
      isLoading: isLoadingChat,
      isSuccess: isSuccessChat,
    },
  ] = useCreateTiketChatSekolahMutation()

  const handleSubmitChat = async (values) => {
    const body = {
      id: id,
      isi: values?.isi,
      berkas: urls,
    }
    try {
      await createChat({ data: body })
    } catch (error) {
      console.error('Gagal mengunggah file:', error)
    }
  }

  useEffect(() => {
    if (isSuccessChat) {
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
  }, [isSuccessChat])

  useEffect(() => {
    if (isErrorChat) {
      const errorMsg = errorChat as { data?: { message?: string } }

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
  }, [isErrorChat, errorChat])

  // --- Create Close ---
  const [
    createClose,
    {
      isError: isErrorClose,
      isLoading: isLoadingClose,
      error: errorClose,
      isSuccess: isSuccessClose,
    },
  ] = useCreateTutupChatSekolahMutation()

  const formClose = useForm<zod.infer<typeof closeSchema>>({
    resolver: zodResolver(closeSchema),
    defaultValues: {},
  })

  const handleSubmitClose = async () => {
    const body = {
      id: id,
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
    <>
      <div className="grid h-full w-full grid-cols-12 flex-col gap-32 ">
        <div className="col-span-5 h-full overflow-y-auto rounded-2xl bg-white p-32 phones:col-span-12">
          <TiketSekolahMain
            setName={setName}
            setSiswa={setSiswa}
            name={id}
            setId={setId}
          />
        </div>
        <div className="col-span-7 h-full overflow-auto rounded-2xl  bg-white p-32 phones:col-span-12">
          <TiketSekolahDetail
            name={name}
            siswa={siswa}
            biodata={profil}
            handleSubmit={handleSubmit}
            handleSubmitEdit={handleSubmitEdit}
            form={form}
            isLoadingUpload={isLoadingUpload}
            isLoadingUploadEdit={isLoadingEdit}
            setUrls={setUrls}
            setSiswa={setSiswa}
            id={id}
            handleSubmitChat={handleSubmitChat}
            handleSubmitClose={handleSubmitClose}
            isLoadingChat={isLoadingChat}
            isLoadingClose={isLoadingClose}
            formChat={formChat}
            formClose={formClose}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
