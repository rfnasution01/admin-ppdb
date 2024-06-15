import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import clsx from 'clsx'
import { TimeflowLoading } from './TimeflowLoading'
import { ChevronDown } from 'lucide-react'
import { DaftarUlangType, SiswaType } from '@/libs/types/daftar-ulang-type'

export type Column<T> = {
  header: string
  key?: string | number
  renderCell?: (rowData: T) => React.ReactNode
  width?: string
}

type Props = {
  data: SiswaType[]
  dataRow?: string[]
  setDataRow?: Dispatch<SetStateAction<string[]>>
  columns: Column<SiswaType>[] | ((props: SiswaType) => Column<SiswaType>[])
  containerClasses?: string
  maxHeight?: string
  loading?: boolean
  columnProps?: SiswaType
  onItemClick?: (rowData: SiswaType) => void
  collapseComponent?: React.ReactNode
  checkbox?: boolean
  isNo?: boolean
  page?: number
  pageSize?: number
  isSelect?: boolean
}

export function TableDaftarUlang({
  data,
  columns,
  containerClasses = '',
  maxHeight = 'max-h-[60vh]',
  loading,
  columnProps,
  onItemClick,
  collapseComponent,
  checkbox,
  isNo,
  page,
  pageSize,
  isSelect,
  dataRow,
  setDataRow,
}: Props) {
  const [rowIsOpen, setRowIsOpen] = useState<number | null>(null)

  const columnArray =
    typeof columns === 'function' ? columns(columnProps as SiswaType) : columns

  const toggleCheckbox = (id: string) => {
    if (dataRow?.includes(id)) {
      // Remove from listIdSelect
      const newList = dataRow.filter((itemId) => itemId !== id)
      // Update listIdSelect state
      if (setDataRow) {
        setDataRow(newList)
      }
    } else {
      // Add to listIdSelect
      const newList = [...dataRow, id]
      // Update listIdSelect state
      if (setDataRow) {
        setDataRow(newList)
      }
    }
  }

  return (
    <div className={`rounded-2xl ${containerClasses}`}>
      {/* ----- Loading UI ----- */}
      {loading ? (
        <TimeflowLoading width="6.4rem" height="6.4rem" />
      ) : (
        <div
          className={`scrollbar flex flex-col overflow-auto ${maxHeight}`}
          style={{ scrollbarGutter: 'stable' }}
        >
          {/* ----- No Data/Fallback UI ----- */}
          {!data || data.length === 0 ? (
            <p className="text-[2rem] text-typography-disabled">No data.</p>
          ) : (
            <table className="flex-1 border-collapse text-[2rem]">
              <thead className="relative z-10 align-top leading-medium">
                <tr className="border-b-[1.6rem] border-transparent">
                  {/* ----- Detail Header ----- */}
                  {isNo && (
                    <th className="sticky right-0 top-0 bg-background p-16 text-left">
                      <span className=" ">#</span>
                    </th>
                  )}
                  {/* ----- Table Headers ----- */}
                  {columnArray
                    .filter((column) => !column.header.includes('Aksi'))
                    .map((column, colIndex) => (
                      <th
                        className={`sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase ${column.width}`}
                        key={column.key || colIndex.toString()}
                      >
                        {column.header}
                      </th>
                    ))}

                  {isSelect && (
                    <th className="sticky right-0 top-0 bg-background p-16 text-left">
                      <span className=" ">Select</span>
                    </th>
                  )}

                  {/* ----- Detail Header ----- */}
                  {collapseComponent && (
                    <th className="sticky right-0 top-0 bg-white p-16 text-left">
                      <span className="shadow-[-2.4rem_0_0.4rem_rgb(255,255,255)]">
                        Detail
                      </span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <Fragment key={rowIndex}>
                    <tr
                      className={clsx(
                        'border-b-[1.6rem] border-transparent transition-all ease-in odd:bg-surface-disabled hover:cursor-pointer hover:bg-warning-tint-2',
                      )}
                      onClick={onItemClick ? () => onItemClick(row) : undefined}
                    >
                      {isNo && (
                        <td className="text-center align-middle">
                          {page * pageSize - pageSize + rowIndex + 1}
                        </td>
                      )}

                      {/* ----- Table Data ----- */}
                      {columnArray
                        .filter((column) => !column.header.includes('Aksi'))
                        .map((column, colIndex) => (
                          <td
                            className={`px-24 py-12 leading-medium ${column.width}`}
                            key={column.key || colIndex.toString()}
                          >
                            {column.renderCell
                              ? column.renderCell(row)
                              : (row[
                                  column.key as keyof DaftarUlangType
                                ] as React.ReactNode) || '-'}
                          </td>
                        ))}

                      {isSelect && (
                        <td className="text-center align-middle">
                          <input
                            type="checkbox"
                            disabled={row?.registrasi === 1}
                            checked={dataRow?.includes(row?.nompes as string)}
                            className="disabled:cursor-not-allowed"
                            onChange={() =>
                              toggleCheckbox(row?.nompes as string)
                            }
                          />
                        </td>
                      )}

                      {/* ----- Collapse Trigger ----- */}
                      {collapseComponent && (
                        <td className="sticky right-0 bg-white p-16">
                          <div className="shadow-[-2.4rem_0_0.4rem_rgb(255,255,255)]">
                            <button
                              className="rounded-full p-4 transition-all ease-in hover:bg-neutral-100"
                              onClick={() => {
                                if (rowIsOpen === rowIndex) {
                                  setRowIsOpen(null)
                                } else {
                                  setRowIsOpen(rowIndex)
                                }
                              }}
                            >
                              <ChevronDown
                                width={20}
                                height={20}
                                className={clsx('transition-all ease-in', {
                                  'rotate-180': rowIsOpen === rowIndex,
                                  'rotate-0': rowIsOpen !== rowIndex,
                                })}
                              />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>

                    {/* ----- Collapse Content ----- */}
                    {collapseComponent && (
                      <tr>
                        <td colSpan={columnArray.length + (checkbox ? 2 : 1)}>
                          <div
                            className={clsx(
                              'overflow-hidden border-b bg-neutral-100 bg-opacity-[0.15] px-8 transition-all ease-in',
                              {
                                'max-h-full translate-y-0 py-16 opacity-100':
                                  rowIsOpen === rowIndex,
                                'max-h-0 -translate-y-16 opacity-0':
                                  rowIsOpen !== rowIndex,
                              },
                            )}
                          >
                            {collapseComponent}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
