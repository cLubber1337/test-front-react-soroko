import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Priority, Task } from '@/services/api/types.ts'
import { tasksThunks } from './tasks.thunks.ts'

export type TasksState = {
  tasks: Task[]
  loading: boolean
  error: { title: string; message: string } | null
  priority: Priority | 'all'
  task: Task | null
}
const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  priority: 'all',
  task: null,
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setPriority: (state, action: PayloadAction<Priority | 'all'>) => {
      state.priority = action.payload
    },
    clearTask: state => {
      state.task = null
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
      .addCase(tasksThunks.updateCompletedStatus.fulfilled, (state, action) => {
        state.tasks = state.tasks.map(task => {
          if (task._uuid === action.payload._uuid) {
            return action.payload
          }
          return task
        })
      })
      .addCase(tasksThunks.updateTitle.fulfilled, (state, action) => {
        state.tasks = state.tasks.map(task => {
          if (task._uuid === action.payload._uuid) {
            return action.payload
          }
          return task
        })
      })
      .addCase(tasksThunks.fetchTask.fulfilled, (state, action) => {
        state.task = action.payload
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

export const { setPriority, clearTask } = tasksSlice.actions

export default tasksSlice.reducer
