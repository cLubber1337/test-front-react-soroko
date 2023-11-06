import { createAppAsyncThunk } from '@/services/redux/createAppAsyncThunk.ts'
import { Priority, Task } from '@/services/api/types.ts'
import { taskApi } from '@/services/api/task-api.ts'
import { AxiosError } from 'axios'
import { setPriority } from './tasks.slice.ts'

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
const deleteTask = createAppAsyncThunk<Task, { id: string; priority: Priority }>(
  'tasks/deleteTask',
  async ({ id, priority }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await taskApi.deleteTask(priority, id)
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error)
      }
      throw error
    }
  }
)

const updateCompletedStatus = createAppAsyncThunk<
  Task,
  { id: string; priority: Priority; completed: boolean }
>('tasks/updateTask', async ({ id, priority, completed }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const { data } = await taskApi.updateCompletedStatus(priority, id, completed)
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error)
    }
    throw error
  }
})

const updateTitle = createAppAsyncThunk<Task, { id: string; priority: Priority; title: string }>(
  'tasks/updateTitle',
  async ({ id, priority, title }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await taskApi.updateTitle(priority, id, title)
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error)
      }
      throw error
    }
  }
)

export const tasksThunks = {
  fetchAllTasks,
  createTask,
  deleteTask,
  updateCompletedStatus,
  updateTitle,
}
