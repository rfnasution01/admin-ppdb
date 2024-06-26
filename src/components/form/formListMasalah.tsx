import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form'
import { cn } from '@/libs/helpers/utils'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import Select, { components } from 'react-select'
import { customStyles } from '@/libs/dummy/selectProps'
import { ReferensiMasalahType } from '@/libs/types/tiket-type'
import { useGetMasalahQuery } from '@/store/slices/tiketSekolahAPI'

type inputProps = {
  placeholder: string
  isDisabled?: boolean
  name: string
  headerLabel?: string
  useFormReturn: UseFormReturn
  className?: string
  setIdMasalah?: Dispatch<SetStateAction<string>>
  setSiswa?: Dispatch<SetStateAction<number>>
}

export function FormListMasalah({
  name,
  headerLabel,
  placeholder,
  isDisabled,
  useFormReturn,
  className,
  setIdMasalah,
  setSiswa,
}: inputProps) {
  const [query, setQuery] = useState<string>(null)
  const [listMasalah, setListMasalah] = useState<ReferensiMasalahType[]>([])
  const { data, isSuccess, isLoading, isFetching } = useGetMasalahQuery()

  useEffect(() => {
    if (!isFetching) {
      if (data?.meta?.page > 1) {
        setListMasalah((prevData) => [...prevData, ...(data?.data ?? [])])
      } else {
        setListMasalah([...(data?.data ?? [])])
      }
    }
  }, [data?.data])

  let MasalahOption = []
  if (isSuccess) {
    MasalahOption = listMasalah.map((item) => {
      return {
        value: item?.id,
        label: item?.nama,
        siswa: item?.siswa,
      }
    })
  }

  const search = (newValue: string) => {
    if (newValue != query) {
      setQuery(newValue)
    }
  }

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <div ref={props.innerRef}>
          <div className="text-[12px]">{props.label}</div>
        </div>
      </components.Option>
    )
  }

  return (
    <FormField
      name={name}
      control={useFormReturn.control}
      render={({ field }) => {
        return (
          <FormItem
            className={cn(
              'flex w-1/2 flex-col gap-8 text-[2rem] phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]',
              className,
            )}
          >
            {headerLabel && (
              <div className="phones:w-full phones:text-left">
                <FormLabel>{headerLabel}</FormLabel>
              </div>
            )}
            <div className="w-full phones:w-full">
              <FormControl>
                <Select
                  {...field}
                  styles={{
                    ...customStyles,
                    singleValue: (provided) => ({
                      ...provided,
                      color: 'grey',
                    }),
                    input: (provided) => ({
                      ...provided,
                      color: 'grey',
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      padding: 0,
                      maxHeight: '50vh',
                      overflowY: 'auto',
                      '&::-webkit-scrollbar': {
                        width: 0,
                        height: 0,
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'transparent',
                        borderRadius: '6px',
                      },
                    }),
                    control: (provided) => ({
                      ...provided,
                      backgroundColor:
                        'rgb(255 255 255 / var(--tw-bg-opacity))',
                      border:
                        '1px solid rgb(203 213 225 / var(--tw-bg-opacity))',
                      borderRadius: '0.375rem',
                      fontSize: '2rem',
                    }),
                    option: (provided) => ({
                      ...provided,
                      backgroundColor:
                        'rgb(255 255 255 / var(--tw-bg-opacity))',
                      color: 'rgb(32 34 35 / var(--tw-bg-opacity))',
                      cursor: isDisabled ? 'not-allowed' : 'default',
                      ':hover': {
                        cursor: 'pointer',
                        backgroundColor:
                          'rgb(240 244 247 / var(--tw-bg-opacity))',
                      },
                    }),
                  }}
                  className={'text-[2rem]'}
                  options={MasalahOption}
                  value={
                    MasalahOption.filter(
                      (item) => item.value === field.value,
                    )[0]
                  }
                  placeholder={placeholder ?? 'Pilih'}
                  onInputChange={search}
                  onChange={(optionSelected) => {
                    field.onChange(optionSelected.value)
                    useFormReturn.setValue('idSiswa', optionSelected?.siswa)
                    if (setIdMasalah) {
                      setIdMasalah(optionSelected?.value)
                    }
                    if (setSiswa) {
                      console.log(optionSelected?.siswa)
                      setSiswa(optionSelected?.siswa)
                    }
                  }}
                  isDisabled={isDisabled}
                  isLoading={isFetching || isLoading}
                  components={{ Option }}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
