import { faCircleInfo, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UiButton } from '@/components/ui-kit'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/routes.ts'
import { memo } from 'react'
import { Priority } from '@/services/api/types.ts'
import s from './task-card-menu-content.module.scss'

type TaskCardMenuContentProps = {
  id: string
  openAlertDelete: (isOpenAlertDelete: boolean) => void
  openEditDialog: (isOpen: boolean) => void
  priority: Priority
}

export const TaskCardMenuContent = memo(
  ({ id, openAlertDelete, openEditDialog, priority }: TaskCardMenuContentProps) => {
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
          <UiButton variant={'unstyled'} className={s.item} onClick={() => openEditDialog(true)}>
            <FontAwesomeIcon icon={faPenToSquare} />
            Edit
          </UiButton>
          <UiButton variant={'unstyled'} onClick={() => openAlertDelete(true)} className={s.item}>
            <FontAwesomeIcon icon={faTrashCan} />
            Delete
          </UiButton>
        </div>
      </div>
    )
  }
)
