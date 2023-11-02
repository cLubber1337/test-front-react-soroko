import s from './home-page.module.scss'
import { TaskCard } from '@/components/task-card/task-card.tsx'
import { useState } from 'react'
import { UiButton } from '@/components/ui-kit'

export const HomePage = () => {
  const [checked, setChecked] = useState(false)

  return (
    <main className={s.homePage}>
      <TaskCard isDone={checked} setIsDone={setChecked}>
        Купить хлеб и зачем только я поел воды?!
      </TaskCard>
      <UiButton className={s.test}>TEST</UiButton>
    </main>
  )
}
