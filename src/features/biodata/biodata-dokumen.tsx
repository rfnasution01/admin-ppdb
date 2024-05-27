import { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setStateBiodata } from '@/store/reducer/stateBiodata'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FormDokumen } from './form-dokumen'
import { BiodataPrestasi } from './biodata-prestasi'
import Loading from '@/components/Loading'
import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'

export function BiodataDokumen({
  setName,
  setActiveIndex,
  getProfil,
  isLoading,
  jalur,
  jenjang,
  id,
}: {
  setName: Dispatch<SetStateAction<string>>
  setActiveIndex: Dispatch<SetStateAction<number>>
  getProfil: VerifikasiDetailType
  isLoading: boolean
  jalur: string
  jenjang: string
  id: string
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isWajibDiIsiSemua = getProfil?.dokumen?.some(
    (item) => item.status === 'Wajib' && item.dok_siswa === null,
  )

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-1 flex-col gap-32 pb-32">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="w-full overflow-x-auto">
            {/* --- Dokumen --- */}
            <FormDokumen isLoading={isLoading} getProfil={getProfil} id={id} />
          </div>
        )}
      </div>
      {/* --- Prestasi --- */}
      {jalur?.toLowerCase() === 'pr' && jenjang?.toLowerCase() === 'smp' && (
        <div className="flex flex-1 flex-col gap-32 pb-32">
          <BiodataPrestasi getProfil={getProfil} id={id} />
        </div>
      )}
      {/* --- button --- */}
      <div className="flex items-center justify-between bg-primary-50 p-32 phones:flex-col">
        <p className="text-[1.8rem] text-emerald-800">
          <span className="font-bold">Informasi!</span> Pastikan semua file
          dengan status wajib sudah terisi
        </p>
        <div className="flex items-center gap-16 text-[2rem] phones:w-full phones:flex-col">
          <button
            className="rounded-2xl bg-primary-background px-24 py-12 text-white hover:bg-primary-700 phones:w-full"
            type="button"
            disabled={isLoading}
            onClick={() => {
              setActiveIndex(jenjang.toLowerCase() === 'sd' ? 2 : 3)
              setName('orang-tua')
              dispatch(setStateBiodata({ page: 'orang-tua' }))
              navigate(
                `/permintaan-verifikasi/detail-siswa?id=${id}&page=${'orang-tua'}`,
              )
            }}
          >
            Kembali
          </button>
          <button
            disabled={isLoading || isWajibDiIsiSemua}
            className="rounded-2xl bg-emerald-700 px-24 py-12 text-white hover:bg-emerald-900 disabled:cursor-not-allowed phones:w-full"
            type="submit"
            onClick={() => {
              setActiveIndex(5)
              setName('pilih-sekolah')
              dispatch(setStateBiodata({ page: 'pilih-sekolah' }))
              navigate(
                `/permintaan-verifikasi/detail-siswa?id=${id}&page=${'pilih-sekolah'}`,
              )
            }}
          >
            Lanjut
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
