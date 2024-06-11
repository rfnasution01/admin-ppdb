import { useRef } from 'react'
import printJS from 'print-js'
import { PendaftarType } from '@/libs/types/pendaftar-type'
import dayjs from 'dayjs'
import Tooltips from './Tooltip'
import { Printer } from 'lucide-react'

export function PrintHasil({ profil }: { profil: PendaftarType[] }) {
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    if (printRef.current) {
      printJS({
        printable: printRef.current.innerHTML,
        type: 'raw-html',
        style: `
            @media print {
              @page {
                size: A4;
                margin: 0;
              }
              body, html {
                height: 100%;
                margin: 0;
                padding: 0;
              }
              main {
                display: flex;
                flex-direction: column;
                width: 100%;
                padding: 32px;
                box-sizing: border-box;
              }
              .section-header {
                flex: 0 0 10%;
                border-bottom: 2px solid black;
                position: fixed;
                top: 0;
              }
              .section-content {
                flex: 1 0 90%;
                display: flex;
                flex-direction: column;
                gap: 0;
                margin-top: 100px;
              }
              .section-content p {
                margin: 0;
                padding: 0;
              }
              .header {
                display: flex;
                flex-direction: row;
                gap: 16px;
              }
              .header img { 
                width: 120px;
                height: 120px; 
              }
              .header-text {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 0;
                justify-content: center;
                align-items: center; 
              }
              .header-text p {
                margin: 0;
                padding: 0;
              }
              .title-header {
                font-size: 20px;
                text-align: center;
                text-transform: uppercase;
              }
              .content-header {
                font-size: 18px;
                text-align: center;
                text-transform: uppercase;
                font-weight: 700;
              }
              .title {
                font-size: 22px;
                font-weight: 700;
                text-align: center;
                text-transform: uppercase;
              }
              .description {
                font-size: 20px;
                text-align: center;
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
              }
              th, td {
                border: 1px solid black
              }
                
            }
        `,
      })
    }
  }

  return (
    <>
      <div ref={printRef} style={{ display: 'none' }}>
        <main>
          <section className="section-header">
            {/* --- Kop Surat --- */}
            <div className="header">
              <img src="/img/tutwuri.png" alt="PPDB" />
              <div className="header-text">
                <p className="title-header">Pemerintah Kabupaten Batu Bara</p>
                <p className="title">Dinas Pendidikan</p>
                <p className="title">UPTD. SMP Negeri 1 Kampung Rakyat</p>
                <p className="description">Alamat: Kampung Rakyat</p>
              </div>
              <img src="/img/tutwuri.png" alt="PPDB" />
            </div>
          </section>
          <section className="section-content">
            <p className="content-header">Daftar calon siswa yang lulus</p>
            <p className="content-header">
              pada uptd. smp negeri 1 kampung rakyat
            </p>
            <p className="content-header">gelombang 1</p>

            {/* --- Content --- */}
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>No. Peserta</th>
                  <th>Nama</th>
                  <th>Tgl Lahir</th>
                  <th>Tgl.Daftar</th>
                  <th>Jalur</th>
                  <th>Pilihan</th>
                  <th>Skor</th>
                </tr>
              </thead>
              <tbody>
                {profil?.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item?.nompes}</td>
                    <td>{item?.nama}</td>
                    <td>
                      {dayjs(item?.tanggal_lahir)
                        .locale('id')
                        .format('DD-MM-YYYY')}
                    </td>
                    <td>
                      {dayjs(item?.daftar)
                        .locale('id')
                        .format('DD-MM-YYYY HH:mm')}
                    </td>
                    <td>{item?.jalur}</td>
                    <td>{item?.pilihan1}</td>
                    <td>{item?.skor1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          handlePrint()
        }}
        type="button"
        className="flex items-center gap-12 rounded-2xl border border-primary p-16 text-primary hover:cursor-pointer hover:bg-primary hover:text-white"
      >
        <Tooltips
          triggerComponent={<Printer size={16} />}
          tooltipContent={<span>Cetak</span>}
        />
      </button>
    </>
  )
}
