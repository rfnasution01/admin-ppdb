import { useEffect, useState } from 'react'
import { LoadingCandles } from '@/components/loadings'
import RootMain from './root-main'

export default function RootLayout() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulasi proses loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 4000) // Contoh: 2 detik

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="scrollbar h-screen overflow-auto bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50 text-center text-[2.4rem]">
      {loading ? <LoadingCandles /> : <RootMain />}
    </div>
  )
}
