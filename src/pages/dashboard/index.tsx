import { MappingGelombang } from './mapping-gelombang'

export default function Dashboard() {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-32 text-left">
      {/* --- Quotes --- */}
      <div className="flex w-full flex-col gap-y-16 rounded-2xl border-l-4 border-danger-100 bg-white p-24 shadow-md">
        <p className="font-mono">
          Semakin kita mencintai diri kita sendiri, semakin kita tidak seperti
          orang lain, menjadikan kita unik
        </p>
        <p className="font-nunito text-danger-100">~~~ Walt Disney ~~~</p>
      </div>
      {/* --- Gelombang --- */}
      <MappingGelombang />
    </div>
  )
}
