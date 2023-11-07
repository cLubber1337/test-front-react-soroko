import { TaskCard } from '@/components/task-card/task-card.tsx'

import s from './home-page.module.scss'
import { useAppDispatch, useAppSelector } from '@/services/redux/hooks.ts'
import {
  selectAllTasks,
  selectTasksErrors,
  selectTasksLoading,
  selectTasksPriority,
  tasksThunks,
} from '@/services/redux/tasks'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { formatDate } from '@/libs/utils.ts'

export const HomePage = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectAllTasks)
  const errorMessage = useAppSelector(selectTasksErrors)
  const isLoading = useAppSelector(selectTasksLoading)
  const activePriority = useAppSelector(selectTasksPriority)

  useEffect(() => {
    dispatch(tasksThunks.fetchAllTasks())
  }, [dispatch])

  useEffect(() => {
    if (errorMessage) {
      toast.error(`${errorMessage.title}: ${errorMessage.message}`)
    }
  }, [errorMessage])

  const tasksByPriority = tasks.filter(task =>
    activePriority === 'all' ? task : task._data_type === activePriority
  )

  return (
    <main className={s.homePage}>
      <div className={s.taskList}>
        {tasksByPriority.map(task => (
          <TaskCard
            key={task._uuid}
            isDone={task.completed}
            id={task._uuid}
            createdAt={formatDate(task._created)}
            priority={task._data_type}
            title={task.title}
          />
        ))}
      </div>
    </main>
  )
}
