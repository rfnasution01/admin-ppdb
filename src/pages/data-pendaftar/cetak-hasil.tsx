import { useRef } from 'react'
import printJS from 'print-js'
import { PendaftarType } from '@/libs/types/pendaftar-type'
import { enumJalur } from '@/libs/enum/enum-jalur'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

export function HasilPendaftaran({
  profil,
  jenjang,
}: {
  profil: PendaftarType
  jenjang: string
}) {
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    if (printRef.current) {
      printJS({
        printable: printRef.current.innerHTML,
        type: 'raw-html',
        style: `
            body { font-family: Arial, sans-serif; }
            .header { display: flex; align-items: center; gap: 24px; border-bottom: 2px solid black; padding-bottom: 4px; }
            .header img { width: 120px; }
            .header div { text-align: center; }
            .header p { margin: 0; }
            .title { font-weight: 700; font-size: 32px; }
            .description { text-align: center; font-size: 20px; margin: 0; padding: 0; }
            .content-header { text-align: center; text-transform: uppercase; padding: 16px 0 0 0; }
            .content-header-title { font-size: 20px; font-weight: 700; margin: 0; padding: 0 0; }
            .content-header-description { font-size: 20px; margin: 0; padding: 0 0; font-weight: 700; }
            .divider { background-color: #f0f0f0; padding: 16px 16px; font-size: 20px; font-weight: 700; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            td { font-size: 11px; }
            td { border: none; }
            .info { padding: 0 0 0 0; }
            .info p { padding: 16px 0 0 0; font-size: 16px; }
            .prestasi { font-weight: 700; }
            .verifikasi { border: 1px solid black; margin: 16px 0; }
            .verifikasi-data { padding: 8px; }
        `,
      })
    }
  }

  return (
    <>
      <div ref={printRef} style={{ display: 'none' }}>
        <div className="content">
          {/* --- Kop Surat --- */}
          <div className="header">
            <img src="/img/tutwuri.png" alt="PPDB" />
            <div>
              <p className="title">Pemerintah Kabupaten Batu Bara</p>
              <p className="title">Dinas Pendidikan</p>
              <p className="description">
                Penerimaan Peserta Didik Baru (PPDB) Kabupaten Batubara Tahun
                2024
              </p>
            </div>
          </div>
          {/* --- Content Header --- */}
          <div className="content-header">
            <p className="content-header-title">Hasil Verifikasi Pendaftaran</p>
            <p className="content-header-description">
              Jenjang {jenjang?.toUpperCase()} PPDB Online Tahun Pelajaran
              2024/2025
            </p>
          </div>
          {/* --- Divider --- */}
          <p className="divider">Biodata Calon Peserta Didik</p>

          {/* --- Content --- */}
          <table>
            <tbody>
              <tr>
                <td>No. Pendaftar</td>
                <td>: {profil?.nompes}</td>
                <td></td>
                <td>Jalur Pendaftaran</td>
                <td>
                  :{' '}
                  {profil?.jalur === enumJalur.ZONASI ? (
                    'Zonasi'
                  ) : profil?.jalur === enumJalur.AFIRMASI ? (
                    'Afirmasi'
                  ) : profil?.jalur === enumJalur.PRESTASI ? (
                    <span className="prestasi">Prestasi</span>
                  ) : profil?.jalur === enumJalur.PINDAHTUGAS ? (
                    'Pindah Tugas'
                  ) : (
                    'Zonasi'
                  )}
                </td>
              </tr>
              <tr>
                <td>NIK</td>
                <td>: {profil?.nik}</td>
                <td></td>
                <td>Pilihan 1</td>
                <td>
                  : {profil?.pilihan1} (Skor Sementara:{' '}
                  {Math.ceil(Number(profil?.skor1))})
                </td>
              </tr>
              <tr>
                <td>Nama Lengkap</td>
                <td>: {profil?.nama}</td>
                <td></td>
                <td>
                  {jenjang?.toLowerCase() === 'smp'
                    ? 'Pilihan 2'
                    : 'Tgl. Pendaftaran'}
                </td>
                <td>
                  {jenjang?.toLowerCase() === 'smp'
                    ? `: ${profil?.pilihan2} (Skor Sementara: 
                    ${Math.ceil(Number(profil?.skor2))})`
                    : `: ${
                        dayjs(profil?.daftar)
                          .locale('id')
                          .format('DD MMMM YYYY HH:mm:ss') ?? '-'
                      }`}
                </td>
              </tr>
              <tr>
                <td>Tempat/Tgl. Lahir</td>
                <td>
                  :{' '}
                  {`${profil?.tempat_lahir}, ${dayjs(profil?.tanggal_lahir).format('DD MMMM YYYY')}`}
                </td>
                <td></td>
                <td>
                  {jenjang?.toLowerCase() === 'smp' && 'Tgl. Pendaftaran'}
                </td>
                <td>
                  {jenjang?.toLowerCase() === 'smp' &&
                    `: ${
                      dayjs(profil?.daftar)
                        .locale('id')
                        .format('DD MMMM YYYY HH:mm:ss') ?? '-'
                    }`}
                </td>
              </tr>
              {jenjang?.toLowerCase() === 'smp' && (
                <tr>
                  <td>NISN</td>
                  <td>: {profil?.nisn ?? '-'}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
              <tr>
                <td>Jenis Kelamin</td>
                <td>
                  :{' '}
                  {profil?.jenis_kelamin === 'L'
                    ? 'Laki-laki'
                    : 'Perempuan' ?? '-'}
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {jenjang?.toLowerCase() === 'smp' && (
                <tr>
                  <td>Asal Sekolah</td>
                  <td>: {profil?.nama_sekolah ?? '-'}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
              <tr>
                <td>Alamat</td>
                <td>: {profil?.alamat_lengkap ?? '-'}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>

          {/* --- Divider --- */}
          <div className="verifikasi">
            <div className="divider">Status Verifikasi Sekolah</div>
            <div className="verifikasi-data">
              <div>
                Diverifikasi/
                {Number(profil?.verifikasi) === 2
                  ? 'Disetujui'
                  : 'Ditolak'}{' '}
                oleh: {profil?.verifikasi_sekolah}
              </div>
              <div>Petugas Verifikas: {profil?.verifikasi_user}</div>
              <div>
                Tanggal Verifikasi:{' '}
                {dayjs(profil?.verifikasi_on)
                  .locale('id')
                  .format('DD MMMM YYYY HH:mm:ss')}
              </div>
            </div>
          </div>

          {/* --- Last Info --- */}
          <div className="info">
            <div>
              * Tanggal Cetak{' '}
              {dayjs().locale('id').format('DD MMMM YYYY hh:mm:ss A')}
            </div>
            <div>
              * Untuk mendapatkan informasi lebih lanjut, silahkan kunjungi
              website dinas pendidikan{' '}
              <Link to="https://disdik.batubarakab.go.id">
                disdik.batubarakab.go.id
              </Link>
            </div>
            <div>
              * Atau kunjungi website resmi PPDB Kabupaten Batu Bara{' '}
              <Link to="https://ppdbonline-batubara.com">
                https://ppdbonline-batubara.com
              </Link>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          handlePrint()
        }}
        className="text-nowrap text-[2rem] hover:text-danger-100 phones:text-[2.4rem]"
      >
        Hasil Verifikasi
      </button>
    </>
  )
}
