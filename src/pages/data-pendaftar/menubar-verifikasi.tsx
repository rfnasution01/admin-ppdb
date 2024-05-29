import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/Menubar'
import dayjs from 'dayjs'

export function MenubarVerifikasi({
  verifikasiPetugas,
  verifikasiSekolah,
  verifikasiTanggal,
}: {
  verifikasiSekolah: string
  verifikasiPetugas: string
  verifikasiTanggal: string
}) {
  return (
    <Menubar className="bg-transparent shadow-[-1.2rem_0_0.8rem_rgb(255,255,255)]">
      <MenubarMenu>
        <MenubarTrigger
          className="focus-visible:shadow-primary-shade-1 w-full bg-transparent text-center italic text-danger-100 transition-all duration-300"
          variant="nothing"
          layout="icon"
          size="fit"
        >
          Diverifikasi {verifikasiSekolah}{' '}
          {dayjs(verifikasiTanggal).locale('id').format('DD-MM-YYYY HH-mm-ss')}
        </MenubarTrigger>
        <MenubarContent className="shadow-grey-light-1 absolute left-0 top-0 w-[50rem] transition-all duration-300">
          <div className="flex flex-col gap-4 rounded-2xl bg-white p-24 text-[2rem] phones:text-[2.4rem]">
            <p>
              Oleh Sekolah {verifikasiSekolah} an. {verifikasiPetugas}
            </p>
            <p>
              Tanggal:{' '}
              {dayjs(verifikasiTanggal)
                .locale('id')
                .format('DD-MM-YYYY HH-mm-ss')}
            </p>
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
