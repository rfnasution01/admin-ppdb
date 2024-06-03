import {
  Clipboard,
  HelpCircle,
  KeySquare,
  LayoutDashboard,
  School,
  Scroll,
  Search,
  ShieldCheck,
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
    title: 'Hasil PPDB',
    icon: <Scroll size={16} />,
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
    title: 'Pertanyaan Siswa',
    icon: <HelpCircle size={16} />,
  },
  {
    title: 'Hubungi Disdik',
    icon: <HelpCircle size={16} />,
  },
  {
    title: 'Ganti Password',
    icon: <KeySquare size={16} />,
  },
]
