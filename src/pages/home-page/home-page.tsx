import { TaskCard } from '@/components/task-card/task-card.tsx'

import s from './home-page.module.scss'
import { useAppDispatch, useAppSelector } from '@/services/redux/hooks.ts'
import { selectAllTasks, tasksThunks } from '@/services/redux/tasks'
import { useEffect } from 'react'
import { selectTasksErrors, selectTasksLoading } from '@/services/redux/tasks/task.selector.ts'

export const HomePage = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectAllTasks)
  const errorMessage = useAppSelector(selectTasksErrors)
  const loading = useAppSelector(selectTasksLoading)

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks())
  }, [dispatch])

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
          tasks.map(task => (
            <TaskCard
              key={task._uuid}
              isDone={task.completed}
              setIsDone={(isDone: boolean) => {
                console.log(isDone)
              }}
              id={task._uuid}
              createdAt={task._created}
            >
              {task.title}
            </TaskCard>
          ))
        )}
      </div>
    </main>
  )
}
