import clsx from 'clsx'
import { UiCard, UiCheckbox, UiDialog, UiPopover, UiSpinner } from '@/components/ui-kit'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo, useCallback, useState } from 'react'
import { TaskCardMenu } from '../task-card-menu/task-card-menu.tsx'
import { Priority } from '@/services/api/types.ts'
import { priorityData } from '@/libs/data.ts'
import { useAppDispatch } from '@/services/redux/hooks.ts'
import { tasksThunks } from '@/services/redux/tasks'
import { EditTaskCard } from '@/components/edit-task-card/edit-task-card.tsx'
import s from './task-card.module.scss'

interface TaskCardProps {
  className?: string
  isDone?: boolean
  id: string
  createdAt?: string
  priority: Priority
  title: string
}

export const TaskCard = memo(
  ({ className, isDone, createdAt, id, priority, title }: TaskCardProps) => {
    const dispatch = useAppDispatch()
    const [openPopover, setOpenPopover] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const colorPriority = priorityData.find(data => data.priority === priority)?.color || 'white'

    const updateCompletedStatus = useCallback(
      (completed: boolean) => {
        setIsLoading(true)
        dispatch(tasksThunks.updateCompletedStatus({ priority, id, completed })).then(() => {
          setIsLoading(false)
        })
      },
      [dispatch, id, priority]
    )
    const deleteTask = useCallback(() => {
      setIsLoading(true)
      dispatch(tasksThunks.deleteTask({ priority, id })).then(() => {
        setIsLoading(false)
      })
    }, [dispatch, id, priority])

    return (
      <UiCard className={clsx(s.card, className, isLoading && s.cardLoading)}>
        {isLoading && <UiSpinner />}
        <div className={s.header}>
          <h3 className={s.createdAt}>Created at {createdAt}</h3>
          <UiPopover
            open={openPopover}
            onOpenChange={setOpenPopover}
            trigger={
              <button className={s.actions} disabled={isLoading}>
                <FontAwesomeIcon icon={faEllipsis} />
              </button>
            }
            content={
              <TaskCardMenu
                setOpenPopover={setOpenModal}
                id={id}
                priority={priority}
                deleteTask={deleteTask}
              />
            }
          />
          <UiDialog
            content={
              <EditTaskCard priority={priority} id={id} title={title} setOpenModal={setOpenModal} />
            }
            isOpen={openModal}
            setIsOpen={setOpenModal}
            title={'Edit task'}
          />
        </div>

        <div className={clsx(s.content, isDone && s.contentDone)}>{title}</div>

        <div className={s.footer}>
          <div className={s.priority} style={{ backgroundColor: colorPriority }}>
            {priority}
          </div>
          <UiCheckbox
            disabled={isLoading}
            className={s.checkbox}
            onCheckedChange={updateCompletedStatus}
            checked={isDone}
            label={'Complete the task'}
            id={id}
            name={'isDone'}
          />
        </div>
      </UiCard>
    )
  }
)
