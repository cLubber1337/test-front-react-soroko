import s from './ui-hamburger-menu.module.scss'
import clsx from 'clsx'

type UiHamburgerMenuProps = {
  isActive: boolean
  setIsActive: (active: boolean) => void
  className?: string
}

export const UiHamburgerMenu = ({ isActive, setIsActive, className }: UiHamburgerMenuProps) => {
  return (
    <button
      className={clsx(s.menuBtn, isActive && s.active, className)}
      aria-label="Open menu"
      type="button"
      onClick={() => setIsActive(!isActive)}
    >
      <span className={s.bar}></span>
      <span className={s.bar}></span>
      <span className={s.bar}></span>
    </button>
  )
}
