/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateUploadFileMutation } from '@/store/slices/pendaftaranAPI'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const FileUploadForm = ({
  id_dokumen,
  format,
  status_verifikasi,
  isLoading,
  disabled,
  dok_siswa,
  setIsShowSetuju,
  setIsShowTolak,
  id,
  setIsIdDokumen,
}: {
  id_dokumen: string
  format?: number
  status_verifikasi?: number
  isLoading?: boolean
  disabled?: boolean
  dok_siswa: string
  setIsShowSetuju: Dispatch<SetStateAction<boolean>>
  setIsIdDokumen: Dispatch<SetStateAction<string>>
  setIsShowTolak: Dispatch<SetStateAction<boolean>>
  id: string
}) => {
  const [file, setFile] = useState()
  const [errorMessage, setErrorMessage] = useState('')

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    const allowedTypesAll = ['image/jpeg', 'image/png', 'application/pdf']
    const allowedTypesImage = ['image/jpeg', 'image/png']

    const allowedTypes = format === 1 ? allowedTypesImage : allowedTypesAll
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (
      selectedFile &&
      allowedTypes.includes(selectedFile.type) &&
      selectedFile.size <= maxSize
    ) {
      setFile(selectedFile)
      setErrorMessage('')
    } else {
      console.log('tas')

      setFile(null)
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorMessage('File harus berupa gambar (JPEG/PNG) atau PDF')
      } else if (selectedFile.size > maxSize) {
        setErrorMessage('Ukuran file tidak boleh lebih dari 5MB')
      }
    }
  }

  // --- Create Upload ---
  const [
    createUpload,
    {
      isError: isErrorUpload,
      error: errorUpload,
      isLoading: isLoadingUpload,
      isSuccess: isSuccessUpload,
    },
  ] = useCreateUploadFileMutation()

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData()
      formData.append('id_dokumen', id_dokumen)
      formData.append('berkas', file)

      try {
        await createUpload({ data: formData })
      } catch (error) {
        console.error('Gagal mengunggah file:', error)
      }
    } else {
      setErrorMessage('Silakan pilih file terlebih dahulu')
    }
  }

  useEffect(() => {
    if (isSuccessUpload) {
      setErrorMessage(`Upload file berhasil disimpan!`)
    }
  }, [isSuccessUpload])

  useEffect(() => {
    if (isErrorUpload) {
      const errorMsg = errorUpload as {
        data?: {
          message?: string
        }
      }

      setErrorMessage(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`)
    }
  }, [isErrorUpload, errorUpload])

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('')
    }, 3000)

    return () => clearTimeout(timer)
  }, [isSuccessUpload, isErrorUpload])

  return (
    <div
      className={clsx(
        'flex flex-col justify-between gap-48 rounded-2xl border p-32',
        {
          'bg-green-50': dok_siswa !== null,
          'bg-white': dok_siswa === null,
        },
      )}
    >
      <input
        className="w-full"
        type="file"
        onChange={handleFileChange}
        disabled={isLoadingUpload || status_verifikasi === 1 || isLoading}
      />
      <div className="flex flex-col gap-8">
        <button
          className="text-nowrap rounded-lg bg-primary p-8 text-[2rem] text-white hover:bg-primary-background disabled:cursor-not-allowed"
          disabled={
            isLoadingUpload || status_verifikasi === 1 || isLoading || disabled
          }
          onClick={handleSubmit}
        >
          {dok_siswa ? 'Ganti File' : 'Unggah File'}
        </button>
        {errorMessage && (
          <p
            className={clsx('text-[2rem]', {
              'text-danger': isErrorUpload,
              'text-emerald-700': isSuccessUpload,
            })}
          >
            {errorMessage}
          </p>
        )}
        {dok_siswa ? (
          <Link
            to={dok_siswa}
            className="text-nowrap rounded-lg bg-primary p-8 text-center text-[2rem] text-white hover:bg-primary-background disabled:cursor-not-allowed"
            target="_blank"
          >
            Lihat Gambar
          </Link>
        ) : (
          'File belum diupload'
        )}
        {dok_siswa && (
          <button
            type="button"
            disabled={status_verifikasi !== 0}
            onClick={() => {
              setIsShowSetuju(true)
              setIsIdDokumen(id)
            }}
            className="text-nowrap rounded-lg bg-green-700 p-8 text-center text-[2rem] text-white hover:bg-green-900 disabled:cursor-not-allowed"
          >
            Verifikasi
          </button>
        )}
        {dok_siswa && (
          <button
            type="button"
            disabled={status_verifikasi !== 0}
            onClick={() => {
              setIsShowTolak(true)
              setIsIdDokumen(id)
            }}
            className="text-nowrap rounded-lg bg-rose-700 p-8 text-center text-[2rem] text-white hover:bg-rose-900 disabled:cursor-not-allowed"
          >
            Tolak
          </button>
        )}
      </div>
    </div>
  )
}

export default FileUploadForm
