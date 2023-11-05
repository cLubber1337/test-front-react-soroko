import { instance } from './instance.ts'
import { GetAllTasksResponse, Task } from './types.ts'

export const taskApi = {
  getAllTasks() {
    return instance.get<GetAllTasksResponse>('task')
  },
  createTask(title: string) {
    return instance.post<{ items: Task[] }>('task', [{ title, completed: false }])
  },
}
