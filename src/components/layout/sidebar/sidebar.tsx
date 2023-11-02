import s from './sidebar.module.scss'
import { Button } from '@/components/ui-kit'
import { useState } from 'react'
import { TaskStatus } from '@/libs/types.ts'
import clsx from 'clsx'
import { data } from '@/libs/data.ts'

export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<TaskStatus>('All')

  function handleClickItem(status: TaskStatus) {
    setActiveItem(status)
  }

  return (
    <nav className={s.sidebar}>
      <ul className={s.list}>
        {data.map(({ id, status }) => (
          <li
            key={id}
            className={clsx(s.item, { [s.activeItem]: activeItem === status })}
            onClick={() => handleClickItem(status)}
          >
            <Button variant={activeItem === status ? 'outlined' : 'contained'}>{status}</Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
