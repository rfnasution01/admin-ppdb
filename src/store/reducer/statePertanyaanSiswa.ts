import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StatePertanyaanSiswaType = {
  detail: string | null
}

const initialState: StatePertanyaanSiswaType = {
  detail: null,
}

const statePertanyaanSiswaSlice = createSlice({
  name: 'pertanyaanSiswa',
  initialState,
  reducers: {
    setStatePertanyaanSiswa: (
      state,
      action: PayloadAction<StatePertanyaanSiswaType>,
    ) => {
      const { detail } = action.payload
      state.detail = detail
    },
  },
})

export const { setStatePertanyaanSiswa } = statePertanyaanSiswaSlice.actions

export const getPertanyaanSiswaSlice = (state: {
  statePertanyaanSiswa: StatePertanyaanSiswaType
}) => state.statePertanyaanSiswa

export default statePertanyaanSiswaSlice.reducer
