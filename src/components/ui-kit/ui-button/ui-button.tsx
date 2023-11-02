import s from './ui-button.module.scss'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementType } from 'react'

export type UiButtonProps<T extends ElementType = 'button'> = {
  as?: T
  variant?: 'contained' | 'outlined' | 'unstyled'
  className?: string
} & ComponentPropsWithoutRef<T>

export const UiButton = <T extends ElementType = 'button'>(
  props: UiButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof UiButtonProps<T>>
) => {
  const { variant = 'contained', className, as: Component = 'button', ...rest } = props
  return <Component className={clsx(s.button, s[variant], className)} {...rest} />
}
