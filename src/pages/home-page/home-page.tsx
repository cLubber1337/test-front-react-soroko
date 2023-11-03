import { useEffect, useState } from 'react'
import { TaskCard } from '@/components/task-card/task-card.tsx'

import s from './home-page.module.scss'
import { taskApi } from '@/services/api/task-api.ts'
import { Task } from '@/services/api/types.ts'

export const HomePage = () => {
  const [data, setData] = useState<Task[]>([])
  async function getTasks() {
    try {
      const response = await taskApi.getAllTasks()
      setData(response.data.items)
      console.log(response.data.items)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getTasks()
  }, [])

  return (
    <main className={s.homePage}>
      <div className={s.taskList}>
        {data.map(task => (
          <TaskCard
            key={task._uuid}
            isDone={task.completed}
            setIsDone={(isDone: boolean) => {
              console.log(isDone)
            }}
            id={task._uuid}
            createdAt={task._created}
          >
            {task.title}
          </TaskCard>
        ))}
      </div>
    </main>
  )
}
