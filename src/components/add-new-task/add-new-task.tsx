import s from './add-new-task.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { UiButton, UiDialog, UiTextarea } from '@/components/ui-kit'
import { useState } from 'react'

export const AddNewTask = () => {
  const [open, setOpen] = useState(false)

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
          <UiTextarea placeholder={'your task...'} className={s.textarea} />
          <div className={s.actions}>
            <UiButton onClick={() => setOpen(false)} variant={'outlined'}>
              Cancel
            </UiButton>
            <UiButton>Add</UiButton>
          </div>
        </div>
      }
    />
  )
}
