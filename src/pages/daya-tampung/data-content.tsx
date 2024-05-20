export function DataContent({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="flex w-full items-center justify-between gap-32">
      <p>{label}</p>
      <p>{value}</p>
    </div>
  )
}
