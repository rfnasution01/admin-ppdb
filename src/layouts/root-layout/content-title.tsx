import { convertSlugToText, convertToSlug } from '@/libs/helpers/format-text'
import { getGreetingBasedOnTime } from '@/libs/helpers/time-greetings'
import { usePathname } from '@/libs/hooks/usePathname'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

export function ContentTitle() {
  const { firstPathname, splittedPath } = usePathname()

  return (
    <div className="flex w-full items-center justify-between gap-32 phones:flex-col-reverse phones:items-start phones:gap-12">
      {/* --- Title --- */}
      <div className="text-[2.4rem] phones:text-[2.8rem]">
        {firstPathname === '' ? (
          <p>
            {getGreetingBasedOnTime()},{' '}
            <span className="font-bold">John Doe</span>
          </p>
        ) : (
          <p className="text-[3rem] font-bold">
            {convertSlugToText(firstPathname)}
          </p>
        )}
      </div>
      {/* --- BreadCrumbs ---- */}
      <div className="flex items-center gap-12">
        {splittedPath?.map((item, idx) => (
          <div className="flex items-center gap-12" key={idx}>
            <Link
              to={idx !== splittedPath.length - 1 ? convertToSlug(item) : ''}
              className={clsx('', {
                'hover:cursor-not-allowed': idx === splittedPath.length - 1,
              })}
            >
              {item === '' ? 'Dashboard' : convertSlugToText(item)}
            </Link>
            <p>{idx < splittedPath.length - 1 ? ' / ' : ''}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
