export function DataContent({
  value,
  label,
  icon,
  textColor = 'text-lime-700',
}: {
  value: string
  label: string
  icon: JSX.Element
  textColor?: string
}) {
  return (
    <div className={`flex w-full items-center justify-start gap-32 p-24`}>
      <div className="flex flex-1 flex-col items-start justify-start gap-12">
        <p className="text-left">{label}</p>
        <p className="text-[4rem] font-bold">{value}</p>
      </div>
      <span className={`rounded-2xl bg-white p-12 ${textColor}`}>{icon}</span>
    </div>
  )
}
