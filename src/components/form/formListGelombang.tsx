import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form'
import { cn } from '@/libs/helpers/utils'
import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import Select, { components } from 'react-select'
import { customStyles } from '@/libs/dummy/selectProps'
import { useGetDashboardQuery } from '@/store/slices/dashboardAPI'
import { GelombangType } from '@/libs/types/dashboard-type'
import { useDispatch } from 'react-redux'
import { setStateIdGelombang } from '@/store/reducer/stateIdGelombang'

type inputProps = {
  placeholder: string
  isDisabled?: boolean
  name: string
  headerLabel?: string
  useFormReturn: UseFormReturn
  className?: string
  handleFormGelombang(values: string): Promise<void>
  id: string
}

export function FormListGelombang({
  name,
  headerLabel,
  placeholder,
  isDisabled,
  useFormReturn,
  className,
  handleFormGelombang,
  id,
}: inputProps) {
  const [query, setQuery] = useState<string>(null)
  const [listGelombang, setListGelombang] = useState<GelombangType[]>([])
  const { data, isSuccess, isLoading, isFetching } = useGetDashboardQuery()

  useEffect(() => {
    if (!isFetching) {
      if (data?.meta?.page > 1) {
        const gelombangNow = data?.data?.gelombang?.find(
          (item) => item?.id === id,
        )
        useFormReturn?.setValue('gelombang', gelombangNow?.id)

        setListGelombang((prevData) => [
          ...prevData,
          ...(data?.data?.gelombang ?? []),
        ])
      } else {
        setListGelombang([...(data?.data?.gelombang ?? [])])
      }
    }
  }, [data?.data])

  let GelombangOption = []
  if (isSuccess) {
    GelombangOption = listGelombang.map((item) => {
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

  const dispatch = useDispatch()

  return (
    <FormField
      name={name}
      control={useFormReturn.control}
      render={({ field }) => {
        return (
          <FormItem
            className={cn(
              'z-50 flex w-full items-center gap-32 text-[2rem] phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]',
              className,
            )}
          >
            {headerLabel && (
              <div className="w-full phones:w-full phones:text-left">
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
                  options={GelombangOption}
                  value={
                    GelombangOption.filter(
                      (item) => item.value === field.value,
                    )[0]
                  }
                  placeholder={placeholder ?? 'Pilih'}
                  onInputChange={search}
                  onChange={(optionSelected) => {
                    field.onChange(optionSelected?.value)
                    handleFormGelombang(optionSelected?.value)
                    dispatch(setStateIdGelombang({ id: optionSelected?.value }))
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
