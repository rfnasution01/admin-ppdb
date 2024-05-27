export function DataComponent2({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="flex w-full items-center gap-32 text-[2.4rem] phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]">
      <p>
        {label} {value}
      </p>
    </div>
  )
}
