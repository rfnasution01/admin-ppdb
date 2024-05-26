import { PendaftarType } from '@/libs/types/pendaftar-type'
import { DataTitle } from './data-title'
import { DataComponent } from './mapping-jalur'
import { enumJalur } from '@/libs/enum/enum-jalur'
import { useEffect, useState } from 'react'
import { VerifikasiDetailType } from '@/libs/types/verifikasi-type'
import { useGetVerifikasiByIdQuery } from '@/store/slices/verifikasiAPI'
import Loading from '@/components/Loading'
import dayjs from 'dayjs'
import { NoData } from '@/components/NoData'
import {
  Award,
  FolderArchive,
  GraduationCap,
  MapPin,
  School,
  Scroll,
  User2,
} from 'lucide-react'

export function ExpandData({
  item,
  jenjang,
}: {
  item: PendaftarType
  jenjang: string
}) {
  // --- Detail ---
  const [detail, setDetail] = useState<VerifikasiDetailType>()
  const { data, isLoading, isFetching } = useGetVerifikasiByIdQuery(
    { id: item?.nompes },
    { skip: item?.nompes === null || item?.nompes === undefined },
  )

  useEffect(() => {
    if (data?.data) {
      setDetail(data?.data)
    }
  }, [data?.data])

  const loading = isFetching || isLoading

  return (
    <div className="flex flex-col gap-32 bg-white p-24 ">
      {loading ? (
        <Loading />
      ) : (
        <div className="mb-32 flex flex-col gap-32">
          {/* --- Jalur --- */}
          <DataTitle
            title={
              <div className="flex items-center gap-12">
                <MapPin size={16} />
                <p>Jalur</p>
              </div>
            }
          >
            <DataComponent
              label="Jalur"
              value={
                item?.jalur === enumJalur.AFIRMASI
                  ? 'Afirmasi Ekonomi Tidak Mampus'
                  : item?.jalur === enumJalur.DISABILITAS
                    ? 'Afirmasi Penyandang Disabilitas'
                    : item?.jalur === enumJalur.PINDAHTUGAS
                      ? 'Pindah Tugas Orang Tua'
                      : item?.jalur === enumJalur.PRESTASI
                        ? 'Prestasi'
                        : item?.jalur === enumJalur.ZONASI
                          ? 'Zonasi'
                          : 'Zonasi' ?? '-'
              }
            />
          </DataTitle>

          <hr className="border" />
          {/* --- Biodata --- */}
          <DataTitle
            title={
              <div className="flex items-center gap-12">
                <Scroll size={16} />
                <p>Biodata</p>
              </div>
            }
          >
            <DataComponent
              label="No. Peserta"
              value={detail?.biodata?.nomor_peserta ?? '-'}
            />
            <DataComponent label="Nama" value={detail?.biodata?.nama ?? '-'} />
            <DataComponent
              label="TTL"
              value={
                detail?.biodata?.tanggal_lahir
                  ? `${item?.tempat_lahir}, ${dayjs(item?.tanggal_lahir).locale('id').format('DD MMMM YYYY')}`
                  : '' ?? '-'
              }
            />
            <DataComponent
              label="Jenis Kelamin"
              value={
                detail?.biodata?.jenis_kelamin === 'L'
                  ? 'Laki-laki'
                  : 'Perempuan' ?? '-'
              }
            />
            <DataComponent
              label="Agama"
              value={detail?.biodata?.agama ?? '-'}
            />
            <DataComponent label="NIK" value={detail?.biodata?.nik ?? '-'} />
            <DataComponent
              label="No. KK"
              value={detail?.biodata?.nomor_kk ?? '-'}
            />
            <DataComponent
              label="No .Hp"
              value={detail?.biodata?.telepon ?? '-'}
            />
            <DataComponent
              label="Provinsi"
              value={detail?.biodata?.provinsi ?? '-'}
            />
            <DataComponent
              label="Kabupaten"
              value={detail?.biodata?.kabupaten ?? '-'}
            />
            <DataComponent
              label="Kecamatan"
              value={detail?.biodata?.kecamatan ?? '-'}
            />
            <DataComponent label="Desa" value={detail?.biodata?.desa ?? '-'} />
            <DataComponent
              label="Dusun"
              value={detail?.biodata?.dusun ?? '-'}
            />
            <DataComponent
              label="Alamat"
              value={detail?.biodata?.alamat_lengkap ?? '-'}
            />
          </DataTitle>
          {jenjang.toLowerCase() === 'smp' && (
            <>
              <hr className="border" />
              {/* --- Sekolah --- */}
              <DataTitle
                title={
                  <div className="flex items-center gap-12">
                    <School size={16} />
                    <p>Sekolah</p>
                  </div>
                }
              >
                <DataComponent
                  label="NISN"
                  value={detail?.sekolah?.nisn ?? '-'}
                />
                <DataComponent
                  label="NPSN"
                  value={detail?.sekolah?.npsn ?? '-'}
                />
                <DataComponent
                  label="Nama Sekolah"
                  value={detail?.sekolah?.nama_sekolah ?? '-'}
                />
                <DataComponent
                  label="Tahun Lulus"
                  value={detail?.sekolah?.tahun_lulus ?? '-'}
                />
              </DataTitle>
            </>
          )}

          <hr className="border" />
          {/* --- Orang Tua --- */}
          <DataTitle
            title={
              <div className="flex items-center gap-12">
                <User2 size={16} />
                <p>Orang Tua</p>
              </div>
            }
          >
            <div className="flex w-full gap-32 phones:flex-col phones:items-start phones:gap-12">
              <div className="flex w-1/3 flex-1 flex-col phones:w-full">
                <p className="text-[2.2rem] font-bold phones:text-[2.6rem]">
                  Ayah
                </p>
                <DataComponent
                  label="Status"
                  value={detail?.orangtua?.ayah?.status ?? '-'}
                  isOrangTua
                />
                <DataComponent
                  label="Nama"
                  value={detail?.orangtua?.ayah?.nama ?? '-'}
                  isOrangTua
                />
                <DataComponent
                  label="NIK"
                  value={detail?.orangtua?.ayah?.nik ?? '-'}
                  isOrangTua
                />
                <DataComponent
                  label="No. Hp"
                  value={detail?.orangtua?.ayah?.hp ?? '-'}
                  isOrangTua
                />
                <DataComponent
                  label="Pekerjaan"
                  value={detail?.orangtua?.ayah?.pekerjaan ?? '-'}
                  isOrangTua
                />
                <DataComponent
                  label="Pendidikan"
                  value={detail?.orangtua?.ayah?.pendidikan ?? '-'}
                  isOrangTua
                />
              </div>
              {/* --- Ibu --- */}
              <div className="flex w-1/3 flex-1 flex-col phones:w-full">
                <p className="text-[2.2rem] font-bold phones:text-[2.6rem]">
                  Ibu
                </p>
                <DataComponent
                  label="Status"
                  value={detail?.orangtua?.ibu?.status ?? '-'}
                  isOrangTua
                />
                <DataComponent
                  label="Nama"
                  value={detail?.orangtua?.ibu?.nama ?? '-'}
                  isOrangTua
                />
                <DataComponent
                  label="NIK"
                  value={detail?.orangtua?.ibu?.nik ?? '-'}
                  isOrangTua
                />
                <DataComponent
                  label="No. Hp"
                  value={detail?.orangtua?.ibu?.hp ?? '-'}
                  isOrangTua
                />
                <DataComponent
                  label="Pekerjaan"
                  value={detail?.orangtua?.ibu?.pekerjaan ?? '-'}
                  isOrangTua
                />
                <DataComponent
                  label="Pendidikan"
                  value={detail?.orangtua?.ibu?.pendidikan ?? '-'}
                  isOrangTua
                />
              </div>
              {/* --- Wali --- */}
              <div className="flex w-1/3 flex-1 flex-col phones:w-full">
                <p className="text-[2.2rem] font-bold phones:text-[2.6rem]">
                  Wali
                </p>

                <DataComponent
                  label="Nama"
                  value={detail?.orangtua?.wali?.nama ?? '-'}
                  isOrangTua
                />
                <DataComponent
                  label="NIK"
                  value={detail?.orangtua?.wali?.nik ?? '-'}
                  isOrangTua
                />
                <DataComponent
                  label="No. Hp"
                  value={detail?.orangtua?.wali?.hp ?? '-'}
                  isOrangTua
                />
                <DataComponent
                  label="Pekerjaan"
                  value={detail?.orangtua?.wali?.pekerjaan ?? '-'}
                  isOrangTua
                />
                <DataComponent
                  label="Pendidikan"
                  value={detail?.orangtua?.wali?.pendidikan ?? '-'}
                  isOrangTua
                />
              </div>
            </div>
          </DataTitle>

          <hr className="border" />
          {/* --- Dokumen --- */}
          <DataTitle
            title={
              <div className="flex items-center gap-12">
                <FolderArchive size={16} />
                <p>Dokumen</p>
              </div>
            }
          >
            {detail?.dokumen?.length === 0 ? (
              <NoData />
            ) : (
              <div className="grid grid-cols-12 gap-32">
                {detail?.dokumen?.map((item, idx) => (
                  <div
                    className="col-span-4 flex flex-col gap-8 rounded-2xl border border-border p-24 phones:col-span-12"
                    key={idx}
                  >
                    <DataComponent
                      label="Nama"
                      value={item?.nama ?? '-'}
                      isOrangTua
                    />
                    <DataComponent
                      label="File"
                      isOrangTua
                      link={item?.dok_siswa ?? '-'}
                    />
                    <DataComponent
                      label="Verifikasi Sekolah"
                      value={item?.verifikasi_on ?? '-'}
                      isOrangTua
                    />
                    <DataComponent
                      label="Verifikasi User"
                      value={item?.petugas ?? '-'}
                      isOrangTua
                    />
                    <DataComponent
                      label="Tanggal Verifikasi"
                      value={
                        dayjs(item?.verifikasi_on)
                          .locale('id')
                          .format('DD MMMM YYYY HH:mm:ss') ?? '-'
                      }
                      isOrangTua
                    />
                    <DataComponent
                      label="Catatan"
                      value={item?.komentar ?? '-'}
                      isOrangTua
                    />
                  </div>
                ))}
              </div>
            )}
          </DataTitle>

          {item?.jalur?.toLowerCase() === 'pr' && (
            <>
              <hr className="border" />
              {/* --- Prestasi --- */}
              <DataTitle
                title={
                  <div className="flex items-center gap-12">
                    <Award size={16} />
                    <p>Prestasi</p>
                  </div>
                }
              >
                {detail?.prestasi?.data?.length === 0 ? (
                  <NoData />
                ) : (
                  <div className="grid grid-cols-12 gap-32">
                    {detail?.prestasi?.data?.map((item, idx) => (
                      <div
                        className="col-span-4 flex flex-col gap-8 rounded-2xl border border-border p-24 phones:col-span-12"
                        key={idx}
                      >
                        <DataComponent
                          label="Nama Prestasi"
                          value={item?.nama_prestasi ?? '-'}
                          isOrangTua
                        />

                        <DataComponent
                          label="Tingkat"
                          value={item?.tingkat ?? '-'}
                          isOrangTua
                        />
                        <DataComponent
                          label="Juara"
                          value={item?.juara ?? '-'}
                          isOrangTua
                        />
                        <DataComponent
                          label="Kelas"
                          value={item?.kelas ?? '-'}
                          isOrangTua
                        />
                        <DataComponent
                          label="Penyelenggara"
                          value={item?.penyelenggara ?? '-'}
                          isOrangTua
                        />
                        <DataComponent
                          label="Sertifikat"
                          link={item?.sertifikat ?? '-'}
                          isOrangTua
                        />
                        <DataComponent
                          label="Tanggal Validasi"
                          value={
                            dayjs(item?.tgl_validasi)
                              .locale('id')
                              .format('DD MMMM YYYY HH:mm:ss') ?? '-'
                          }
                          isOrangTua
                        />
                        <DataComponent
                          label="User Validasi"
                          value={item?.user_validasi ?? '-'}
                          isOrangTua
                        />
                        <DataComponent
                          label="Catatan"
                          value={item?.catatan ?? '-'}
                          isOrangTua
                        />
                      </div>
                    ))}
                  </div>
                )}
              </DataTitle>
            </>
          )}

          <hr className="border" />
          {/* --- Pilihan --- */}
          <DataTitle
            title={
              <div className="flex items-center gap-12">
                <GraduationCap size={16} />
                <p>Pilihan</p>
              </div>
            }
          >
            <div className="flex w-full gap-32 phones:flex-col phones:items-start phones:gap-12">
              {/* --- Gelombang 1 --- */}
              <div className="flex w-1/3 flex-1 flex-col phones:w-full">
                <p className="text-[2.2rem] font-bold phones:text-[2.6rem]">
                  Pilihan 1
                </p>
                <DataComponent
                  label="Nama Sekolah"
                  value={detail?.pilihan?.pilihan1?.nama_sekolah ?? '-'}
                  isOrangTua
                />
                <DataComponent
                  label="Skor"
                  value={detail?.pilihan?.pilihan1?.skor.toString() ?? '-'}
                  isOrangTua
                />
              </div>
              {/* --- Gelombang 2 --- */}
              {jenjang.toLowerCase() === 'smp' && (
                <div className="flex w-1/3 flex-1 flex-col phones:w-full">
                  <p className="text-[2.2rem] font-bold phones:text-[2.6rem]">
                    Pilihan 2
                  </p>
                  <DataComponent
                    label="Nama Sekolah"
                    value={detail?.pilihan?.pilihan2?.nama_sekolah ?? '-'}
                    isOrangTua
                  />
                  <DataComponent
                    label="Skor"
                    value={detail?.pilihan?.pilihan2?.skor.toString() ?? '-'}
                    isOrangTua
                  />
                </div>
              )}
            </div>
          </DataTitle>
        </div>
      )}
    </div>
  )
}
