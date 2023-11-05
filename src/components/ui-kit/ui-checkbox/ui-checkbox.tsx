import { ButtonHTMLAttributes, forwardRef } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import s from './ui-checkbox.module.scss'

type UiCheckboxProps = {
  checked?: boolean
  className?: string
  onCheckedChange: (checked: boolean) => void
  label?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const UiCheckbox = forwardRef<HTMLButtonElement, UiCheckboxProps>(
  ({ label, disabled, checked, onCheckedChange, className, ...rest }, ref) => {
    return (
      <form className={className}>
        <div className={s.checkbox}>
          <Checkbox.Root
            ref={ref}
            checked={checked}
            className={s.root}
            defaultChecked
            id={rest.id}
            onCheckedChange={(checked: boolean) => onCheckedChange(checked)}
            {...rest}
            disabled={disabled}
          >
            {checked && <FontAwesomeIcon icon={faSquareCheck} className={s.icon} />}
            {!checked && <FontAwesomeIcon icon={faSquare} className={s.icon} />}
          </Checkbox.Root>

          <label className={s.label} htmlFor={rest.id}>
            {label}
          </label>
        </div>
      </form>
    )
  }
)
