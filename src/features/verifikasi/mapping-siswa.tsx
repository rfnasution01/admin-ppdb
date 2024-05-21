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
          <div className="flex flex-col items-start justify-start gap-12 rounded-2xl bg-white text-[2rem] shadow-md hover:cursor-pointer hover:shadow-lg phones:w-full phones:text-[2.4rem]">
            <p className="p-32 text-[2.4rem] font-bold phones:text-[2.8rem]">
              {item?.name}
            </p>
            <div className="flex w-full flex-col gap-12 bg-red-300 p-32 text-white">
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
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
