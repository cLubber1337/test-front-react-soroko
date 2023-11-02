import s from './ui-card.module.scss'
import clsx from 'clsx'
import { ReactNode } from 'react'

type UiCardProps = {
  className?: string
  children?: ReactNode
}

export const UiCard = ({ className = '', children }: UiCardProps) => {
  return <div className={clsx(s.card, className)}>{children}</div>
}
