import { Loader2, Plus, ShieldBan, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ModalTambahPrestasi } from './modal-tambah-prestasi'
import Zoom from 'react-medium-image-zoom'
import dayjs from 'dayjs'
import { MenubarPrestasi } from './menubar-prestasi'
import { ModalEditPrestasi } from './modal-edit-prestasi'
import { ModalDeletePrestasi } from './modal-delete-prestasi'
import { NoData } from '@/components/NoData'
import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'
import { DataComponent } from './data-component'
import { DataComponent2 } from './data-component2'
import { ModalValidasi } from './modal-validasi'
import { useCreateVerifikasiPrestasiMutation } from '@/store/slices/verifikasiAPI'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FormLabelComponent } from './form-label-component'
import { Form } from '@/components/Form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { TolakPrestasi } from '@/libs/schema/operator-schema'
import clsx from 'clsx'

export function BiodataPrestasi({
  getProfil,
  id,
}: {
  getProfil: VerifikasiDetailType
  id: string
}) {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [name, setName] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState<number | null>(null)
  const [isShowSetuju, setIsShowSetuju] = useState<boolean>(false)
  const [isShowTolak, setIsShowTolak] = useState<boolean>(false)

  // --- Form Schema ---
  const form = useForm<zod.infer<typeof TolakPrestasi>>({
    resolver: zodResolver(TolakPrestasi),
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
  ] = useCreateVerifikasiPrestasiMutation()

  const [idDokumen, setIdDokumen] = useState<string>('')

  const handleSubmitSetuju = async () => {
    const body = {
      id: id,
      id_prestasi: idDokumen,
      validasi: '1',
    }

    try {
      await createValidasi({ data: body })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitTolak = async (values) => {
    const body = {
      id: id,
      id_prestasi: idDokumen,
      validasi: '2',
      catatan: values?.catatan,
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
    <div className="flex w-full flex-col">
      <div className="flex flex-1 flex-col gap-32 pb-32">
        <p className="font-bold">Prestasi</p>
        <div className="flex">
          <button
            type="button"
            onClick={() => setIsShow(true)}
            className="flex items-center gap-12 rounded-lg bg-green-700 px-24 py-12 text-white hover:bg-green-900"
          >
            <Plus size={16} /> Tambah
          </button>
        </div>

        {/* --- Dokumen --- */}
        <div className="w-full overflow-x-auto">
          <table className="w-full flex-1 border-collapse text-[2.4rem]">
            <thead className="relative z-10 align-top leading-medium">
              <tr className="border-b-[1.6rem] border-transparent">
                <th className="sticky top-0 w-[5%] border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                  No
                </th>
                <th className="sticky top-0 w-[30%] border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                  Nama Prestasi
                </th>
                <th className="sticky top-0 w-[20%] border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                  Informasi Prestasi
                </th>
                <th className="sticky top-0 w-[20%] text-nowrap border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                  Konfirmasi
                </th>
                <th className="sticky top-0 w-[20%] text-nowrap border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                  Info
                </th>
                <th className="sticky top-0 w-[5%] text-nowrap border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {getProfil?.prestasi?.data.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <NoData />
                  </td>
                </tr>
              ) : (
                <>
                  {getProfil?.prestasi?.data?.map((item, idx) => (
                    <tr
                      key={idx}
                      onClick={() => setModalIsOpen(idx)}
                      className="w-full border-b-[1.6rem] border-transparent transition-all ease-in odd:bg-surface-disabled hover:cursor-pointer hover:bg-warning-tint-2"
                    >
                      <td className="px-24 py-12 leading-medium">{idx + 1}</td>
                      <td className="px-24 py-12 leading-medium">
                        <p>{item?.nama_prestasi}</p>
                      </td>
                      <td className="px-24 py-12 leading-medium">
                        <div className="flex flex-col gap-8">
                          <DataComponent2
                            label="Tingkat"
                            value={item?.tingkat}
                          />
                          <DataComponent2 label="Juara" value={item?.juara} />
                          <DataComponent2 label="Kelas" value={item?.kelas} />
                          <DataComponent2
                            label="Penyelenggara"
                            value={item?.penyelenggara}
                          />
                        </div>
                      </td>

                      <td className="px-24 py-12 align-top leading-medium">
                        <div className="flex flex-col gap-8">
                          <Zoom>
                            <img
                              src={item?.sertifikat}
                              alt="File Gambar"
                              className="h-full w-full"
                              style={{ cursor: 'pointer' }}
                            />
                          </Zoom>
                          <button
                            disabled={item?.validasi !== 0}
                            type="button"
                            className={`rounded-2xl bg-green-700 px-24 py-12 text-center  text-[2rem] text-white hover:bg-green-900 disabled:hover:cursor-not-allowed`}
                            onClick={() => {
                              setIsShowSetuju(true)
                              setIdDokumen(item?.id)
                            }}
                          >
                            Verifikasi
                          </button>
                          <button
                            type="button"
                            disabled={item?.validasi !== 0}
                            className="rounded-2xl bg-rose-700 px-24 py-12 text-center  text-[2rem] text-white hover:bg-rose-900 disabled:cursor-not-allowed"
                            onClick={() => {
                              setIsShowTolak(true)
                              setIdDokumen(item?.id)
                            }}
                          >
                            Tolak
                          </button>
                        </div>
                      </td>
                      <td className="align-top">
                        <div
                          className={clsx('m-12 rounded-lg p-24', {
                            'bg-red-50': item?.validasi === 2,
                            'bg-green-50': item?.validasi === 1,
                          })}
                        >
                          {item?.validasi === 0 ? (
                            'Menunggu Validasi'
                          ) : (
                            <div className="flex flex-col gap-12">
                              <DataComponent
                                label="Tanggal Validasi"
                                value={
                                  item?.tgl_validasi
                                    ? dayjs(item?.tgl_validasi)
                                        .locale('id')
                                        .format('DD/MM/YY hh:mm A')
                                    : '-'
                                }
                              />
                              <DataComponent
                                label="User Validasi"
                                value={item?.user_validasi ?? '-'}
                              />
                              <DataComponent
                                label="Catatan"
                                value={item?.catatan ?? '-'}
                              />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="align-top">
                        <MenubarPrestasi
                          setName={setName}
                          setIsShow={setShow}
                        />
                      </td>
                      {idx === modalIsOpen && name === 'Edit' && (
                        <ModalEditPrestasi
                          setIsOpen={setShow}
                          isOpen={show}
                          data={item}
                        />
                      )}
                      {idx === modalIsOpen && name === 'Delete' && (
                        <ModalDeletePrestasi
                          setIsOpen={setShow}
                          isOpen={show}
                          data={item}
                        />
                      )}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalTambahPrestasi id={id} isOpen={isShow} setIsOpen={setIsShow} />
      <ModalValidasi
        isOpen={isShowSetuju}
        setIsOpen={setIsShowSetuju}
        children={
          <div className="flex w-full flex-col gap-32 text-[2rem]">
            <p>Apakah setuju ingin memvalidasi file?</p>
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
                className="flex items-center justify-center gap-8 rounded-lg bg-green-700 px-24 py-12 text-center text-white hover:bg-green-900"
                type="button"
                onClick={handleSubmitSetuju}
              >
                {isLoadingValidasi ? (
                  <span className="animate-spin duration-200">
                    <Loader2 size={16} />
                  </span>
                ) : (
                  <ShieldCheck size={16} />
                )}
                Ya
              </button>
            </div>
          </div>
        }
      />
      <ModalValidasi
        isOpen={isShowTolak}
        setIsOpen={setIsShowTolak}
        children={
          <div className="flex w-full flex-col gap-32 text-[2rem]">
            <p>Apakah setuju ingin menolak file ini?</p>
            <Form {...form}>
              <form
                className="scrollbar flex h-full w-full flex-col gap-32 overflow-auto"
                onSubmit={form.handleSubmit(handleSubmitTolak)}
              >
                <FormLabelComponent
                  form={form}
                  label="Komentar"
                  placeHolder="Masukkan Komentar"
                  name="catatan"
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
                    className="flex items-center justify-center gap-8 rounded-lg bg-green-700 px-24 py-12 text-center text-white hover:bg-green-900"
                    type="submit"
                  >
                    {isLoadingValidasi ? (
                      <span className="animate-spin duration-200">
                        <Loader2 size={16} />
                      </span>
                    ) : (
                      <ShieldBan size={16} />
                    )}
                    Ya
                  </button>
                </div>
              </form>
            </Form>
          </div>
        }
      />
    </div>
  )
}
