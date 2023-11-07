import s from './add-new-task.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { UiButton, UiDialog, UiRadioGroup, UiTextarea } from '@/components/ui-kit'
import { FormEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/services/redux/hooks.ts'
import { selectTasksErrors, selectTasksLoading } from '@/services/redux/tasks/tasks.selector.ts'
import { tasksThunks } from '@/services/redux/tasks'
import { toast } from 'react-toastify'
import { Priority } from '@/services/api/types.ts'
import { priorityData } from '@/libs/data.ts'

export const AddNewTask = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectTasksLoading)
  const errorMessages = useAppSelector(selectTasksErrors)
  const [priority, setPriority] = useState<Priority>('low')
  const [openModal, setOpenModal] = useState(false)
  const [title, setTitle] = useState('')

  const handleCreateTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(tasksThunks.createTask({ priority, title }))
      .unwrap()
      .then(() => {
        setOpenModal(false)
        setTitle('')
      })
      .catch(() => {
        if (errorMessages) {
          toast.error(`${errorMessages.title}: ${errorMessages.message}`)
        } else {
          toast.error('Failed to create task')
        }
      })
  }
  return (
    <UiDialog
      isOpen={openModal}
      setIsOpen={setOpenModal}
      trigger={
        <button className={s.addTaskBtn}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      }
      title={'Add new task'}
      content={
        <div>
          <div className={s.priority}>
            <UiRadioGroup
              items={priorityData}
              label={'Priority'}
              onChangeValue={setPriority}
              value={priority}
            />
          </div>
          <form onSubmit={handleCreateTask}>
            <UiTextarea
              name={'task'}
              required
              disabled={isLoading}
              placeholder={'your task...'}
              className={s.textarea}
              onChange={event => setTitle(event.target.value.trim())}
            />
            <div className={s.actions}>
              <UiButton onClick={() => setOpenModal(false)} variant={'outlined'}>
                Cancel
              </UiButton>
              <UiButton type={'submit'} disabled={isLoading}>
                {isLoading && <FontAwesomeIcon icon={faSpinner} className={'spinner'} />}
                Add new task
              </UiButton>
            </div>
          </form>
        </div>
      }
    />
  )
}
