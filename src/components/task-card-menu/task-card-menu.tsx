import s from './task-card-menu.module.scss'
import { faCircleInfo, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UiButton, UiDialog } from '@/components/ui-kit'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes/routes.ts'
import { memo, useState } from 'react'
import { EditTaskCard } from '@/components/edit-task-card/edit-task-card.tsx'
import { Priority } from '@/services/api/types.ts'

type TaskCardMenuProps = {
  id: string
  deleteTask: () => void
  title: string
  priority: Priority
}

export const TaskCardMenu = memo(({ id, deleteTask, title, priority }: TaskCardMenuProps) => {
  const [openModal, setOpenModal] = useState(false)

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

        <UiDialog
          trigger={
            <button className={s.item}>
              <FontAwesomeIcon icon={faPenToSquare} />
              Edit
            </button>
          }
          content={
            <EditTaskCard priority={priority} id={id} title={title} setOpenModal={setOpenModal} />
          }
          isOpen={openModal}
          setIsOpen={setOpenModal}
          title={'Edit task'}
        />

        <UiButton variant={'unstyled'} onClick={deleteTask} className={s.item}>
          <FontAwesomeIcon icon={faTrashCan} />
          Delete
        </UiButton>
      </div>
    </div>
  )
})
