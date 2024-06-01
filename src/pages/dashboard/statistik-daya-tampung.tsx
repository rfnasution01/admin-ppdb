import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { DayaTampungType } from '@/libs/types/profil-type'

ChartJS.register(ArcElement, Tooltip, Legend)

export function StatistikDayaTampung({
  jsonData,
}: {
  jsonData: DayaTampungType[]
}) {
  const data = {
    labels: jsonData?.map((item) => item.nama), // Ambil nama_kategori sebagai label
    datasets: [
      {
        data: jsonData?.map((item) => item.jumlah), // Ambil jumlah_soal sebagai data
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(0, 128, 128)',
        ],
        hoverOffset: 4,
      },
    ],
  }

  return (
    <div className="flex w-1/3 flex-col gap-y-24 rounded-2xl bg-white p-32 phones:w-full">
      <Doughnut
        data={data}
        options={{ plugins: { legend: { display: false } } }}
      />
    </div>
  )
}
