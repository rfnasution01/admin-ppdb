export function DataComponent({
  label,
  value,
}: {
  label?: string
  value?: number
}) {
  return (
    <div className="flex items-center justify-between gap-32">
      <p>{label}</p>
      <p>{value}</p>
    </div>
  )
}
