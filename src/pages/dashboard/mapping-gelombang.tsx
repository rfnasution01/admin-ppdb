import { DataComponent } from './data-component'

export function MappingGelombang() {
  return (
    <div className="flex w-full gap-32 text-[2rem] phones:flex-col phones:text-[2.4rem]">
      {/* --- Gelombang 1 --- */}
      <div className="flex w-1/3 flex-col rounded-2xl bg-white text-[2.4rem] shadow-md hover:cursor-pointer hover:shadow-lg phones:w-full phones:text-[2.8rem]">
        <p
          style={{ borderTopRightRadius: '1rem', borderTopLeftRadius: '1rem' }}
          className="bg-gradient-to-br from-teal-300 via-teal-200 to-teal-400 p-32 font-bold uppercase text-teal-700"
        >
          Gelombang 1
        </p>
        <div className="flex flex-col gap-12 p-32">
          <DataComponent value="0" label="Pendaftar" />
          <DataComponent value="0" label="Diverifikasi" />
          <DataComponent value="0" label="Belum Verifikasi" />
        </div>
      </div>
      {/* --- Gelombang 2 --- */}
      <div className="flex w-1/3 flex-col rounded-2xl bg-white text-[2.4rem] shadow-md hover:cursor-pointer hover:shadow-lg phones:w-full phones:text-[2.8rem]">
        <p
          style={{ borderTopRightRadius: '1rem', borderTopLeftRadius: '1rem' }}
          className="bg-gradient-to-br from-amber-300 via-amber-200 to-amber-400 p-32 font-bold uppercase text-amber-700"
        >
          Gelombang 2
        </p>
        <div className="flex flex-col gap-12 p-32">
          <DataComponent value="0" label="Pendaftar" />
          <DataComponent value="0" label="Diverifikasi" />
          <DataComponent value="0" label="Belum Verifikasi" />
        </div>
      </div>
      {/* --- Lulus --- */}
      <div className="flex w-1/3 flex-col rounded-2xl bg-white text-[2.4rem] shadow-md hover:cursor-pointer hover:shadow-lg phones:w-full phones:text-[2.8rem]">
        <p
          style={{ borderTopRightRadius: '1rem', borderTopLeftRadius: '1rem' }}
          className="bg-gradient-to-br from-pink-300 via-pink-200 to-pink-400 p-32 font-bold uppercase text-pink-700"
        >
          Lulus
        </p>
        <div className="flex flex-col gap-12 p-32">
          <DataComponent value="0" label="Daya Tampung" />
          <DataComponent value="0" label="Lulus" />
          <DataComponent value="0" label="Daftar Ulang" />
        </div>
      </div>
    </div>
  )
}
