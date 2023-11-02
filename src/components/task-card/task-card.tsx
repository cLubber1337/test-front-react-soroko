import clsx from 'clsx'
import { UiCard, UiCheckbox, UiPopover } from '@/components/ui-kit'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactNode } from 'react'

import s from './task-card.module.scss'
import { TaskCardMenu } from '../task-card-menu/task-card-menu.tsx'

interface TaskCardProps {
  className?: string
  children?: ReactNode
  isDone?: boolean
  setIsDone?: (isDone: boolean) => void
  id?: string
  createdAt?: string
}

export const TaskCard = ({
  className,
  isDone,
  setIsDone,
  children,
  createdAt,
  id,
}: TaskCardProps) => {
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
      <div className={s.content}>{children}</div>
      <UiCheckbox onCheckedChange={setIsDone} checked={isDone} label={'Complete the task'} />
    </UiCard>
  )
}
