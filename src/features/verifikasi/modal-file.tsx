/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent } from '@/components/Dialog'
import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

export function ModalFile({
  isOpen,
  setIsOpen,
  gambar,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  gambar: string
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        position="middle"
        style={{
          width: '70%',
        }}
      >
        <div className="flex flex-col gap-16 p-32">
          <Link
            to={gambar}
            target="_blank"
            className="rounded-lg bg-primary px-24 py-12 text-center text-white"
          >
            Download File
          </Link>
          <img src={gambar} alt="File" className="max-h-[80vh] max-w-[80vw]" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
