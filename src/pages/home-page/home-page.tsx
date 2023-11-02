import s from './home-page.module.scss'
import { TaskCard } from '@/components/task-card/task-card.tsx'

export const HomePage = () => {
  return (
    <main className={s.homePage}>
      <TaskCard> Купить хлеб и зачем только я поел воды?! </TaskCard>
    </main>
  )
}
