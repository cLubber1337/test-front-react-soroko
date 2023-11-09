import clsx from 'clsx'
import { SidebarMenu } from '@/components/sidebar-menu/sidebar-menu.tsx'
import { AddNewTask } from '@/components/add-new-task/add-new-task.tsx'
import s from './ui-dropdown-side-menu.module.scss'
import { SortTasksSelect } from '@/components/sort-tasks-select/sort-tasks-select.tsx'
interface UiDropdownSideMenuProps {
  isOpen: boolean
  closeMenu: () => void
}

export const UiDropdownSideMenu = ({ isOpen, closeMenu }: UiDropdownSideMenuProps) => {
  return (
    <>
      {isOpen && <div className={clsx(s.overlay)} onClick={closeMenu} />}
      <nav className={clsx(s.dropdownSideMenu, isOpen && s.isOpen)}>
        <div className={s.addNewTask}>
          <AddNewTask />
        </div>
        <SidebarMenu className={s.sidebarMenu} isDropdown />
        <SortTasksSelect className={s.sortTasksSelect} />
      </nav>
    </>
  )
}
