import clsx from 'clsx'
import { UiCard, UiCheckbox, UiPopover } from '@/components/ui-kit'
import { faCircle, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactNode } from 'react'

import s from './task-card.module.scss'
import { TaskCardMenu } from '../task-card-menu/task-card-menu.tsx'
import { Priority } from '@/services/api/types.ts'
import { priorityData } from '@/libs/data.ts'

interface TaskCardProps {
  className?: string
  children?: ReactNode
  isDone?: boolean
  setIsDone?: (isDone: boolean) => void
  id?: string
  createdAt?: number
  priority: Priority
}

export const TaskCard = ({
  className,
  isDone,
  setIsDone,
  children,
  createdAt,
  id,
  priority,
}: TaskCardProps) => {
  const colorPriority = priorityData.find(data => data.priority === priority)?.color || 'white'

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
          content={<TaskCardMenu id={id} />}
        />
      </div>
      <div className={clsx(s.content, isDone && s.contentDone)}>{children}</div>
      <div className={s.footer}>
        <FontAwesomeIcon icon={faCircle} style={{ color: colorPriority }} className={s.iconDone} />

        <UiCheckbox
          className={s.checkbox}
          onCheckedChange={setIsDone}
          checked={isDone}
          label={'Complete the task'}
          id={id}
          name={'isDone'}
        />
      </div>
    </UiCard>
  )
}
