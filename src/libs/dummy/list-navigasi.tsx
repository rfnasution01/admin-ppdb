import {
  Clipboard,
  KeySquare,
  LayoutDashboard,
  PencilLine,
  School,
  Search,
  ShieldCheck,
  Ticket,
  UserRound,
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
    title: 'Data Operator',
    icon: <UserRound size={16} />,
  },
  {
    title: 'Cari Siswa',
    icon: <Search size={16} />,
  },
  {
    title: 'Open Ticket',
    icon: <Ticket size={16} />,
  },
  {
    title: 'Pengguna Aplikasi',
    icon: <PencilLine size={16} />,
  },
  {
    title: 'Ganti Password',
    icon: <KeySquare size={16} />,
  },
]
