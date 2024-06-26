import { cn } from '@/libs/helpers/utils'
import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import Select, { components } from 'react-select'
import { customStyles } from '@/libs/dummy/selectProps'
import { KecamatanType } from '@/libs/types/profil-type'
import { useGetKecamatanQuery } from '@/store/slices/profilAPI'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form'

type inputProps = {
  placeholder: string
  isDisabled?: boolean
  name: string
  headerLabel: string
  useFormReturn: UseFormReturn
  className?: string
  isBiodata?: boolean
}

export function FormListKecamatan({
  name,
  isBiodata,
  headerLabel,
  placeholder,
  isDisabled,
  useFormReturn,
  className,
}: inputProps) {
  const [query, setQuery] = useState<string>(null)
  const [listKecamatan, setListKecamatan] = useState<KecamatanType[]>([])

  const { data, isSuccess, isLoading, isFetching } = useGetKecamatanQuery()

  useEffect(() => {
    if (!isFetching) {
      if (data?.meta?.page > 1) {
        setListKecamatan((prevData) => [...prevData, ...(data?.data ?? [])])
      } else {
        setListKecamatan([...(data?.data ?? [])])
      }
    }
  }, [data])

  let kecamatanOption = []
  if (isSuccess) {
    kecamatanOption = listKecamatan.map((item) => {
      return {
        value: item?.id,
        label: item?.nama,
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
              'flex w-full items-center gap-32 text-[2rem] phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]',
              className,
            )}
          >
            <div
              className={`${isBiodata ? 'w-1/6' : 'w-2/6'} phones:w-full phones:text-left`}
            >
              <FormLabel>{headerLabel}</FormLabel>
            </div>
            <div className={`${isBiodata ? 'w-2/6' : 'w-full'} phones:w-full`}>
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
                  options={kecamatanOption}
                  value={
                    kecamatanOption.filter(
                      (item) => item.value === field.value,
                    )[0]
                  }
                  placeholder={placeholder ?? 'Pilih'}
                  onInputChange={search}
                  onChange={(optionSelected) => {
                    field.onChange(optionSelected.value)
                    useFormReturn.setValue('kecamatan', optionSelected.value)
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
