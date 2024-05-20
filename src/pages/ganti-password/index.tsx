import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import Cookies from 'js-cookie'
import { GantiPasswordForm } from '@/features/ganti-password'
import { gantiPasswordSchema } from '@/libs/schema/ganti-password'
import { useCreateGantiPasswordMutation } from '@/store/slices/gantiPasswordAPI'

export default function GantiPassword() {
  const [msg, setMsg] = useState<string>('')
  const navigate = useNavigate()
  // --- Post API ---
  const [
    createGantiPassword,
    {
      isSuccess: GantiPasswordIsSuccess,
      isError: GantiPasswordIsError,
      error: GantiPasswordError,
      isLoading: GantiPasswordIsLoading,
    },
  ] = useCreateGantiPasswordMutation()

  const disabled = GantiPasswordIsLoading

  // --- Form Schema ---
  const form = useForm<zod.infer<typeof gantiPasswordSchema>>({
    resolver: zodResolver(gantiPasswordSchema),
    defaultValues: {},
  })

  // --- Handle GantiPassword ---
  async function handleFormGantiPassword(values) {
    const body = {
      old_password: values?.password_lama,
      new_password: values?.password_baru,
    }

    try {
      await createGantiPassword({ data: body })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (GantiPasswordIsSuccess) {
      setMsg('GanticPassword Berhasil!')
      setTimeout(() => {
        Cookies.remove('token')
        navigate('/login')
      }, 1000)
    }
  }, [GantiPasswordIsSuccess])

  useEffect(() => {
    if (GantiPasswordIsError) {
      const errorMsg = GantiPasswordError as {
        data?: {
          message?: string
        }
      }
      setMsg(errorMsg?.data?.message)
    }
  }, [GantiPasswordIsError, GantiPasswordError])

  return (
    <div className="flex w-1/4 flex-col gap-32 rounded-2xl bg-white p-32 shadow-md phones:w-full">
      <Link to="/" className="flex items-center justify-center">
        <img src="/img/logo.png" alt="PPDB" className="p-24" />
      </Link>
      <GantiPasswordForm
        form={form}
        loginIsError={GantiPasswordIsError}
        loginIsSuccess={GantiPasswordIsSuccess}
        disabled={disabled}
        msg={msg}
        handleFormLogin={handleFormGantiPassword}
      />
    </div>
  )
}
