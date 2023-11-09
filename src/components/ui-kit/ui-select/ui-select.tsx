import { memo, useCallback, useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import { SelectOption } from '@/libs/types.ts'
import { faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import s from './ui-select.module.scss'

interface UiSelectProps {
  value: SelectOption
  onChange: (value: SelectOption) => void
  options: SelectOption[]
  className?: string
}

export const UiSelect = memo(({ value, onChange, options, className }: UiSelectProps) => {
  const selectRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const toggleOpen = () => {
    setIsOpen(prev => !prev)
  }
  const selectOption = useCallback(
    (option: SelectOption) => {
      if (option !== value) onChange(option)
    },
    [value, onChange]
  )

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != selectRef.current) return
      switch (e.code) {
        case 'Enter':
        case 'Space':
          setIsOpen(prev => !prev)
          if (isOpen) selectOption(options[highlightedIndex])
          break
        case 'ArrowUp':
        case 'ArrowDown': {
          e.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            break
          }

          const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1)

          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue)
          }
          break
        }
        case 'Escape':
          setIsOpen(false)
          break
      }
    }

    selectRef.current?.addEventListener('keydown', handler)

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      selectRef.current?.removeEventListener('keydown', handler)
    }
  }, [isOpen, highlightedIndex, options, selectOption])

  return (
    <div
      ref={selectRef}
      className={clsx(s.select, isOpen && s.borderBottom, className)}
      onClick={toggleOpen}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
    >
      {value.title}{' '}
      <FontAwesomeIcon icon={faAngleDown} className={clsx(s.icon, isOpen && s.iconRotate)} />
      <ul className={clsx(s.options, isOpen && s.show)}>
        {options.map((option, index) => (
          <li
            key={option.value}
            className={clsx(s.option, index === highlightedIndex && s.highlighted)}
            onMouseDown={e => {
              e.stopPropagation()
              selectOption(option)
              setIsOpen(false)
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
          >
            {option.title}{' '}
            {index + 1 === value.value && (
              <FontAwesomeIcon icon={faCheck} className={s.checkIcon} />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
})
