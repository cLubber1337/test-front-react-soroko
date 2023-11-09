import { TaskCard } from '@/components/task-card/task-card.tsx'
import { useAppDispatch, useAppSelector } from '@/services/redux/hooks.ts'
import { selectAllTasks, selectTasksErrors, tasksThunks } from '@/services/redux/tasks'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { formatDate } from '@/libs/utils.ts'
import { SkeletonTasks } from '@/components/task-card/skeleton-tasks.tsx'
import { SortTasksSelect } from '@/components/sort-tasks-select/sort-tasks-select.tsx'
import s from './home-page.module.scss'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const tasks = useAppSelector(selectAllTasks)
  const errorMessage = useAppSelector(selectTasksErrors)

  useEffect(() => {
    setIsLoading(true)
    dispatch(tasksThunks.fetchAllTasks())
      .unwrap()
      .then(() => {
        setIsLoading(false)
      })
  }, [dispatch])

  useEffect(() => {
    if (errorMessage) {
      toast.error(`${errorMessage.title}: ${errorMessage.message}`)
    }
  }, [errorMessage])

  return (
    <main className={s.homePage}>
      <div className={s.sorting}>
        <SortTasksSelect />
      </div>
      {isLoading ? (
        <SkeletonTasks count={12} />
      ) : (
        <ul className={s.tasksList}>
          {tasks.map(task => (
            <li className={s.tasksItem} key={task._uuid}>
              <TaskCard
                isDone={task.completed}
                id={task._uuid}
                createdAt={formatDate(task._created)}
                priority={task._data_type}
                title={task.title}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
export default HomePage
