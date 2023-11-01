import s from './header.module.scss'
import { faListCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={'container'}>
        <div className={s.content}>
          <div className={s.logo}>
            <FontAwesomeIcon className={s.logoIcon} icon={faListCheck} />{' '}
            <h1 className={s.logoTitle}>todo</h1>
          </div>
          <div className={s.actions}>
            <button className={s.addTaskBtn}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
