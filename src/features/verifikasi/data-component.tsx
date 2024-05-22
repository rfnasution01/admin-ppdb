export function DataComponent({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="flex w-full items-center gap-32 text-[2.4rem] phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]">
      <p className="w-3/12 phones:w-full phones:font-semibold">{label}</p>
      <p className="w-9/12 phones:w-full">{value}</p>
    </div>
  )
}
