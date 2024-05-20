import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import 'react-toastify/dist/ReactToastify.css'
import { profilSekolahSchema } from '@/libs/schema/profil-sekolah-schema'
import { Form } from '@/components/Form'
import { FormIdentitas } from './form-identitas'
import { FormKontak } from './form-kontak'
import { FormKepalaSekolah } from './form-kepala-sekolah'
import { FormOperator } from './form-operator'
import { Save } from 'lucide-react'

export default function ProfilSekolah() {
  // --- Form Schema ---
  const form = useForm<zod.infer<typeof profilSekolahSchema>>({
    resolver: zodResolver(profilSekolahSchema),
    defaultValues: {},
  })

  // --- Handle Submit ---
  const handleSubmit = (values) => {
    console.log({ values })
  }

  return (
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
            <FormIdentitas form={form} />
          </div>
          {/* --- Kontak --- */}
          <div className="flex flex-col gap-24">
            <p className="bg-danger-100 p-24 text-left font-bold text-danger-tint-1">
              Kontak
            </p>
            <FormKontak form={form} />
          </div>
          {/* --- Kepala Sekolah --- */}
          <div className="flex flex-col gap-24">
            <p className="bg-danger-100 p-24 text-left font-bold text-danger-tint-1">
              Kepala Sekolah
            </p>
            <FormKepalaSekolah form={form} />
          </div>
          {/* --- Operator --- */}
          <div className="flex flex-col gap-24">
            <p className="bg-danger-100 p-24 text-left font-bold text-danger-tint-1">
              Operator
            </p>
            <FormOperator form={form} />
          </div>
        </div>
        {/* --- button --- */}
        <div className="flex items-center justify-between bg-danger-100 p-32">
          <p className="text-[2rem] tracking-1.25 text-danger-tint-1">
            * Wajib Diisi
          </p>
          <div className="flex items-center gap-16 text-[2rem]">
            <button
              className="flex items-center justify-center gap-12 rounded-2xl bg-white px-24 py-12 text-danger-tint-3 hover:bg-danger-tint-1"
              type="submit"
            >
              Simpan
              <Save size={16} />
            </button>
          </div>
        </div>
      </form>
    </Form>
  )
}
