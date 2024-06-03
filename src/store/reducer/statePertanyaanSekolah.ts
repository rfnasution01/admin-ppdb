import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StatePertanyaanSekolahType = {
  detail: string | null
  page: string | null
}

const initialState: StatePertanyaanSekolahType = {
  detail: null,
  page: null,
}

const statePertanyaanSekolahSlice = createSlice({
  name: 'pertanyaanSekolah',
  initialState,
  reducers: {
    setStatePertanyaanSekolah: (
      state,
      action: PayloadAction<StatePertanyaanSekolahType>,
    ) => {
      const { detail } = action.payload
      state.detail = detail
    },
  },
})

export const { setStatePertanyaanSekolah } = statePertanyaanSekolahSlice.actions

export const getPertanyaanSekolahSlice = (state: {
  statePertanyaanSekolah: StatePertanyaanSekolahType
}) => state.statePertanyaanSekolah

export default statePertanyaanSekolahSlice.reducer
