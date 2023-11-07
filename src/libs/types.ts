import { Priority } from '@/services/api/types.ts'

export type SelectOption = {
  value: number
  title: string
}
export type PriorityData = {
  id: string
  priority: Priority
  color: string
}
