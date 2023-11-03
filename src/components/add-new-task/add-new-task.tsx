import s from './add-new-task.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { UiButton, UiDialog, UiTextarea } from '@/components/ui-kit'

export const AddNewTask = () => {
  return (
    <UiDialog
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
            <UiButton variant={'outlined'}>Cancel</UiButton>
            <UiButton>Add</UiButton>
          </div>
        </div>
      }
    />
  )
}
