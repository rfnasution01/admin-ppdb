export function DataContent({
  value,
  label,
  icon,
  bgColor = 'bg-gradient-to-br from-lime-500 via-lime-400 to-lime-6000',
  textColor = 'text-lime-700',
}: {
  value: string
  label: string
  icon: JSX.Element
  bgColor?: string
  textColor?: string
}) {
  return (
    <div
      className={`flex w-1/5 items-center justify-start gap-32 rounded-2xl ${bgColor} p-24 text-white shadow-md hover:cursor-pointer hover:shadow-lg phones:w-full`}
    >
      <div className="flex flex-1 flex-col items-start justify-start gap-12">
        <p className="text-left font-bold">{label}</p>
        <p className="text-light text-[2rem] phones:text-[2.4rem]">{value}</p>
      </div>
      <span className={`rounded-2xl bg-white p-12 ${textColor}`}>{icon}</span>
    </div>
  )
}
