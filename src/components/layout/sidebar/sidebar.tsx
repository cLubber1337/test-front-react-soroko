import s from './sidebar.module.scss'
import { UiButton } from '@/components/ui-kit'
import clsx from 'clsx'
import { priorityDataSidebar } from '@/libs/data.ts'
import { Priority } from '@/services/api/types.ts'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from '@/services/redux/hooks.ts'
import { selectTasksPriority, setPriority } from '@/services/redux/tasks'

export const Sidebar = () => {
  const dispatch = useAppDispatch()
  const currentPriority = useAppSelector(selectTasksPriority)

  function handleClickItem(priority: Priority | 'all') {
    dispatch(setPriority(priority))
  }

  return (
    <nav className={s.sidebar}>
      <ul className={s.list}>
        {priorityDataSidebar.map(({ priority, id, color }) => (
          <li
            key={id}
            style={{ borderColor: color }}
            className={clsx(s.item, { [s.activeItem]: currentPriority === priority })}
            onClick={() => handleClickItem(priority)}
          >
            <UiButton variant={currentPriority === priority ? 'outlined' : 'contained'}>
              {priority[0].toUpperCase() + priority.slice(1)}
              <FontAwesomeIcon icon={faCircle} color={color} />
            </UiButton>
          </li>
        ))}
      </ul>
    </nav>
  )
}
