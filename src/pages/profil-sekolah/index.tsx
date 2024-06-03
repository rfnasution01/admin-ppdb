import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { profilSekolahSchema } from '@/libs/schema/profil-sekolah-schema'
import { Form } from '@/components/Form'
import { FormIdentitas } from './form-identitas'
import { FormKontak } from './form-kontak'
import { FormKepalaSekolah } from './form-kepala-sekolah'
import { FormOperator } from './form-operator'
import { Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ProfilType } from '@/libs/types/profil-type'
import {
  useCreateProfileMutation,
  useGetProfilQuery,
} from '@/store/slices/profilAPI'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '@/components/Loading'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useGetTiketNotifikasiQuery } from '@/store/slices/pertanyaanAPI'
import { ModalValidasi } from '@/layouts/root-layout/modal-validasi'

export default function ProfilSekolah() {
  // --- Form Schema ---
  const form = useForm<zod.infer<typeof profilSekolahSchema>>({
    resolver: zodResolver(profilSekolahSchema),
    defaultValues: {},
  })

  // --- Profil ---
  const [profil, setProfil] = useState<ProfilType>()
  const { data, isLoading, isFetching, isError, error } = useGetProfilQuery()
  const navigate = useNavigate()

  useEffect(() => {
    if (data?.data) {
      setProfil(data?.data)
    }
    const errorMsg = error as {
      data?: {
        message?: string
      }
    }

    if (errorMsg?.data?.message === 'Token Tidak Sesuai') {
      Cookies.remove('token')
      navigate('/login')
    }
  }, [data?.data, isError, error])

  // --- Create Profil ---
  const [
    createProfil,
    {
      isError: isErrorProfil,
      error: errorProfil,
      isLoading: isLoadingProfil,
      isSuccess: isSuccessProfil,
    },
  ] = useCreateProfileMutation()

  // --- Handle Submit ---
  const handleSubmit = (values) => {
    const body = {
      akreditasi: values?.akreditasi,
      id_kecamatan: values?.kecamatan,
      alamat: values?.alamat,
      telepon: values?.telepon,
      email: values?.email,
      website: values?.website,
      latitude: values?.latitude,
      longitude: values?.longitude,
      nama_kepala_sekolah: values?.nama_kepala_sekolah,
      nip_kepala_sekolah: values?.nip,
      telepon_kepala_sekolah: values?.telepon_kepala_sekolah,
      nama_operator_sekolah: values?.nama_operator,
      telepon_operator_sekolah: values?.telepon_operator,
    }

    try {
      createProfil({ data: body })
    } catch (error) {
      console.log(error)
    }
  }

  // --- Sukses ---
  useEffect(() => {
    if (isSuccessProfil) {
      toast.success(`Profil sekolah berhasil disimpan!`, {
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
  }, [isSuccessProfil])

  // --- Error ---
  useEffect(() => {
    if (isErrorProfil) {
      const errorMsg = errorProfil as {
        data?: {
          message?: string
        }
      }

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
  }, [isErrorProfil, errorProfil])

  const loading = isLoading || isFetching || isLoadingProfil

  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const { data: notifData } = useGetTiketNotifikasiQuery()

  useEffect(() => {
    if (notifData?.jlh > 0) {
      setIsShowModal(true)
    }
  }, [notifData])

  return (
    <>
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loading />
        </div>
      ) : (
        <Form {...form}>
          <form
            className="flex w-full flex-col"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="flex flex-1 flex-col gap-32 pb-32">
              {/* --- Identitas --- */}
              <div className="flex flex-col gap-24">
                <p className="bg-danger-100 p-24 text-left font-bold text-danger-tint-1">
                  Identitas Satuan Pendidikan
                </p>
                <FormIdentitas
                  form={form}
                  profil={profil}
                  isLoading={loading}
                />
              </div>
              {/* --- Kontak --- */}
              <div className="flex flex-col gap-24">
                <p className="bg-danger-100 p-24 text-left font-bold text-danger-tint-1">
                  Kontak
                </p>
                <FormKontak form={form} profil={profil} isLoading={loading} />
              </div>
              {/* --- Kepala Sekolah --- */}
              <div className="flex flex-col gap-24">
                <p className="bg-danger-100 p-24 text-left font-bold text-danger-tint-1">
                  Kepala Sekolah
                </p>
                <FormKepalaSekolah
                  form={form}
                  profil={profil}
                  isLoading={loading}
                />
              </div>
              {/* --- Operator --- */}
              <div className="flex flex-col gap-24">
                <p className="bg-danger-100 p-24 text-left font-bold text-danger-tint-1">
                  Operator
                </p>
                <FormOperator form={form} profil={profil} isLoading={loading} />
              </div>
            </div>
            {/* --- button --- */}
            <div className="flex items-center justify-between bg-danger-100 p-32">
              <p className="text-[2rem] tracking-1.25 text-danger-tint-1">
                * Wajib Diisi
              </p>
              <div className="flex items-center gap-16 text-[2rem]">
                <button
                  disabled={loading}
                  className="flex items-center justify-center gap-12 rounded-2xl bg-white px-24 py-12 text-danger-tint-3 hover:bg-danger-tint-1"
                  type="submit"
                >
                  Simpan
                  <Save size={16} />
                </button>
              </div>
            </div>
            <ToastContainer />
          </form>
        </Form>
      )}
      <ModalValidasi isOpen={isShowModal} setIsOpen={setIsShowModal} />
    </>
  )
}
