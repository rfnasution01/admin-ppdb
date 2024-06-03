import { configureStore } from '@reduxjs/toolkit'

import { api } from './api'
import stateSearch from './reducer/stateSearch.ts'
import stateBiodata from './reducer/stateBiodata.ts'
import statePertanyaanSiswa from './reducer/statePertanyaanSiswa.ts'
import statePertanyaanSekolah from './reducer/statePertanyaanSekolah.ts'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    stateSearch: stateSearch,
    stateBiodata: stateBiodata,
    statePertanyaanSiswa: statePertanyaanSiswa,
    statePertanyaanSekolah: statePertanyaanSekolah,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
