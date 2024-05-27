import { Link } from 'react-router-dom'
import './dokumen.css'
import { NoData } from '@/components/NoData'
import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { SetujuSchema, TolakSchema } from '@/libs/schema/operator-schema'
import { useCreateVerifikasiDokumenMutation } from '@/store/slices/verifikasiAPI'
import { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ModalValidasi } from './modal-validasi'
import { Form } from '@/components/Form'
import { FormLabelComponent } from './form-label-component'
import { FileUploadForm } from './form-upload'

export function FormDokumen({
  getProfil,
  isLoading,
  id,
}: {
  getProfil: VerifikasiDetailType
  isLoading: boolean
  id: string
}) {
  const [isShowSetuju, setIsShowSetuju] = useState<boolean>(false)
  const [isShowTolak, setIsShowTolak] = useState<boolean>(false)

  // --- Form Schema ---
  const formTolak = useForm<zod.infer<typeof TolakSchema>>({
    resolver: zodResolver(TolakSchema),
    defaultValues: {},
  })

  const formSetuju = useForm<zod.infer<typeof SetujuSchema>>({
    resolver: zodResolver(SetujuSchema),
    defaultValues: {},
  })

  // --- Create Validasi ---
  const [
    createValidasi,
    {
      isError: isErrorValidasi,
      error: errorValidasi,
      isLoading: isLoadingValidasi,
      isSuccess: isSuccessValidasi,
    },
  ] = useCreateVerifikasiDokumenMutation()

  const [idDokumen, setIdDokumen] = useState<string>('')

  const handleSubmitSetuju = async (values) => {
    const body = {
      id: id,
      id_dokumen: idDokumen,
      status: '1',
      komentar: values.komentar,
    }

    try {
      await createValidasi({ data: body }).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitTolak = async (values) => {
    const body = {
      id: id,
      id_dokumen: idDokumen,
      status: '2',
      komentar: values?.komentar,
    }

    try {
      await createValidasi({ data: body })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isSuccessValidasi) {
      toast.success(`Validasi berhasil disimpan!`, {
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
        setIsShowSetuju(false)
        setIsShowTolak(false)
      }, 2000)
    }
  }, [isSuccessValidasi])

  useEffect(() => {
    if (isErrorValidasi) {
      const errorMsg = errorValidasi as {
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
  }, [isErrorValidasi, errorValidasi])

  return (
    <div>
      <table className="w-full flex-1 border-collapse text-[2.4rem]">
        <thead className="relative z-10 align-top leading-medium">
          <tr className="border-b-[1.6rem] border-transparent">
            <th className="no sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
              No
            </th>
            <th className="file sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
              File
            </th>
            <th className="upload sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
              Unggah
            </th>
            <th className="status sticky top-0 text-nowrap border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
              Status Verifikasi
            </th>
          </tr>
        </thead>
        <tbody>
          {getProfil?.dokumen?.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <NoData />
              </td>
            </tr>
          ) : (
            <>
              {getProfil?.dokumen?.map((item, idx) => (
                <tr
                  className="w-full border-b-[1.6rem] border-transparent transition-all ease-in odd:bg-surface-disabled hover:cursor-pointer hover:bg-warning-tint-2"
                  key={idx}
                >
                  <td className="px-24 py-12 text-center align-top leading-medium">
                    {idx + 1}
                  </td>
                  <td className="px-24 py-12 align-top leading-medium">
                    <div className="flex flex-col gap-8">
                      <p className="font-bold">
                        {item?.nama}{' '}
                        {item?.status && (
                          <span className="font-medium text-danger">
                            ({item?.status})
                          </span>
                        )}
                      </p>
                      <div className="text-[2rem] font-light text-slate-500 phones:text-[2.4rem]">
                        {item?.keterangan}{' '}
                        <Link
                          to={item?.format}
                          className="rounded-lg text-[2rem] italic text-primary phones:text-[2.4rem]"
                          target="_blank"
                        >
                          Lihat Format
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="px-24 py-12 align-top leading-medium">
                    <FileUploadForm
                      id_dokumen={item?.id}
                      format={item?.pasfoto}
                      status_verifikasi={item?.status_verifikasi}
                      isLoading={isLoading}
                      dok_siswa={item?.dok_siswa}
                      setIsShowSetuju={setIsShowSetuju}
                      setIsShowTolak={setIsShowTolak}
                      setIsIdDokumen={setIdDokumen}
                      id={item?.id}
                    />
                  </td>

                  <td className="px-24 py-12 align-top leading-medium">
                    <div className="flex flex-col gap-8">
                      {item?.status_verifikasi === 1 ? (
                        <p className="rounded-full bg-emerald-100 px-24 py-8 text-[1.8rem] text-emerald-700 phones:text-[2.2rem]">
                          Sudah Di Verifikasi
                        </p>
                      ) : item?.status_verifikasi === 2 ? (
                        <p className="rounded-full bg-rose-100 px-24 py-8 text-[1.8rem] text-rose-700 phones:text-[2.2rem]">
                          Verifikasi Gagal
                        </p>
                      ) : (
                        <p className="rounded-full bg-slate-100 px-24 py-8 text-[1.8rem] text-slate-700 phones:text-[2.2rem]">
                          Belum Di Verifikasi
                        </p>
                      )}
                      {item?.status_verifikasi > 0 && (
                        <p>Petugas: {item?.petugas}</p>
                      )}
                      {item?.status_verifikasi === 2 && (
                        <p>Komentar: {item?.komentar}</p>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </>
          )}
          <ModalValidasi
            isOpen={isShowSetuju}
            setIsOpen={setIsShowSetuju}
            children={
              <div className="flex w-full flex-col gap-32 text-[2rem]">
                <p>Apakah setuju ingin memvalidasi file?</p>
                <Form {...formSetuju}>
                  <form
                    className="scrollbar flex h-full w-full flex-col gap-32 overflow-auto"
                    onSubmit={formSetuju.handleSubmit(handleSubmitSetuju)}
                  >
                    <div className="hidden">
                      <FormLabelComponent
                        form={formSetuju}
                        label="Komentar"
                        placeHolder="Masukkan Komentar"
                        name="komentar"
                        type="text"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-12">
                      <button
                        disabled={isLoadingValidasi}
                        className="rounded-lg bg-rose-700 px-24 py-12 text-center text-white hover:bg-rose-900"
                        type="button"
                        onClick={() => setIsShowSetuju(false)}
                      >
                        Tidak
                      </button>
                      <button
                        disabled={isLoadingValidasi}
                        className="rounded-lg bg-green-700 px-24 py-12 text-center text-white hover:bg-green-900"
                        type="submit"
                      >
                        Ya
                      </button>
                    </div>
                  </form>
                </Form>
              </div>
            }
          />

          <ModalValidasi
            isOpen={isShowTolak}
            setIsOpen={setIsShowTolak}
            children={
              <div className="flex w-full flex-col gap-32 text-[2rem]">
                <p>Apakah setuju ingin menolak file ini?</p>
                <Form {...formTolak}>
                  <form
                    className="scrollbar flex h-full w-full flex-col gap-32 overflow-auto"
                    onSubmit={formTolak.handleSubmit(handleSubmitTolak)}
                  >
                    <FormLabelComponent
                      form={formTolak}
                      label="Komentar"
                      placeHolder="Masukkan Komentar"
                      name="komentar"
                      type="text"
                    />

                    <div className="flex items-center justify-end gap-12">
                      <button
                        disabled={isLoadingValidasi}
                        className="rounded-lg bg-rose-700 px-24 py-12 text-center text-white hover:bg-rose-900"
                        type="button"
                        onClick={() => setIsShowTolak(false)}
                      >
                        Tidak
                      </button>
                      <button
                        disabled={isLoadingValidasi}
                        className="rounded-lg bg-green-700 px-24 py-12 text-center text-white hover:bg-green-900"
                        type="submit"
                      >
                        Ya
                      </button>
                    </div>
                  </form>
                </Form>
              </div>
            }
          />
        </tbody>
      </table>
    </div>
  )
}
