export function DataComponent({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="flex items-center text-nowrap">
      <p className="w-3/12">{label}</p>
      <p className="w-9/12">: {value}</p>
    </div>
  )
}
