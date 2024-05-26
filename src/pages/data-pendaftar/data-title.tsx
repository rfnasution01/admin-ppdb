import { ReactNode } from 'react'

export function DataTitle({
  title,
  children,
}: {
  title: string | ReactNode
  children: string | ReactNode
}) {
  return (
    <div className="flex w-full flex-col gap-12">
      <div className="text-[2.4rem] font-bold phones:text-[2.8rem]">
        {title}
      </div>
      <div className="flex w-full flex-col gap-12 phones:flex-col phones:items-start phones:gap-8">
        {children}
      </div>
    </div>
  )
}
