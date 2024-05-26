export const RunningText = ({ children }: { children: string }) => {
  return (
    <div className="relative flex overflow-hidden">
      <p className="animate-marquee whitespace-nowrap text-[2.4rem] font-bold tracking-1.5 text-danger-tint-1 phones:text-[2.8rem]">
        {children}
      </p>
    </div>
  )
}
