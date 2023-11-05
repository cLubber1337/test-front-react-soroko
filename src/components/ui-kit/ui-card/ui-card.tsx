import clsx from 'clsx'
import { CSSProperties, ReactNode } from 'react'

import s from './ui-card.module.scss'

type UiCardProps = {
  className?: string
  children?: ReactNode
  styles?: CSSProperties
}

export const UiCard = ({ className = '', children, ...styles }: UiCardProps) => {
  return (
    <div className={clsx(s.card, className)} {...styles}>
      {children}
    </div>
  )
}
