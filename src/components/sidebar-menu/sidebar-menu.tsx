import s from './sidebar-menu.module.scss'
import { priorityDataSidebar } from '@/libs/data.ts'
import clsx from 'clsx'
import { UiButton } from '@/components/ui-kit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '@/services/redux/hooks.ts'
import { selectTasksPriority, setPriority } from '@/services/redux/tasks'
import { Priority } from '@/services/api/types.ts'
import { memo } from 'react'

type SidebarMenuProps = {
  className?: string
  isDropdown?: boolean
}

export const SidebarMenu = memo(({ className, isDropdown }: SidebarMenuProps) => {
  const dispatch = useAppDispatch()
  const currentPriority = useAppSelector(selectTasksPriority)

  function handleClickItem(priority: Priority | 'all') {
    dispatch(setPriority(priority))
  }

  return (
    <ul className={clsx(s.list, className)}>
      {priorityDataSidebar.map(({ priority, id, color }) => (
        <li
          key={id}
          style={{ borderColor: color }}
          className={clsx(
            s.item,
            currentPriority === priority && s.activeItem,
            isDropdown && currentPriority === priority && s.dropdown
          )}
          onClick={() => handleClickItem(priority)}
        >
          <UiButton
            className={clsx(isDropdown && s.button)}
            variant={currentPriority === priority ? 'outlined' : 'contained'}
          >
            {priority[0].toUpperCase() + priority.slice(1)}
            <FontAwesomeIcon icon={faCircle} color={color} />
          </UiButton>
        </li>
      ))}
    </ul>
  )
})
