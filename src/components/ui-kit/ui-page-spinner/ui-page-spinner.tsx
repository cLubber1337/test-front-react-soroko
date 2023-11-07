import clsx from 'clsx'
import s from './ui-page-spinner.module.scss'
import { faBahai } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type UiPageSpinnerProps = {
  size?: number
  className?: string
}
export const UiPageSpinner = ({ size = 80, className }: UiPageSpinnerProps) => {
  return (
    <div className={clsx(s.pageSpinner, className)}>
      <FontAwesomeIcon
        style={{ width: size, height: size }}
        className={'spinner'}
        icon={faBahai}
        color={'#a78bfa'}
      />
    </div>
  )
}
