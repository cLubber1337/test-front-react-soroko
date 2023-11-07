import s from './header.module.scss'
import { faListCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AddNewTask } from '@/components/add-new-task/add-new-task.tsx'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/routes.ts'

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={'container'}>
        <div className={s.content}>
          <Link to={ROUTES.HOME}>
            <div className={s.logo}>
              <FontAwesomeIcon className={s.logoIcon} icon={faListCheck} />{' '}
              <h1 className={s.logoTitle}>todo</h1>
            </div>
          </Link>

          <AddNewTask />
        </div>
      </div>
    </header>
  )
}
