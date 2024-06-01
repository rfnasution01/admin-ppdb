import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export function StatistikPendaftar({
  jsonData,
}: {
  jsonData: { nama: string; jumlah: number }[]
}) {
  const data = {
    labels: jsonData?.map((item) => item.nama), // Ambil nama_kategori sebagai label
    datasets: [
      {
        data: jsonData?.map((item) => item.jumlah), // Ambil jumlah_soal sebagai data
        backgroundColor: ['rgb(0, 84, 121)', 'rgb(211, 226, 231)'],
        hoverOffset: 4,
      },
    ],
  }

  return (
    <div className="flex w-1/5 flex-col gap-y-24 rounded-2xl phones:w-full">
      <Doughnut
        data={data}
        options={{ plugins: { legend: { display: false } } }}
      />
    </div>
  )
}
