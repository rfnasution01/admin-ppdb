import { getInitials } from '@/libs/helpers/format-text'

export function PasPhoto({
  pasPhoto,
  name,
}: {
  pasPhoto: string
  name: string
}) {
  return (
    <div className="h-[6rem] w-[6rem]">
      {pasPhoto ? (
        <img
          src={pasPhoto}
          alt="Profil"
          className="h-full w-full rounded-full phones:h-[8rem] phones:w-[8rem]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-rose-300 text-[2.4rem] text-rose-700 phones:p-24 phones:text-[2.4rem]">
          {getInitials(name)}
        </div>
      )}
    </div>
  )
}
