import s from './add-new-task.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { UiButton, UiDialog, UiTextarea } from '@/components/ui-kit'
import { useState } from 'react'
import { taskApi } from '@/services/api/task-api.ts'

export const AddNewTask = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const handleClick = async () => {
    try {
      if (value.length > 0) {
        await taskApi.createTask(value)
        setOpen(false)
        setValue('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UiDialog
      isOpen={open}
      setIsOpen={setOpen}
      trigger={
        <button className={s.addTaskBtn}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      }
      title={'Add new task'}
      content={
        <div>
          <UiTextarea
            placeholder={'your task...'}
            className={s.textarea}
            onChange={event => setValue(event.target.value)}
          />
          <div className={s.actions}>
            <UiButton onClick={() => setOpen(false)} variant={'outlined'}>
              Cancel
            </UiButton>
            <UiButton onClick={handleClick}>Add</UiButton>
          </div>
        </div>
      }
    />
  )
}
