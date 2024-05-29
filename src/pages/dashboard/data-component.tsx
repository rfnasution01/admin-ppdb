import { Link } from 'react-router-dom'

export function DataComponent({
  label,
  value,
  link = '',
}: {
  label?: string
  value?: number
  link?: string
}) {
  return (
    <Link to={link} className="flex items-center justify-between gap-32">
      <p>{label}</p>
      <p className="hover:text-danger-100">{value}</p>
    </Link>
  )
}
