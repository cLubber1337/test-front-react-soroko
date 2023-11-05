import clsx from 'clsx'
import { UiCard, UiCheckbox, UiPopover } from '@/components/ui-kit'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo, ReactNode, useCallback } from 'react'

import s from './task-card.module.scss'
import { TaskCardMenu } from '../task-card-menu/task-card-menu.tsx'
import { Priority } from '@/services/api/types.ts'
import { priorityData } from '@/libs/data.ts'
import { useAppDispatch } from '@/services/redux/hooks.ts'
import { tasksThunks } from '@/services/redux/tasks'

interface TaskCardProps {
  className?: string
  children?: ReactNode
  isDone?: boolean
  id: string
  createdAt?: string
  priority: Priority
  isLoading?: boolean
}

export const TaskCard = memo(
  ({ className, isDone, children, createdAt, id, priority, isLoading }: TaskCardProps) => {
    const dispatch = useAppDispatch()
    const colorPriority = priorityData.find(data => data.priority === priority)?.color || 'white'

    const updateCompletedStatus = useCallback(
      (completed: boolean) => {
        dispatch(tasksThunks.updateTask({ priority, id, completed }))
      },
      [dispatch, id, priority]
    )
    const deleteTask = useCallback(() => {
      dispatch(tasksThunks.deleteTask({ priority, id }))
    }, [dispatch, id, priority])

    return (
      <UiCard className={clsx(s.card, className)}>
        <div className={s.header}>
          <h3 className={s.createdAt}>Created at {createdAt}</h3>
          <UiPopover
            trigger={
              <button className={s.actions}>
                <FontAwesomeIcon icon={faEllipsis} />
              </button>
            }
            content={<TaskCardMenu id={id} deleteTask={deleteTask} />}
          />
        </div>
        <div className={clsx(s.content, isDone && s.contentDone)}>{children}</div>
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
