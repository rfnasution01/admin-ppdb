export function DataComponent2({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="flex w-full flex-col text-[2rem] phones:text-[2.4rem]">
      <p className="font-bold">{label}</p>
      <p>{value}</p>
    </div>
  )
}
