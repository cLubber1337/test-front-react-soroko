import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Priority, Task } from '@/services/api/types.ts'
import { tasksThunks } from './tasks.thunks.ts'

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

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setPriority: (state, action: PayloadAction<Priority | 'all'>) => {
      state.priority = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(tasksThunks.fetchAllTasks.fulfilled, (state, action) => {
        state.tasks = action.payload
      })
      .addCase(tasksThunks.createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload[0])
      })
      .addCase(tasksThunks.deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._uuid !== action.payload._uuid)
      })
      .addCase(tasksThunks.updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map(task => {
          if (task._uuid === action.payload._uuid) {
            return action.payload
          }
          return task
        })
      })
    builder
      .addMatcher(
        action => {
          return action.type.endsWith('/pending')
        },
        state => {
          state.loading = true
        }
      )
      .addMatcher(
        action => {
          return action.type.endsWith('/rejected')
        },
        (state, action) => {
          state.loading = false
          if (action.payload) {
            state.error = {
              title: 'Failed',
              message: (action.payload.response?.data as { error: string }).error,
            }
          }
        }
      )
      .addMatcher(
        action => {
          return action.type.endsWith('/fulfilled')
        },
        state => {
          state.loading = false
        }
      )
  },
})

export const { setPriority } = tasksSlice.actions

export default tasksSlice.reducer
