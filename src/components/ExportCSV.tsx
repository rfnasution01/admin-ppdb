import XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import Tooltips from './Tooltip'
import { Download } from 'lucide-react'
import dayjs from 'dayjs'
import { PendaftarType } from '@/libs/types/pendaftar-type'

const ExportCSV = ({ csvData }) => {
  const exportToExcel = (customData) => {
    const today = dayjs()

    // Contoh struktur data yang akan diexport ke XLSX
    const data = customData.map((item: PendaftarType, idx) => {
      const birthday = dayjs(item?.tanggal_lahir, 'YYYY-MM-DD') // Parse tanggal lahir dengan format tertentu
      // Menghitung tahun, bulan, dan hari
      const diff = today.diff(birthday, 'day')
      const years = Math.floor(diff / 365) // Menghitung tahun
      const months = Math.floor((diff % 365) / 30.436875) // Menghitung bulan
      const days = Math.floor(diff % 30.436875) // Menghitung sisa hari

      return {
        // Sesuaikan properti di sini sesuai kebutuhan Anda
        No: idx + 1,
        Nompes: item?.nompes,
        NISN: item?.nisn,
        Nama: item?.nama,
        'Tgl Lahir': birthday.locale('id').format('DD-MM-YYYY'),
        Umur: `${years} Thn ${months} Bln ${days} Hr`,
        Skor: item?.skor1,
        Daftar: dayjs(item?.daftar).locale('id').format('DD-MM-YYYY HH:mm'),
        Urutan: idx + 1,
        Status: item?.verifikasi === '2' ? 'Lulus' : 'Tidak Lulus',
      }
    })

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
    const buf = new ArrayBuffer(wbout.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i < wbout.length; i++) {
      view[i] = wbout.charCodeAt(i) & 0xff
    }
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'data.xlsx')
  }

  return (
    <button
      type="button"
      onClick={() => {
        exportToExcel(csvData)
      }}
      className="flex items-center gap-12 rounded-2xl border border-primary p-16 text-primary hover:cursor-pointer hover:bg-primary hover:text-white"
    >
      <Tooltips
        triggerComponent={<Download size={16} />}
        tooltipContent={<span>Unduh Excel</span>}
      />
    </button>
  )
}

export default ExportCSV

// This component is a presentational component which takes the data to download and file name as props. The exportToCSV method is invoked when the export button is clicked on line 20.
