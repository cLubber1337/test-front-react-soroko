import s from './task-info-page.module.scss'
import { UiButton, UiCard, UiPageSpinner, UiTextarea } from '@/components/ui-kit'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/services/redux/hooks.ts'
import { Priority } from '@/services/api/types.ts'
import { useEffect } from 'react'
import { clearTask, selectTask, selectTasksLoading, tasksThunks } from '@/services/redux/tasks'
import { formatDate } from '@/libs/utils.ts'
import { PriorityData, priorityData } from '@/libs/data.ts'
import { faLeftLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const TaskInfoPage = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectTasksLoading)
  const task = useAppSelector(selectTask)
  const { id, priority } = useParams()
  const navigate = useNavigate()

  const priorityStyle = (priority: Priority | undefined, priorityData: PriorityData[]) => {
    return { backgroundColor: priorityData.find(data => data.priority === priority)?.color }
  }

  useEffect(() => {
    if (id && priority) {
      dispatch(tasksThunks.fetchTask({ priority: priority as Priority, id }))
    }
    return () => {
      dispatch(clearTask())
    }
  }, [dispatch, id, priority])

  if (isLoading) return <UiPageSpinner />

  return (
    <main className={s.taskInfoPage}>
      <div className="container">
        <UiButton variant={'unstyled'} className={s.backButton} onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faLeftLong} /> Back
        </UiButton>
        <div className={s.wrapper}>
          <UiCard className={s.card}>
            <h1 className={s.title}>Detailed information</h1>
            <div className={s.divider} />
            <div className={s.content}>
              <div className={s.item}>
                <h3 className={s.label}>Created</h3>
                <p className={s.value}>{formatDate(task?._created)}</p>
              </div>
              <div className={s.item}>
                <h3 className={s.label}>Recent Changes</h3>
                <p className={s.value}>{formatDate(task?._modified)}</p>
              </div>
              <div className={s.item}>
                <h3 className={s.label}>Completed</h3>
                <p className={s.value} style={{ color: task?.completed ? 'green' : 'red' }}>
                  {String(task?.completed)}
                </p>
              </div>
              <div className={s.item}>
                <h3 className={s.label}>Priority</h3>
                <p className={s.value}>
                  <span
                    className={s.priority}
                    style={priorityStyle(task?._data_type, priorityData)}
                  >
                    {task?._data_type}
                  </span>
                </p>
              </div>
              <div className={s.item}>
                <h3 className={s.label}>Task</h3>
                <UiTextarea value={task?.title} disabled />
              </div>
            </div>
          </UiCard>
        </div>
      </div>
    </main>
  )
}
