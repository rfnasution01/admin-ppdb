import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateIdGelombangType = {
  id: string | null
}

const initialState: StateIdGelombangType = {
  id: null,
}

const stateIdGelombangSlice = createSlice({
  name: 'idGelombang',
  initialState,
  reducers: {
    setStateIdGelombang: (
      state,
      action: PayloadAction<StateIdGelombangType>,
    ) => {
      const { id } = action.payload
      state.id = id
    },
  },
})

export const { setStateIdGelombang } = stateIdGelombangSlice.actions

export const getIdGelombangSlice = (state: {
  stateIdGelombang: StateIdGelombangType
}) => state.stateIdGelombang

export default stateIdGelombangSlice.reducer
