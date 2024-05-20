import {
  Clipboard,
  LayoutDashboard,
  PencilLine,
  School,
  ShieldCheck,
  Ticket,
  Users2,
} from 'lucide-react'

export const ListNavigasi = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard size={16} />,
  },
  {
    title: 'Profil Sekolah',
    icon: <School size={16} />,
  },
  {
    title: 'Daya Tampung',
    icon: <Users2 size={16} />,
  },
  {
    title: 'Permintaan Verifikasi',
    icon: <ShieldCheck size={16} />,
  },
  {
    title: 'Data Pendaftar',
    icon: <Clipboard size={16} />,
  },
  {
    title: 'Open Ticket / Layanan',
    icon: <Ticket size={16} />,
  },
  {
    title: 'Pengguna Aplikasi',
    icon: <PencilLine size={16} />,
  },
]
