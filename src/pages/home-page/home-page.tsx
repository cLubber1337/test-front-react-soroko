import { useState } from 'react'
import { TaskCard } from '@/components/task-card/task-card.tsx'

import s from './home-page.module.scss'

export const HomePage = () => {
  const [checked, setChecked] = useState(false)

  return (
    <main className={s.homePage}>
      <TaskCard isDone={checked} setIsDone={setChecked} id={'123'} createdAt={'2022-12-12'}>
        Tecnnasd asd112312 asdasda asd asdas asdasdas?!
      </TaskCard>
    </main>
  )
}
