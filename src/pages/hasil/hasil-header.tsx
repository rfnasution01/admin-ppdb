import clsx from 'clsx'

export function HasilHeader({
  value,
  label,
  icon,
  isBorder,
}: {
  value: string
  label: string
  icon: JSX.Element
  isBorder?: boolean
}) {
  return (
    <div
      className={clsx('flex w-1/3 gap-32 border-r p-32', {
        'border-[#e0e4e5]': isBorder,
        'border-transparent': !isBorder,
      })}
    >
      <span className="flex items-center justify-center rounded-2xl bg-[#005479] p-12 text-white">
        {icon}
      </span>
      <div className="flex flex-1 flex-col gap-8">
        <p className="text-[4rem] font-bold text-[#005479]">{label}</p>
        <p>{value}</p>
      </div>
    </div>
  )
}
