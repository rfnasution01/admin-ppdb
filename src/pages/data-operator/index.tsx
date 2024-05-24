import Loading from '@/components/Loading'
import { NoData } from '@/components/NoData'
import { capitalizeFirstLetterFromLowercase } from '@/libs/helpers/format-text'
import { OperatorType } from '@/libs/types/operator-type'
import {
  useCreateEditStatusMutation,
  useGetOperatorQuery,
} from '@/store/slices/operatorAPI'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MenubarOperator } from './menubar-operator'
import { ModalTambahOperator } from './modal-tambah-operator'
import { ModalEditOperator } from './modal-edit-operator'
import { ModalEditPassword } from './modal-edit-password'

export default function DataOperator() {
  const [name, setName] = useState<string | null>(null)
  const [show, setShow] = useState<boolean>(false)
  const [modalIsOpen, setModalIsOpen] = useState<number | null>(null)

  // --- Operator ---
  const [operator, setOperator] = useState<OperatorType[]>([])
  const { data, isLoading, isFetching } = useGetOperatorQuery()

  useEffect(() => {
    if (data?.data) {
      setOperator(data?.data)
    }
  }, [data?.data])

  // --- Handle Ganti Status ---
  const [
    createGantiStatus,
    {
      isSuccess: isSuccessGantiStatus,
      isError: isErrorGantiStatus,
      error: errorGantiStatus,
    },
  ] = useCreateEditStatusMutation()

  async function handleGantiStatus(status: string, id: string) {
    const body = {
      id: id,
      status: status,
    }

    try {
      await createGantiStatus({ data: body })
    } catch (error) {
      console.log(error)
    }
  }

  // --- Sukses ---
  useEffect(() => {
    if (isSuccessGantiStatus) {
      toast.success(`Status berhasil diganti!`, {
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
  }, [isSuccessGantiStatus])

  // --- Error ---
  useEffect(() => {
    if (isErrorGantiStatus) {
      const errorMsg = errorGantiStatus as {
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
  }, [isErrorGantiStatus, errorGantiStatus])

  const loading = isFetching || isLoading

  return (
    <div className="scrollbar flex h-full w-full flex-col gap-32">
      <div className="flex w-full">
        <button
          type="button"
          onClick={() => {
            setName('Tambah')
            setShow(true)
          }}
          className="flex items-center gap-12 rounded-lg bg-primary px-24 py-12 text-white hover:bg-primary-background"
        >
          <Plus size={16} />
          Tambah Data
        </button>
      </div>
      <div className="scrollbar h-full w-full flex-1 overflow-x-auto">
        <table className="scrollbar mb-24 w-full flex-1 border-collapse overflow-auto text-[2.4rem]">
          <thead className="relative z-10 align-top leading-medium">
            <tr className="border-b-[1.6rem] border-transparent">
              <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                No
              </th>
              <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                Username
              </th>
              <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                Nama
              </th>
              <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                No. HP
              </th>
              <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                Email
              </th>
              <th className="sticky top-0 text-nowrap border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                Status
              </th>
              <th className="sticky top-0 text-nowrap border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="p-24">
                <td colSpan={7}>
                  <Loading />
                </td>
              </tr>
            ) : !operator ? (
              <tr>
                <td colSpan={7}>
                  <NoData title="Terjadi Kesalahan" />
                </td>
              </tr>
            ) : operator?.length === 0 ? (
              <td colSpan={7}>
                <NoData />
              </td>
            ) : (
              operator?.map((item, idx) => (
                <tr
                  className="scrollbar h-full w-full overflow-auto border-b-[1.6rem] border-transparent transition-all ease-in odd:bg-surface-disabled hover:cursor-pointer hover:bg-warning-tint-2"
                  key={idx}
                  onClick={() => {
                    setModalIsOpen(idx)
                  }}
                >
                  <td className="px-24 py-12 leading-medium">{idx + 1}</td>
                  <td className="px-24 py-12 leading-medium">
                    {item?.username}
                  </td>
                  <td className="px-24 py-12 leading-medium">
                    {capitalizeFirstLetterFromLowercase(
                      item?.nama.toLowerCase(),
                    )}
                  </td>
                  <td className="px-24 py-12 leading-medium">{item?.hp}</td>
                  <td className="px-24 py-12 leading-medium">{item?.email}</td>
                  <td className="px-24 py-12 leading-medium">
                    <p
                      className={clsx(
                        'rounded-full px-24 py-8 text-center text-[1.6rem] text-white phones:text-[2rem]',
                        {
                          'bg-emerald-700': item?.status === 'Y',
                          'bg-rose-700': item?.status !== 'Y',
                        },
                      )}
                    >
                      {item?.status === 'Y' ? 'Aktif' : 'Tidak Aktif'}
                    </p>
                  </td>
                  <td>
                    <MenubarOperator
                      data={item}
                      setName={setName}
                      setIsShow={setShow}
                      handleGantiStatus={handleGantiStatus}
                    />
                  </td>
                  {idx === modalIsOpen && name === 'Edit' && (
                    <ModalEditOperator
                      setIsOpen={setShow}
                      isOpen={show}
                      data={item}
                    />
                  )}
                  {idx === modalIsOpen && name === 'Ganti Password' && (
                    <ModalEditPassword
                      setIsOpen={setShow}
                      isOpen={show}
                      data={item}
                    />
                  )}
                </tr>
              ))
            )}
            {name === 'Tambah' && (
              <ModalTambahOperator setIsOpen={setShow} isOpen={show} />
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  )
}
