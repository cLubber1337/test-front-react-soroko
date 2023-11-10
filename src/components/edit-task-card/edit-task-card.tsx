import s from './edit-task-card.module.scss'
import { FormEvent, memo, useEffect, useRef, useState } from 'react'
import { UiButton, UiTextarea } from '@/components/ui-kit'
import { useAppDispatch, useAppSelector } from '@/services/redux/hooks.ts'
import { selectTasksLoading, tasksThunks } from '@/services/redux/tasks'
import { Priority } from '@/services/api/types.ts'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

interface EditTaskCardProps {
  title: string
  setOpenModal: (isOpen: boolean) => void
  priority: Priority
  id: string
}

export const EditTaskCard = memo(({ title, setOpenModal, priority, id }: EditTaskCardProps) => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectTasksLoading)
  const [value, setValue] = useState(title)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    textareaRef.current?.setSelectionRange(value.length, value.length)
  }, [])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (value.trim() === title) {
      setOpenModal(false)
      return
    }
    dispatch(tasksThunks.updateTitle({ priority, id, title: value.trim() }))
      .unwrap()
      .then(() => {
        setOpenModal(false)
        setValue('')
      })
      .catch(() => {
        toast.error('Failed to create task')
      })
  }

  return (
    <form onSubmit={handleSubmit} className={s.edittaskCard}>
      <UiTextarea
        name={'title'}
        required
        ref={textareaRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        className={s.textarea}
        disabled={isLoading}
      />
      <div className={s.footer}>
        <UiButton className={s.action} onClick={() => setOpenModal(false)} variant={'outlined'}>
          Cancel
        </UiButton>
        <UiButton className={s.action} type={'submit'} disabled={isLoading}>
          {isLoading && <FontAwesomeIcon icon={faSpinner} className={'spinner'} />}
          Apply changes
        </UiButton>
      </div>
    </form>
  )
})
