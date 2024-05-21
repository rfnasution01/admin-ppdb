import loadable from '@loadable/component'

// ------------------
// ----- Layouts -----
// ------------------

export const RootLayout = loadable(() => import('@/layouts/root-layout'))

// ------------------
// ----- Pages -----
// ------------------

export const ComingSoonPage = loadable(() => import('@/pages/coming-soon'))
export const LoginPage = loadable(() => import('@/pages/login'))
export const DashBoardPage = loadable(() => import('@/pages/dashboard'))
export const DayaTampungPage = loadable(() => import('@/pages/daya-tampung'))
export const VerifikasiPage = loadable(() => import('@/pages/verifikasi'))
export const ProfilSekolahPage = loadable(
  () => import('@/pages/profil-sekolah'),
)
export const DetailSiswaPage = loadable(
  () => import('@/features/verifikasi/detail-siswa'),
)
export const MappingSiswaPage = loadable(
  () => import('@/features/verifikasi/mapping-siswa'),
)
export const GantiPasswordPage = loadable(
  () => import('@/pages/ganti-password'),
)
export const DataOperatorPage = loadable(() => import('@/pages/data-operator'))
