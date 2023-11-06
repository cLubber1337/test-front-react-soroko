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
  deleteTask(priority: Priority, id: string) {
    return instance.delete(`${priority}/${id}`)
  },
  updateCompletedStatus(priority: Priority, id: string, completed: boolean) {
    return instance.put(`${priority}/${id}`, { completed })
  },
  updateTitle(priority: Priority, id: string, title: string) {
    return instance.put(`${priority}/${id}`, { title })
  },
}
