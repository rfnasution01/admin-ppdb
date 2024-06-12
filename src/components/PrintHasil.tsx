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
              .header-space {
                height: 136px;
                padding-bottom: 32px;
              }
              .content {
                padding: 16px 16px 0 16px;
                display: flex;
                flex-direction: column;
                gap: 16px;
              }
              .header {
                display: flex;
                flex-direction: row;
                gap: 16px;
                padding: 16px;
                border-bottom: 1px solid black;
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
              .content-header {
                font-size: 18px;
                text-align: center;
                text-transform: uppercase;
                font-weight: 700;
              }
              .section-content {
                display: flex;
                flex-direction: column;
                gap: 0;
              }
              .section-content p {
                margin: 0;
                padding: 0;
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
              .title-header {
                font-size: 20px;
                text-align: center;
                text-transform: uppercase;
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
              }
              .table-border {
                border: 1px solid black;
                padding: 0 4px 0 4px;
              } 
              .table-border p {
                font-size: 12px;
              } 
            }
        `,
      })
    }
  }

  return (
    <>
      <div ref={printRef} style={{ display: 'none' }}>
        <table>
          <thead>
            <tr>
              <td>
                <div className="header-space">
                  <div className="header">
                    <img src="/img/tutwuri.png" alt="PPDB" />
                    <div className="header-text">
                      <p className="title-header">
                        Pemerintah Kabupaten Batu Bara
                      </p>
                      <p className="title">Dinas Pendidikan</p>
                      <p className="title">UPTD. SMP Negeri 1 Kampung Rakyat</p>
                      <p className="description">Alamat: Kampung Rakyat</p>
                    </div>
                    <img src="/img/tutwuri.png" alt="PPDB" />
                  </div>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="content">
                  <div className="section-content">
                    <p className="content-header">
                      Daftar calon siswa yang lulus
                    </p>
                    <p className="content-header">
                      pada uptd. smp negeri 1 kampung rakyat
                    </p>
                    <p className="content-header">gelombang 1</p>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th className="table-border">No</th>
                        <th className="table-border">No. Peserta</th>
                        <th className="table-border">Nama</th>
                        <th className="table-border">Tgl Lahir</th>
                        <th className="table-border">Tgl.Daftar</th>
                        <th className="table-border">Jalur</th>
                        <th className="table-border">Pilihan</th>
                        <th className="table-border">Skor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profil?.map((item, idx) => (
                        <tr key={idx}>
                          <td className="table-border">
                            <p>{idx + 1}</p>
                          </td>
                          <td className="table-border">
                            <p>{item?.nompes}</p>
                          </td>
                          <td className="table-border">
                            <p>{item?.nama}</p>
                          </td>
                          <td className="table-border">
                            <p>
                              {' '}
                              {dayjs(item?.tanggal_lahir)
                                .locale('id')
                                .format('DD-MM-YYYY')}
                            </p>
                          </td>
                          <td className="table-border">
                            <p>
                              {dayjs(item?.daftar)
                                .locale('id')
                                .format('DD-MM-YYYY HH:mm')}
                            </p>
                          </td>
                          <td className="table-border">
                            <p>{item?.jalur}</p>
                          </td>
                          <td className="table-border">
                            <p>{item?.pilihan1}</p>
                          </td>
                          <td className="table-border">
                            <p>{item?.skor1}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <div className="footer-space"></div>
              </td>
            </tr>
          </tfoot>
        </table>
        {/* <div className="header">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed natus
          quae, itaque officiis consectetur qui, at similique sunt perferendis
          beatae in fugit doloribus modi illo reiciendis, alias atque magni cum.
        </div>
        <div className="footer">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          fugit quam reprehenderit temporibus odio, illo optio saepe labore
          consequatur quae suscipit nemo fugiat facilis pariatur sequi
          exercitationem atque incidunt tempora.
        </div> */}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          handlePrint()
        }}
        type="button"
        className="flex items-center gap-12 rounded-2xl border border-[#005479] p-16 text-[#005479] hover:cursor-pointer hover:bg-[#005479] hover:text-white"
      >
        <Tooltips
          triggerComponent={<Printer size={16} />}
          tooltipContent={<span>Cetak</span>}
        />
      </button>
    </>
  )
}
