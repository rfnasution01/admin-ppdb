import loadable from '@loadable/component'

// ------------------
// ----- Layouts -----
// ------------------

export const RootLayout = loadable(() => import('@/layouts/root-layout'))
export const DashBoardLayout = loadable(
  () => import('@/layouts/root-layout/dashboard-main'),
)
export const VerifikasiLayout = loadable(
  () => import('@/layouts/verifikasi-layout'),
)

// ------------------
// ----- Pages -----
// ------------------

export const ComingSoonPage = loadable(() => import('@/pages/coming-soon'))
export const LoginPage = loadable(() => import('@/pages/login'))
export const DashBoardPage = loadable(() => import('@/pages/dashboard'))
export const DayaTampungPage = loadable(() => import('@/pages/daya-tampung'))
export const ProfilSekolahPage = loadable(
  () => import('@/pages/profil-sekolah'),
)

export const GantiPasswordPage = loadable(
  () => import('@/pages/ganti-password'),
)
export const DataOperatorPage = loadable(() => import('@/pages/data-operator'))

export const VerifPage = loadable(() => import('@/pages/verif'))
export const DeetailSiswaPage = loadable(
  () => import('@/pages/verif/detail-siswa'),
)
export const DataPendaftarPage = loadable(
  () => import('@/pages/data-pendaftar'),
)

export const PendaftarPage = loadable(() => import('@/pages/pendaftaran'))
export const CariPage = loadable(() => import('@/pages/cari'))
export const LampiranPendaftarPage = loadable(
  () => import('@/pages/dashboard/pendaftar'),
)
