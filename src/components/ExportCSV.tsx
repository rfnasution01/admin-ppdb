import XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import Tooltips from './Tooltip'
import { Download } from 'lucide-react'
import dayjs from 'dayjs'
import { HasilDetailType } from '@/libs/types/hasil-type'

const ExportCSV = ({ csvData }) => {
  const exportToExcel = (customData) => {
    const today = dayjs('2024-07-01')

    // Contoh struktur data yang akan diexport ke XLSX
    const data = customData.map((item: HasilDetailType, idx) => {
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
        tempat_lahir: item?.tempat_lahir,
        'Tgl Lahir': birthday.locale('id').format('DD-MM-YYYY'),
        Umur: `${years} Thn ${months} Bln ${days} Hr`,
        Skor: item?.skor,
        Daftar: dayjs(item?.tanggal_daftar)
          .locale('id')
          .format('DD-MM-YYYY HH:mm'),
        Pilihan: item?.pilihan,
        Status: item?.status,
        jalur: item?.jalur,
        nik: item?.nik,
        jk: item?.jk,
        nomor_kk: item?.nomor_kk,
        telepon: item?.telepon,
        agama: item?.agama,
        provinsi: item?.provinsi,
        kabupaten: item?.kabupaten,
        kecamatan: item?.kecamatan,
        desa: item?.desa,
        alamat_lengkap: item?.alamat_lengkap,
        tahun_lulus: item?.tahun_lulus,
        npsn: item?.npsn,
        nama_sekolah: item?.nama_sekolah,
        gelombang: item?.gelombang,
        pilihan1: item?.pilihan1,
        pilihan2: item?.pilihan2,
        skor1: item?.skor1,
        skor2: item?.skor2,
        validasi: item?.validasi,
        verifikasi: item?.verifikasi,
        status_ayah: item?.status_ayah,
        nik_ayah: item?.nik_ayah,
        nama_ayah: item?.nama_ayah,
        hp_ayah: item?.hp_ayah,
        pekerjaan_ayah: item?.pekerjaan_ayah,
        pendidikan_ayah: item?.pendidikan_ayah,
        status_ibu: item?.status_ibu,
        nik_ibu: item?.nik_ibu,
        nama_ibu: item?.nama_ibu,
        hp_ibu: item?.hp_ibu,
        pekerjaan_ibu: item?.pekerjaan_ibu,
        pendidikan_ibu: item?.pendidikan_ibu,
        nik_wali: item?.nik_wali,
        nama_wali: item?.nama_wali,
        hp_wali: item?.hp_wali,
        pekerjaan_wali: item?.pekerjaan_wali,
        pendidikan_wali: item?.pendidikan_wali,
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
      className="flex items-center gap-12 rounded-2xl border border-[#005479] p-16 text-[#005479] hover:cursor-pointer hover:bg-[#005479] hover:text-white"
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
