import { RootState } from '@/services/redux/store.ts'

export const selectAllTasks = (state: RootState) => state.tasks.tasks
export const selectTasksErrors = (state: RootState) => state.tasks.error

export const selectTasksLoading = (state: RootState) => state.tasks.loading

export const selectTasksPriority = (state: RootState) => state.tasks.priority
