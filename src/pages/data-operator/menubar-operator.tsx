import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/Menubar'
import { OperatorType } from '@/libs/types/operator-type'
import clsx from 'clsx'
import {
  KeySquare,
  Pencil,
  ShieldCheck,
  ShieldClose,
  Trash,
} from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export function MenubarOperator({
  data,
  setIsShow,
  setName,
  handleGantiStatus,
}: {
  data: OperatorType
  setIsShow: Dispatch<SetStateAction<boolean>>
  setName: Dispatch<SetStateAction<string>>
  handleGantiStatus(status: string, id: string): Promise<void>
}) {
  return (
    <Menubar className="px-4 shadow-[-1.2rem_0_0.8rem_rgb(255,255,255)]">
      <MenubarMenu>
        <MenubarTrigger
          className="focus-visible:shadow-primary-shade-1 w-full text-center transition-all duration-300"
          variant="nothing"
          layout="icon"
          size="fit"
        >
          <img src="/img/more.png" alt="More" className="w-[3rem]" />
        </MenubarTrigger>
        <MenubarContent className="shadow-grey-light-1 absolute -right-1/2 -top-[18rem] w-[30rem] transition-all duration-300">
          <div className="flex flex-col gap-12 rounded-2xl bg-white p-24 text-[2rem] phones:text-[2.4rem]">
            {['Edit', 'Ganti Password', 'Aktivasi', 'Non Aktif'].map(
              (item, idx) => (
                <div
                  className={clsx(
                    'flex items-center gap-12 text-nowrap border-l-2 border-transparent p-8  hover:border-danger-100 hover:bg-danger-tint-1 hover:bg-opacity-30 hover:text-danger-100',
                    {
                      'hover:cursor-not-allowed':
                        (item === 'Aktivasi' && data?.status === 'Y') ||
                        (item === 'Non Aktif' && data?.status === 'N'),
                      'hover:cursor-pointer':
                        (item === 'Aktivasi' && data?.status !== 'Y') ||
                        (item === 'Non Aktif' && data?.status !== 'N') ||
                        item === 'Edit' ||
                        item === 'Ganti Password',
                    },
                  )}
                  key={idx}
                  onClick={() => {
                    if (item === 'Non Aktif' && data?.status !== 'N') {
                      handleGantiStatus('N', data?.id)
                    } else if (item === 'Aktivasi' && data?.status !== 'Y') {
                      handleGantiStatus('Y', data?.id)
                    } else if (item === 'Edit' || item === 'Ganti Password') {
                      setName(item)
                      setIsShow(true)
                    }
                  }}
                >
                  {item === 'Edit' ? (
                    <Pencil size={16} />
                  ) : item === 'Ganti Password' ? (
                    <KeySquare size={16} />
                  ) : item === 'Aktivasi' ? (
                    <ShieldCheck size={16} />
                  ) : item === 'Non Aktif' ? (
                    <ShieldClose size={16} />
                  ) : (
                    <Trash size={16} />
                  )}

                  {item}
                </div>
              ),
            )}
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
