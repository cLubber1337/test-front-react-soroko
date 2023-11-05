import { instance } from './instance.ts'
import { GetAllTasksResponse, Priority, Task } from './types.ts'

export const taskApi = {
  getTasksByPriority(priority: Priority) {
    return instance.get<GetAllTasksResponse>(`${priority}`)
  },
  createTask(priority: Priority, title: string) {
    return instance.post<{ items: Task[] }>(`${priority}`, [{ title, completed: false }])
  },
  getAllTasks() {
    const priorities: Priority[] = ['low', 'medium', 'high']
    const requests = priorities.map(priority => instance.get<GetAllTasksResponse>(priority))
    return Promise.all(requests)
  },
}
