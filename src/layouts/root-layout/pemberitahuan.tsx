import { AlertCircle } from 'lucide-react'

export const Pemberitahuan = () => {
  return (
    <h2 className="z-10 flex items-center gap-16 rounded-2xl border bg-white px-16 py-8 font-bold">
      <AlertCircle size={16} />
      <span className="text-[2rem] font-bold tracking-1.5 phones:text-[2.4rem]">
        Pemberitahuan
      </span>
    </h2>
  )
}
