import { instance } from './instance.ts'
import { GetAllTasksResponse } from '@/services/api/types.ts'

export const taskApi = {
  getTodoLists() {
    return instance.get<GetAllTasksResponse>('task')
  },
}
