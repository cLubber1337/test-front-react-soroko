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

export const HomePage = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectAllTasks)
  const errorMessage = useAppSelector(selectTasksErrors)
  const loading = useAppSelector(selectTasksLoading)
  const activePriority = useAppSelector(selectTasksPriority)

  useEffect(() => {
    dispatch(tasksThunks.fetchAllTasks())
  }, [dispatch])

  const tasksByPriority = tasks.filter(task =>
    activePriority === 'all' ? task : task._data_type === activePriority
  )

  return (
    <main className={s.homePage}>
      {errorMessage && (
        <div>
          <h1>{errorMessage.title}</h1>
          <p>{errorMessage.message}</p>
        </div>
      )}
      <div className={s.taskList}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          tasksByPriority.map(task => (
            <TaskCard
              key={task._uuid}
              isDone={task.completed}
              setIsDone={(isDone: boolean) => {
                console.log(isDone)
              }}
              id={task._uuid}
              createdAt={task._created}
              priority={task._data_type}
            >
              {task.title}
            </TaskCard>
          ))
        )}
      </div>
    </main>
  )
}
