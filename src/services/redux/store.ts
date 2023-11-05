import { configureStore } from '@reduxjs/toolkit'
import { tasksSlice } from '@/services/redux/tasks'

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
  },
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
