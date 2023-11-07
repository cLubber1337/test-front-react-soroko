import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Priority, Task } from '@/services/api/types.ts'
import { tasksThunks } from './tasks.thunks.ts'
import { sortingProducts } from '@/libs/utils.ts'

export type TasksState = {
  tasks: Task[]
  sortedTasks: Task[]
  loading: boolean
  error: { title: string; message: string } | null
  priority: Priority | 'all'
  task: Task | null
  sortBy: string
}
const initialState: TasksState = {
  tasks: [],
  sortedTasks: [],
  sortBy: 'created: old to new',
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
      const newTasks = sortingProducts([...state.sortedTasks], state.sortBy)
      state.tasks = newTasks.filter(task =>
        action.payload === 'all' ? task : task._data_type === action.payload
      )
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload
      state.tasks = sortingProducts(state.tasks, action.payload)
    },
    clearTask: state => {
      state.task = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(tasksThunks.fetchAllTasks.fulfilled, (state, action) => {
        state.tasks = sortingProducts(action.payload, state.sortBy)
        state.sortedTasks = action.payload
      })
      .addCase(tasksThunks.createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload[0])
        state.sortedTasks.unshift(action.payload[0])
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

export const { setPriority, clearTask, setSortBy } = tasksSlice.actions

export default tasksSlice.reducer
