import { useEffect, useState } from 'react'
import { TaskCard } from '@/components/task-card/task-card.tsx'

import s from './home-page.module.scss'
import { taskApi } from '@/services/api/task-api.ts'

export const HomePage = () => {
  const [checked, setChecked] = useState(false)
  async function getTasks() {
    const response = await taskApi.getTodoLists()
    console.log(response)
  }
  useEffect(() => {
    getTasks()
  }, [])

  return (
    <main className={s.homePage}>
      <TaskCard isDone={checked} setIsDone={setChecked} id={'123'} createdAt={'2022-12-12'}>
        Nec cursus faucibus. Aenean sit mattis venenatis dictum. Dapibus nec orci, ipsum amet,
        eleifend nec interdum lectus ornare et nunc mattis integer orci, cursus lectus platea ut.
        Efficitur nisi sit tempus lorem ipsum imperdiet morbi nec dapibus justo amet et habitasse
        aenean malesuada accumsan molesti
      </TaskCard>
    </main>
  )
}
