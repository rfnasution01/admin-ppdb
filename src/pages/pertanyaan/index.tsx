import { useState } from 'react'
import { DetailPertanyaanSiswa } from './detail-pertanyaan-siswa'
import { ListPertanyaanSiswa } from './list-pertanyaan-siswa'

export default function Pertanyaan() {
  const [name, setName] = useState<string>(null)

  return (
    <div className="grid h-full w-full grid-cols-12 gap-32">
      <div className="col-span-5 h-full">
        <ListPertanyaanSiswa name={name} setName={setName} />
      </div>
      <div className="scrollbar col-span-7 h-full overflow-y-auto">
        <DetailPertanyaanSiswa name={name} />
      </div>
    </div>
  )
}
