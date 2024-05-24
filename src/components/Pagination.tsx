import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export const Pagination = ({
  pageNow,
  lastPage,
  setPage,
}: {
  setPage: Dispatch<SetStateAction<number>>
  pageNow: number
  lastPage: number
}) => {
  return (
    <div className="flex items-center gap-24">
      <span
        className={clsx('border p-4', {
          'hover:cursor-pointer': pageNow > 1,
          'hover:cursor-not-allowed': !(pageNow > 1),
        })}
        onClick={() => {
          if (pageNow > 1) {
            setPage(pageNow - 1)
          }
        }}
      >
        <ChevronLeft />
      </span>
      <p>
        <span className="text-rose-950">{pageNow}</span> / {lastPage}
      </p>
      <span
        className={clsx('border p-4', {
          'hover:cursor-pointer': pageNow < lastPage,
          'hover:cursor-not-allowed': !(pageNow < lastPage),
        })}
        onClick={() => {
          if (pageNow < lastPage) {
            setPage(pageNow + 1)
          }
        }}
      >
        <ChevronRight />
      </span>
    </div>
  )
}
