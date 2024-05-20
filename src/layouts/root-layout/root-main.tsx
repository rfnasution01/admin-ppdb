import { AlignJustify } from 'lucide-react'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { MainHeader } from './main-header'
import { ModalAside } from './modal-aside'
import { ContentTitle } from './content-title'

export default function RootMain() {
  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <main className="scrollbar flex h-screen overflow-auto bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50 text-[2.4rem] text-slate-700 phones:text-[2.8rem]">
      <aside className="scrollbar h-full overflow-auto bg-white p-32 shadow-md phones:hidden">
        <MainHeader />
      </aside>
      <section className="scrollbar h-full w-full flex-1 overflow-auto">
        <div className="flex h-full w-full flex-col items-start justify-start gap-32">
          <div className="hidden phones:block">
            {/* --- Header --- */}
            <div className="flex items-center justify-between gap-32 bg-white p-32 shadow-md">
              <Link to="/">
                <img src="/img/logo.png" alt="PPDB" className="h-[5rem]" />
              </Link>
              <span onClick={() => setIsShow(true)}>
                <AlignJustify size={20} />
              </span>
            </div>
          </div>
          <div className="flex h-full w-full flex-1 flex-col items-start justify-start gap-32 p-32">
            <ContentTitle />
            <div className="flex w-full flex-1 items-start justify-start">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
      <ModalAside setIsOpen={setIsShow} isOpen={isShow} />
    </main>
  )
}
