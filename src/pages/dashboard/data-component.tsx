import { Link } from 'react-router-dom'

export function DataComponent({
  label,
  value,
  link = '',
}: {
  label?: string
  value?: number | string
  link?: string
}) {
  return (
    <Link to={link} className="flex w-full items-center gap-32">
      <p className="w-1/5">{label}</p>
      <p className="w-4/5">: {value}</p>
    </Link>
  )
}
