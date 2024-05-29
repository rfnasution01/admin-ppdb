import { Outlet } from 'react-router-dom'

export default function DashboardMain() {
  return (
    <main className="flex h-full w-full">
      <Outlet />
    </main>
  )
}
