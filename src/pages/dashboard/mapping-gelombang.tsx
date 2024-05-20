import { ListGelombang } from '@/libs/dummy/list-gelombang'

export function MappingGelombang() {
  return (
    <div className="flex w-full gap-32 text-[2rem] phones:flex-col phones:text-[2.4rem]">
      {/* --- Gelombang 1 --- */}
      <div className="flex w-1/3 flex-col gap-12 rounded-2xl bg-white p-32 text-[2.4rem] shadow-md hover:cursor-pointer hover:shadow-lg phones:w-full phones:text-[2.8rem]">
        <p className="font-bold uppercase">{ListGelombang?.gelombang1?.name}</p>
        <p className="">
          Pendaftar: {ListGelombang?.gelombang1?.pendaftar} orang
        </p>
        <p>DiVerifikasi: {ListGelombang?.gelombang1?.diverifikasi} orang</p>
        <p>
          Belum Verifikasi: {ListGelombang?.gelombang1?.belum_verifikasi} orang
        </p>
      </div>
      {/* --- Gelombang 2 --- */}
      <div className="flex w-1/3 flex-col gap-12 rounded-2xl bg-white p-32 text-[2.4rem] shadow-md hover:cursor-pointer hover:shadow-lg phones:w-full phones:text-[2.8rem]">
        <p className="font-bold uppercase">{ListGelombang?.gelombang2?.name}</p>
        <p className="">
          Pendaftar: {ListGelombang?.gelombang2?.pendaftar} orang
        </p>
        <p>DiVerifikasi: {ListGelombang?.gelombang2?.diverifikasi} orang</p>
        <p>
          Belum Verifikasi: {ListGelombang?.gelombang2?.belum_verifikasi} orang
        </p>
      </div>
      {/* --- Lulus --- */}
      <div className="flex w-1/3 flex-col gap-12 rounded-2xl bg-white p-32 text-[2.4rem] shadow-md hover:cursor-pointer hover:shadow-lg phones:w-full phones:text-[2.8rem]">
        <p className="font-bold uppercase">{ListGelombang?.lulus?.name}</p>
        <p className="">
          Daya Tampung: {ListGelombang?.lulus?.daya_tampung} orang
        </p>
        <p>Lulus: {ListGelombang?.lulus?.lulus} orang</p>
        <p>Daftar Ulang: {ListGelombang?.lulus?.daptar_ulang} orang</p>
      </div>
    </div>
  )
}
