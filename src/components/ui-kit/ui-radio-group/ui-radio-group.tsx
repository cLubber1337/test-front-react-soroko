import s from './ui-radio-group.module.scss'

import clsx from 'clsx'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { faCircle, faCircleDot } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Priority } from '@/services/api/types.ts'
import type { PriorityData } from '@/libs/types.ts'

interface UiRadioGroupProps {
  disabled?: boolean
  items: PriorityData[]
  className?: string
  label?: string
  value: Priority
  onChangeValue: (value: Priority) => void
}

export const UiRadioGroup = ({
  disabled,
  items,
  className,
  label,
  onChangeValue,
  value,
}: UiRadioGroupProps) => {
  return (
    <form className={s.form}>
      {label && <h4 className={s.label}>{label}</h4>}
      <RadioGroup.Root
        className={clsx(s.radioGroup, className)}
        defaultValue={value}
        aria-label="View density"
        disabled={disabled}
        onValueChange={(value: Priority) => onChangeValue(value)}
      >
        {items.map(({ id, priority, color }) => (
          <div key={id} className={s.item}>
            <RadioGroup.Item
              className={clsx(s.radio, disabled && s.disabled)}
              value={priority}
              id={id}
            >
              {priority === value ? (
                <FontAwesomeIcon className={s.indicator} icon={faCircleDot} />
              ) : (
                <FontAwesomeIcon className={s.indicator} icon={faCircle} />
              )}
            </RadioGroup.Item>
            <label htmlFor={id} className={clsx(s.title, disabled && s.disabled)}>
              <div style={{ backgroundColor: color }} className={s.priority}>
                {priority}
              </div>
            </label>
          </div>
        ))}
      </RadioGroup.Root>
    </form>
  )
}
