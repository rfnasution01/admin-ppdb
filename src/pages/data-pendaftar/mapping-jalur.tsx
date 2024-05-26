import { Link } from 'react-router-dom'

export function DataComponent({
  label,
  value,
  isOrangTua,
  link,
}: {
  label: string
  value?: string
  link?: string
  isOrangTua?: boolean
}) {
  return (
    <div
      className={`flex ${isOrangTua ? 'w-full' : 'w-1/3'} items-center gap-12 phones:w-screen`}
    >
      <p className="w-1/3">{label}</p>
      {value && <p className="w-2/3">: {value}</p>}
      {link && (
        <Link to={link} target="_blank">
          : <span className="text-primary">Tampilkan File</span>
        </Link>
      )}
    </div>
  )
}
