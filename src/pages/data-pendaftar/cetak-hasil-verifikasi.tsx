import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { enumJalur } from '@/libs/enum/enum-jalur'
import { PendaftarType } from '@/libs/types/pendaftar-type'
import { DataComponent2 } from './data-component-2'

export function CetakHasilVerifikasi({
  profil,
  jenjang,
}: {
  profil: PendaftarType
  jenjang: string
}) {
  const contentToPrint = useRef(null)

  const handlePrint = useReactToPrint({
    documentTitle: 'Print This Document',
    onBeforePrint: async () => {
      console.log('Loading fonts before printing...')
      // Load the fonts
      await document.fonts.ready
      console.log('Fonts loaded')
    },
    onAfterPrint: () => console.log('after printing...'),
    removeAfterPrint: true,
  })

  return (
    <>
      <section
        className="absolute left-[-10000px] top-auto h-auto overflow-hidden"
        aria-hidden
        tabIndex={-1}
      >
        <div ref={contentToPrint}>
          <div className="flex flex-col gap-32 p-32">
            {/* --- Kop Surat --- */}
            <div className="flex items-center gap-24 border-b-2 border-black-100 p-24">
              <img src="/img/tutwuri.png" alt="PPDB" className="w-[15rem]" />
              <div className="flex flex-col items-center gap-12">
                <p className="text-[5rem] font-bold uppercase">
                  Pemerintah Kabupaten Batu Bara
                </p>
                <p className="text-[5rem] font-bold uppercase">
                  dinas pendidikan
                </p>
                <p className="text-center text-[3rem]">
                  Penerimaan Peserta Didik Baru (PPDB) Kabupaten Batubara Tahun
                  2024
                </p>
              </div>
            </div>
            {/* --- Content Header --- */}
            <div className="flex flex-col items-center gap-12 text-[4rem] font-bold uppercase">
              <p>Hasil Verifikasi Pendaftaran</p>
              <p className="text-center">
                PPDB Jenjang {jenjang.toUpperCase()} Tahun Pelajaran 2024/2025
              </p>
            </div>
            {/* --- Divider --- */}
            <p className="bg-background p-24 text-[3rem] font-bold">
              Biodata Calon Peserta Didik
            </p>
            {/* --- Data Pendaftar --- */}
            <div className="flex gap-32 text-[2.4rem]">
              <div className="flex flex-1 flex-col gap-12">
                <DataComponent2
                  label="No. Pendaftar"
                  value={profil?.nompes ?? '-'}
                />
                <DataComponent2 label="NIK" value={profil?.nik ?? '-'} />
                <DataComponent2 label="NISN" value={profil?.nisn ?? '-'} />
                <DataComponent2
                  label="Nama Lengkap"
                  value={profil?.nama ?? '-'}
                />
                <DataComponent2
                  label="Tempat/Tgl. Lahir"
                  value={`${profil?.tempat_lahir}, ${dayjs(profil?.tanggal_lahir).format('DD MMMM YYYY')}`}
                />
                <DataComponent2
                  label="Jenis Kelamin"
                  value={
                    profil?.jenis_kelamin === 'L'
                      ? 'Laki-laki'
                      : 'Perempuan' ?? '-'
                  }
                />

                {jenjang?.toLowerCase() === 'smp' && (
                  <DataComponent2
                    label="Asal Sekolah"
                    value={profil?.nama_sekolah ?? '-'}
                  />
                )}

                <DataComponent2
                  label="Alamat"
                  value={profil?.alamat_lengkap ?? '-'}
                />
              </div>
              <div className="flex w-full flex-1 flex-col gap-12">
                <DataComponent2
                  label="Jalur Pendaftaran"
                  value={
                    profil?.jalur === enumJalur.ZONASI
                      ? 'Zonasi'
                      : profil?.jalur === enumJalur.AFIRMASI
                        ? 'Afirmasi'
                        : profil?.jalur === enumJalur.PRESTASI
                          ? 'Prestasi'
                          : profil?.jalur === enumJalur.PINDAHTUGAS
                            ? 'Pindah Tugas'
                            : 'Zonasi'
                  }
                />
                <DataComponent2
                  label="Pilihan 1"
                  value={
                    profil?.pilihan1
                      ? `${profil?.pilihan1} (Skor: ${profil?.skor1})`
                      : '-'
                  }
                />
                {jenjang?.toLowerCase() === 'smp' && (
                  <DataComponent2
                    label="Pilihan 2"
                    value={
                      profil?.pilihan2
                        ? `${profil?.pilihan2} (Skor: ${profil?.skor2})`
                        : '-'
                    }
                  />
                )}
                <DataComponent2
                  label="Tanggal Pendaftaran"
                  value={
                    dayjs(profil?.daftar)
                      .locale('id')
                      .format('DD MMMM YYYY hh:mm:ss A') ?? '-'
                  }
                />
              </div>
            </div>
            {/* --- Divider --- */}
            <div className="flex flex-col text-[2.4rem]">
              <p className="border-l border-r border-t border-black bg-background p-24 text-[3rem] font-bold">
                Status Verifikasi Sekolah
              </p>
              <div className="flex flex-col gap-12 border-b border-l border-r border-black p-24">
                <p>Diverifikasi/Disetujui oleh: {profil?.verifikasi_sekolah}</p>
                <p>Petugas Verifikasi: {profil?.verifikasi_user ?? '-'}</p>
                <p>
                  Tanggal Verifikasi:{' '}
                  {profil?.verifikasi_on
                    ? dayjs(profil?.verifikasi_on)
                        .locale('id')
                        .format('DD MMMM YYYY HH:mm:ss')
                    : '-'}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-12 text-[2.4rem]">
              <p>
                *Tanggal Cetak{' '}
                {dayjs().locale('id').format('DD MMMM YYYY hh:mm:ss A')}
              </p>
              <div>
                * Untuk mendapatkan informasi lebih lanjut, silahkan kunjungi
                website dinas pendidikan{' '}
                <Link to="https://disdik.batubarakab.go.id">
                  disdik.batubarakab.go.id
                </Link>
              </div>
              <div>
                * Atau kunjungi website resmi PPDB Kabupaten Batu Bara
                <Link to="https://ppdbonline-batubara.com">
                  https://ppdbonline-batubara.com
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <button
        onClick={() => {
          handlePrint(null, () => contentToPrint.current)
        }}
        className="text-nowrap text-[2rem] hover:text-danger-100 phones:text-[2.4rem]"
      >
        Hasil Verifikasi
      </button>
    </>
  )
}
