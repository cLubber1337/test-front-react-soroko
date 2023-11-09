import { faListCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AddNewTask } from '@/components/add-new-task/add-new-task.tsx'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/routes.ts'
import { UiHamburgerMenu } from '@/components/ui-kit/ui-hamburger-menu/ui-hamburger-menu.tsx'
import { useEffect, useState } from 'react'
import { UiDropdownSideMenu } from '@/components/ui-kit/ui-dropdown-side-menu/ui-dropdown-side-menu.tsx'
import s from './header.module.scss'

export const Header = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(false)

  useEffect(() => {
    if (isActiveMenu) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }, [isActiveMenu])

  return (
    <header className={s.header}>
      <div className={'container'}>
        <div className={s.content}>
          <Link to={ROUTES.HOME}>
            <div className={s.logo}>
              <FontAwesomeIcon className={s.logoIcon} icon={faListCheck} />{' '}
              <h1 className={s.logoTitle}>tasks</h1>
            </div>
          </Link>
          <div className={s.hamburger}>
            <UiHamburgerMenu isActive={isActiveMenu} setIsActive={setIsActiveMenu} />
          </div>
          <UiDropdownSideMenu isOpen={isActiveMenu} />
          <div className={s.addNewTask}>
            <AddNewTask />
          </div>
        </div>
      </div>
    </header>
  )
}
