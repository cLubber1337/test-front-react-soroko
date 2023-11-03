import clsx from 'clsx'
import { UiCard, UiCheckbox, UiPopover } from '@/components/ui-kit'
import { faCircle, faCircleCheck, faEllipsis } from '@fortawesome/free-solid-svg-icons'
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
  createdAt?: number
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
      <div className={clsx(s.content, isDone && s.contentDone)}>{children}</div>
      <div className={s.footer}>
        {isDone ? (
          <FontAwesomeIcon icon={faCircleCheck} className={s.iconDone} />
        ) : (
          <FontAwesomeIcon icon={faCircle} style={{ color: 'white' }} className={s.iconDone} />
        )}
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
