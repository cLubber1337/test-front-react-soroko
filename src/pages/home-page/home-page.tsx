import { TaskCard } from '@/components/task-card/task-card.tsx'

import { useAppDispatch, useAppSelector } from '@/services/redux/hooks.ts'
import { selectAllTasks, selectTasksErrors, setSortBy, tasksThunks } from '@/services/redux/tasks'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { formatDate } from '@/libs/utils.ts'
import { UiSelect } from '@/components/ui-kit/ui-select/ui-select.tsx'
import { sortTasksOptions } from '@/libs/data.ts'
import { SelectOption } from '@/libs/types.ts'
import s from './home-page.module.scss'
import { SkeletonTaskCard } from '@/components/task-card/skeleton-task-card.tsx'

export const HomePage = () => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const tasks = useAppSelector(selectAllTasks)
  const errorMessage = useAppSelector(selectTasksErrors)
  const [sortOptions, setSortOptions] = useState<SelectOption>(sortTasksOptions[0])

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

  function handleSort(value: SelectOption) {
    setSortOptions(value)
    dispatch(setSortBy(value.title))
  }

  return (
    <main className={s.homePage}>
      <div className={s.sorting}>
        <span className={s.selectLabel}>Sort by:</span>
        <UiSelect
          className={s.select}
          options={sortTasksOptions}
          value={sortOptions}
          onChange={handleSort}
        />
      </div>
      {isLoading ? (
        <SkeletonTaskCard count={9} />
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
