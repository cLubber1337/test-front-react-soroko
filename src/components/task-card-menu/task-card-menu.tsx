import s from './task-card-menu.module.scss'
import { faCircleInfo, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UiButton } from '@/components/ui-kit'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/routes.ts'
import { memo } from 'react'
import { Priority } from '@/services/api/types.ts'

type TaskCardMenuProps = {
  id: string
  deleteTask: () => void
  setOpenPopover: (isOpen: boolean) => void
  priority: Priority
}

export const TaskCardMenu = memo(
  ({ id, deleteTask, setOpenPopover, priority }: TaskCardMenuProps) => {
    return (
      <div className={s.taskCardMenu}>
        <h3 className={s.title}>Task menu</h3>
        <div className={s.content}>
          <UiButton
            as={Link}
            to={`${ROUTES.TASK_INFO}/${priority}/${id}`}
            variant={'unstyled'}
            className={s.item}
          >
            <FontAwesomeIcon icon={faCircleInfo} />
            Information
          </UiButton>
          <UiButton variant={'unstyled'} className={s.item} onClick={() => setOpenPopover(true)}>
            <FontAwesomeIcon icon={faPenToSquare} />
            Edit
          </UiButton>
          <UiButton variant={'unstyled'} onClick={deleteTask} className={s.item}>
            <FontAwesomeIcon icon={faTrashCan} />
            Delete
          </UiButton>
        </div>
      </div>
    )
  }
)
