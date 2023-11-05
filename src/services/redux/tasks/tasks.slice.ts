import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Priority, Task } from '@/services/api/types.ts'
import { taskApi } from '@/services/api/task-api.ts'
import { createAppAsyncThunk } from '../createAppAsyncThunk.ts'
import { AxiosError } from 'axios'

export type TasksState = {
  tasks: Task[]
  loading: boolean
  error: { title: string; message: string } | null
  priority: Priority | 'all'
}
const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  priority: 'all',
}

const fetchAllTasks = createAppAsyncThunk<Task[]>('tasks/fetchTasks', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const res = await taskApi.getAllTasks()
    return res.reduceRight((acc: Task[], item) => [...acc, ...item.data.items], [])
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error)
    }
    throw error
  }
})

const createTask = createAppAsyncThunk<Task[], { title: string; priority: Priority }>(
  'tasks/createTask',
  async ({ title, priority }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI
    try {
      dispatch(setPriority(priority))
      const { data } = await taskApi.createTask(priority, title)
      return data.items
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error)
      }
      throw error
    }
  }
)

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setPriority: (state, action: PayloadAction<Priority | 'all'>) => {
      state.priority = action.payload
    },
    getTasksByPriority: (state, action: PayloadAction<Priority | 'all'>) => {
      state.tasks = state.tasks.filter(task => task._data_type === action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.tasks = action.payload
        state.loading = false
      })
      .addCase(fetchAllTasks.pending, state => {
        state.loading = true
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.loading = false
        if (action.payload) {
          state.error = {
            title: (action.payload.response?.data as { error: string }).error,
            message: 'Failed to fetch tasks',
          }
        }
      })
    builder
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload[0])
        state.loading = false
      })
      .addCase(createTask.pending, state => {
        state.loading = true
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false
        if (action.payload) {
          state.error = {
            title: (action.payload.response?.data as { error: string }).error,
            message: 'Failed to create task',
          }
        }
      })
  },
})

export const { setPriority, getTasksByPriority } = tasksSlice.actions
export const tasksThunks = { fetchAllTasks, createTask }
export default tasksSlice.reducer
