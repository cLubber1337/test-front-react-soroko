import clsx from 'clsx'
import { UiCard, UiCheckbox, UiSpinner } from '@/components/ui-kit'
import { memo, useCallback, useState } from 'react'
import { Priority } from '@/services/api/types.ts'
import { priorityData } from '@/libs/data.ts'
import { useAppDispatch } from '@/services/redux/hooks.ts'
import { tasksThunks } from '@/services/redux/tasks'
import s from './task-card.module.scss'
import { TaskCardMenu } from '@/components/task-card-menu/task-card-menu.tsx'

interface TaskCardProps {
  className?: string
  isDone?: boolean
  id: string
  createdAt?: string
  priority: Priority
  title: string
}

export const TaskCard = memo(
  ({ className, isDone, createdAt, id, priority, title }: TaskCardProps) => {
    const dispatch = useAppDispatch()

    const [isLoading, setIsLoading] = useState(false)

    const colorPriority = priorityData.find(data => data.priority === priority)?.color || 'white'

    const updateCompletedStatus = useCallback(
      (completed: boolean) => {
        setIsLoading(true)
        dispatch(tasksThunks.updateCompletedStatus({ priority, id, completed })).then(() => {
          setIsLoading(false)
        })
      },
      [dispatch, id, priority]
    )

    return (
      <UiCard className={clsx(s.card, className, isLoading && s.cardLoading)}>
        {isLoading && <UiSpinner />}
        <div className={s.header}>
          <h3 className={s.createdAt}>Created at {createdAt}</h3>

          <TaskCardMenu
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            priority={priority}
            id={id}
            title={title}
          />
        </div>

        <div className={clsx(s.content, isDone && s.contentDone)}>{title}</div>

        <div className={s.footer}>
          <div className={s.priority} style={{ backgroundColor: colorPriority }}>
            {priority}
          </div>
          <UiCheckbox
            disabled={isLoading}
            className={s.checkbox}
            onCheckedChange={updateCompletedStatus}
            checked={isDone}
            label={'Complete the task'}
            id={id}
            name={'isDone'}
          />
        </div>
      </UiCard>
    )
  }
)
