import { ArrowLeft } from 'lucide-react'

export function PilihData() {
  return (
    <div className="flex h-full w-full flex-col gap-32 rounded-2xl bg-white p-32 text-[3rem]">
      <div className="flex items-center gap-12">
        <ArrowLeft size={20} />
        <p>Pilih Data Siswa</p>
      </div>
      <p className="text-[2.4rem]">Tampilkan Detail Disini</p>
      <div className="flex h-full w-full flex-1 items-center justify-center">
        <img src="/img/cosmos.png" alt="cosmos" className="w-[30rem]" />
      </div>
    </div>
  )
}
