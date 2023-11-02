import s from './task-card-menu.module.scss'
import { faCircleInfo, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UiButton } from '@/components/ui-kit'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/routes.ts'

type TaskCardMenuProps = {
  id?: string
}

export const TaskCardMenu = ({ id }: TaskCardMenuProps) => {
  return (
    <div className={s.taskCardMenu}>
      <h3 className={s.title}>Task menu</h3>
      <div className={s.content}>
        <UiButton
          as={Link}
          to={`${ROUTES.TASK_INFO}/${id}`}
          variant={'unstyled'}
          className={s.item}
        >
          <FontAwesomeIcon icon={faCircleInfo} />
          Information
        </UiButton>
        <UiButton variant={'unstyled'} className={s.item}>
          <FontAwesomeIcon icon={faPenToSquare} />
          Edit
        </UiButton>
        <UiButton variant={'unstyled'} className={s.item}>
          <FontAwesomeIcon icon={faTrashCan} />
          Delete
        </UiButton>
      </div>
    </div>
  )
}
