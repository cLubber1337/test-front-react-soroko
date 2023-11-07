import { Task } from '@/services/api/types.ts'

export function formatDate(timestamp: number | undefined): string {
  const date = new Date(timestamp! * 1000)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`
}

export const sortingProducts = (tasks: Task[], sortBy: string = 'created: old to new'): Task[] => {
  if (sortBy === 'created: old to new') {
    return tasks.sort((a, b) => a._created - b._created)
  }
  if (sortBy === 'created: new to old') {
    return tasks.sort((a, b) => b._created - a._created)
  }
  if (sortBy === 'completed: false to true') {
    return tasks.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1))
  }
  if (sortBy === 'completed: true to false') {
    return tasks.sort((a, b) => (a.completed === b.completed ? 0 : b.completed ? 1 : -1))
  }

  return tasks
}
