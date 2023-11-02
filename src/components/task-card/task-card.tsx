import s from './task-card.module.scss'
import clsx from 'clsx'
import { Button, UiCard } from '@/components/ui-kit'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactNode } from 'react'

interface TaskCardProps {
  className?: string
  children?: ReactNode
}

export const TaskCard = ({ className, children }: TaskCardProps) => {
  const date = new Date()
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()

  const formattedDate = `${day}.${month}.${year}`
  return (
    <UiCard className={clsx(s.card, className)}>
      <div className={s.header}>
        <h3 className={s.createdAt}>Created at {formattedDate}</h3>
        <Button className={s.actions} variant={'unstyled'}>
          <FontAwesomeIcon icon={faEllipsis} />
        </Button>
      </div>
      <div className={s.content}>{children}</div>
    </UiCard>
  )
}
