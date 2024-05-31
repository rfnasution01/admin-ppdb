import { ArrowLeft } from 'lucide-react'

export function NoDetail() {
  return (
    <div className="flex h-full w-full flex-col gap-64 rounded-2xl bg-white p-32">
      <div className="flex items-start gap-16">
        <ArrowLeft size={20} />
        <div className="flex flex-col gap-12">
          <p className="text-[3rem] font-bold">Pilih Tiket Disini</p>
          <p>Tampilkan detail disini</p>
        </div>
      </div>
      <span className="flex items-center justify-center">
        <img src="/img/cosmos.png" className="w-[32rem]" />
      </span>
    </div>
  )
}
