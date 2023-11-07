import { TaskCard } from '@/components/task-card/task-card.tsx'

import { useAppDispatch, useAppSelector } from '@/services/redux/hooks.ts'
import {
  selectAllTasks,
  selectTasksErrors,
  selectTasksLoading,
  selectTasksPriority,
  tasksThunks,
} from '@/services/redux/tasks'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { formatDate } from '@/libs/utils.ts'
import { UiSelect } from '@/components/ui-kit/ui-select/ui-select.tsx'
import { sortTasksOptions } from '@/libs/data.ts'
import { SelectOption } from '@/libs/types.ts'
import s from './home-page.module.scss'

export const HomePage = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectAllTasks)
  const errorMessage = useAppSelector(selectTasksErrors)
  const isLoading = useAppSelector(selectTasksLoading)
  const activePriority = useAppSelector(selectTasksPriority)
  const [sortOptions, setSortOptions] = useState<SelectOption>(sortTasksOptions[0])

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
      <div className={s.sorting}>
        <span className={s.selectLabel}>Sort by:</span>
        <UiSelect
          className={s.select}
          options={sortTasksOptions}
          value={sortOptions}
          onChange={setSortOptions}
        />
      </div>
      <ul className={s.tasksList}>
        {tasksByPriority.map(task => (
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
    </main>
  )
}
