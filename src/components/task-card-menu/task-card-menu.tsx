import { TaskCardMenuContent } from '@/components/task-card-menu/task-card-menu-content/task-card-menu-content.tsx'
import s from '@/components/task-card/task-card.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { UiDialog, UiPopover } from '@/components/ui-kit'
import { UiAlertDialog } from '@/components/ui-kit/ui-alert-dialog/ui-alert-dialog.tsx'
import { EditTaskCard } from '@/components/edit-task-card/edit-task-card.tsx'
import { useCallback, useState } from 'react'
import { tasksThunks } from '@/services/redux/tasks'
import { useAppDispatch } from '@/services/redux/hooks.ts'
import { Priority } from '@/services/api/types.ts'

type TaskCardMenuProps = {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  priority: Priority
  id: string
  title: string
}
export const TaskCardMenu = ({
  isLoading,
  setIsLoading,
  priority,
  id,
  title,
}: TaskCardMenuProps) => {
  const dispatch = useAppDispatch()
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false)
  const [openPopover, setOpenPopover] = useState(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)

  const deleteTask = useCallback(() => {
    setIsLoading(true)
    dispatch(tasksThunks.deleteTask({ priority, id }))
      .unwrap()
      .then(() => {
        setIsLoading(false)
        setIsOpenEditModal(false)
      })
  }, [dispatch, id, priority, setIsLoading])
  return (
    <>
      <UiPopover
        open={openPopover}
        onOpenChange={setOpenPopover}
        trigger={
          <button className={s.actions} disabled={isLoading}>
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        }
        content={
          <TaskCardMenuContent
            openEditDialog={setIsOpenEditModal}
            id={id}
            priority={priority}
            openAlertDelete={setIsOpenDeleteAlert}
          />
        }
      />

      {/*---------------------------Delete task alert --------------------------- */}
      <UiAlertDialog
        action={deleteTask}
        isOpen={isOpenDeleteAlert}
        setIsOpen={setIsOpenDeleteAlert}
        description={
          'This action cannot be undone. This will permanently delete your task and remove it from our servers.'
        }
      />

      {/*---------------------------Edit task dialog --------------------------- */}
      <UiDialog
        content={
          <EditTaskCard
            priority={priority}
            id={id}
            title={title}
            setOpenModal={setIsOpenEditModal}
          />
        }
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
        title={'Edit task'}
      />
    </>
  )
}
