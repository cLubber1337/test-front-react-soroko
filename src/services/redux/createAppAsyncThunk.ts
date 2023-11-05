import { AppDispatch, RootState } from '@/services/redux/store.ts'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>()

type ThunkApiConfig = {
  state: RootState
  dispatch: AppDispatch
  rejectValue: AxiosError
}
