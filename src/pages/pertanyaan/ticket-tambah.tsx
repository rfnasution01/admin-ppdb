import { useEffect, useState } from 'react'
import { TiketSekolahDetail, TiketSekolahMain } from './ticket-sekolah'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { tiketSchema } from '@/libs/schema/ticket-schema'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import {
  useCreateTiketSekolahMutation,
  useEditTiketSekolahMutation,
} from '@/store/slices/tiketSekolahAPI'
import { useGetBiodataQuery } from '@/store/slices/biodataAPI'
import { BiodataType } from '@/libs/types/biodata-type'
import 'react-toastify/dist/ReactToastify.css'

export default function TIcketTambah() {
  const [name, setName] = useState<string>('')
  const [id, setId] = useState<string>('')
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

  return (
    <>
      <div className="grid h-full w-full grid-cols-12 flex-col gap-32 ">
        <div className="col-span-5 h-full overflow-y-auto rounded-2xl bg-white p-32 phones:col-span-12">
          <TiketSekolahMain
            setName={setName}
            setSiswa={setSiswa}
            name={name}
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
          />
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
