import { Priority } from '@/services/api/types.ts'

export const priorityData: PriorityData[] = [
  {
    id: '1',
    priority: 'low',
    color: '#16a34a',
  },
  {
    id: '2',
    priority: 'medium',
    color: '#f97316',
  },
  {
    id: '3',
    priority: 'high',
    color: '#b91c1c',
  },
]

export type PrioritySidebar = PriorityData | { id: string; priority: 'all'; color: string }

export const priorityDataSidebar: PrioritySidebar[] = [
  { id: '4', priority: 'all', color: '#9ca3af' },
  ...priorityData,
]

export type PriorityData = {
  id: string
  priority: Priority
  color: string
}
