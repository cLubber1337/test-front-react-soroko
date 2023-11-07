import { TaskCard } from '@/components/task-card/task-card.tsx'

import { useAppDispatch, useAppSelector } from '@/services/redux/hooks.ts'
import {
  selectAllTasks,
  selectSortOption,
  selectTasksErrors,
  setSortOption,
  tasksThunks,
} from '@/services/redux/tasks'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { formatDate } from '@/libs/utils.ts'
import { UiSelect } from '@/components/ui-kit/ui-select/ui-select.tsx'
import { sortTasksOptions } from '@/libs/data.ts'
import { SelectOption } from '@/libs/types.ts'
import s from './home-page.module.scss'
import { SkeletonTasks } from '@/components/task-card/skeleton-tasks.tsx'

export const HomePage = () => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const tasks = useAppSelector(selectAllTasks)
  const errorMessage = useAppSelector(selectTasksErrors)
  const sortOption = useAppSelector(selectSortOption)
  const [sortOptions, setSortOptions] = useState<SelectOption>(sortOption)

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

  const handleSort = useCallback(
    (value: SelectOption) => {
      setSortOptions(value)
      dispatch(setSortOption(value))
    },
    [dispatch]
  )

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
        <SkeletonTasks count={9} />
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
