import { ListDataVerifikasi } from '@/libs/dummy/list-data-verifikasi'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

export default function MappingSiswa() {
  return (
    <div className="grid w-full grid-cols-12 gap-32">
      {ListDataVerifikasi?.map((item, idx) => (
        <Link
          to={`/permintaan-verifikasi/detail-siswa?id=${item?.nisn}`}
          className="col-span-4 phones:col-span-12"
          key={idx}
        >
          <div className="flex flex-col items-start justify-start gap-12 rounded-2xl bg-white p-32 text-[2rem] shadow-md hover:cursor-pointer hover:shadow-lg phones:w-full phones:text-[2.4rem]">
            <p className="text-[2.4rem] font-bold phones:text-[2.8rem]">
              {item?.name}
            </p>
            <p>
              Tampat/Tanggal Lahir : {item?.tempat_lahir},{' '}
              {dayjs(item?.tanggal_lahir).format('DD MMMM YYYY')}
            </p>
            <p>NISN: {item?.nisn}</p>
            <p>NIK: {item?.nik}</p>
            <p>Asal Sekolah: {item?.asal_sekolah}</p>
            <p>Pilihan Pertama: {item?.pilihan1}</p>
            <p>Pilihan Kedua: {item?.pilihan2}</p>
            <p className="italic">
              Diajukan: {dayjs(item?.diajukan).format('DD MMMM YYYY')}
            </p>
            <div className="flex w-full items-center gap-32">
              <button
                type="button"
                className="text-canter flex-1 rounded-lg bg-danger-100 px-24 py-12 text-center text-white hover:bg-danger-300"
              >
                Tolak
              </button>
              <button
                type="button"
                className="text-canter flex-1 rounded-lg bg-primary px-24 py-12 text-center text-white hover:bg-primary-background"
              >
                Verifikasi
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
