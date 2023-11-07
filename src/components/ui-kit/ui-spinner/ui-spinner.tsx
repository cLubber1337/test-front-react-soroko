import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import s from './ui-spinner.module.scss'

interface UiSpinnerProps {
  className?: string
  size?: number
}

export const UiSpinner = ({ className, size = 40 }: UiSpinnerProps) => {
  return (
    <FontAwesomeIcon
      style={{ width: size, height: size }}
      className={clsx(s.spinner, 'spinner', className)}
      icon={faSpinner}
    />
  )
}
