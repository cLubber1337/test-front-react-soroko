import clsx from 'clsx'
import { ReactNode } from 'react'

import s from './ui-card.module.scss'

type UiCardProps = {
  className?: string
  children?: ReactNode
}

export const UiCard = ({ className = '', children }: UiCardProps) => {
  return <div className={clsx(s.card, className)}>{children}</div>
}
