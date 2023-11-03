import s from './header.module.scss'
import { faListCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AddNewTask } from '@/components/add-new-task/add-new-task.tsx'

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={'container'}>
        <div className={s.content}>
          <div className={s.logo}>
            <FontAwesomeIcon className={s.logoIcon} icon={faListCheck} />{' '}
            <h1 className={s.logoTitle}>todo</h1>
          </div>
          <AddNewTask />
        </div>
      </div>
    </header>
  )
}
