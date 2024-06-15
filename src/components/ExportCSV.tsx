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
        Jalur: item?.jalur,
        NIK: item?.nik,
        'Jenis Kelamin': item?.jk === 'L' ? 'Laki-laki' : 'Perempuan',
        'Nomor KK': item?.nomor_kk,
        Telepon: item?.telepon,
        Agama: item?.agama,
        Provinsi: item?.provinsi,
        Kabupaten: item?.kabupaten,
        Kecamatan: item?.kecamatan,
        Desa: item?.desa,
        'Alamat Lengkap': item?.alamat_lengkap,
        'tahun Lulus': item?.tahun_lulus,
        NPSN: item?.npsn,
        'Nama Sekolah': item?.nama_sekolah,
        Gelombang: item?.gelombang,
        'Pilihan 1': item?.pilihan1,
        'Pilihan 2': item?.pilihan2,
        'Skor 1': item?.skor1,
        'skor 2': item?.skor2,
        validasi: item?.validasi === 1 ? 'Sudah' : 'Belum',
        verifikasi:
          item?.verifikasi === 2
            ? 'Berhasil'
            : item?.verifikasi === 3
              ? 'Ditolak'
              : 'Menunggu',
        'Status Ayah': item?.status_ayah,
        'NIK Ayah': item?.nik_ayah,
        'Nama Ayah': item?.nama_ayah,
        'HP Ayah': item?.hp_ayah,
        'Pekerjaan Ayah': item?.pekerjaan_ayah,
        'Pendidikan Ayah': item?.pendidikan_ayah,
        'Status Ibu': item?.status_ibu,
        'NIK Ibu': item?.nik_ibu,
        'Nama Ibu': item?.nama_ibu,
        'HP Ibu': item?.hp_ibu,
        'Pekerjaan Ibu': item?.pekerjaan_ibu,
        PendidikanIbu: item?.pendidikan_ibu,
        'NIK Wali': item?.nik_wali,
        'Nama Wali': item?.nama_wali,
        'HP Wali': item?.hp_wali,
        'Pekerjaan Wali': item?.pekerjaan_wali,
        'Pendidikan Wali': item?.pendidikan_wali,
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
