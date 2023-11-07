import { PriorityData, SelectOption } from '@/libs/types.ts'

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

export const sortTasksOptions: SelectOption[] = [
  {
    value: 1,
    title: 'created: old to new',
  },
  {
    value: 2,
    title: 'created: new to old',
  },
  {
    value: 3,
    title: 'completed: false to true',
  },
  {
    value: 4,
    title: 'completed: true to false',
  },
]
