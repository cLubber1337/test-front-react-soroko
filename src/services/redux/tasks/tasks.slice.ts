import { createSlice } from '@reduxjs/toolkit'
import { Task } from '@/services/api/types.ts'
import { taskApi } from '@/services/api/task-api.ts'
import { createAppAsyncThunk } from '../createAppAsyncThunk.ts'
import { AxiosError } from 'axios'

export type TasksState = {
  tasks: Task[]
  loading: boolean
  error: { title: string; message: string } | null
}
const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
}

const fetchTasks = createAppAsyncThunk<Task[], void>('tasks/fetchTasks', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const { data } = await taskApi.getAllTasks()
    return data.items
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error)
    }
    throw error
  }
})

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload
      state.loading = false
    })
    builder.addCase(fetchTasks.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = {
          title: (action.payload.response?.data as { error: string }).error,
          message: 'Failed to fetch tasks',
        }
      }
    })
  },
})

export const tasksThunks = { fetchTasks }
export default tasksSlice.reducer
