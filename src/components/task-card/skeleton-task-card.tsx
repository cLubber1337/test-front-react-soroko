import Skeleton from 'react-loading-skeleton'
import s from './task-card.module.scss'
import 'react-loading-skeleton/dist/skeleton.css'

type SkeletonTaskCardType = {
  count: number
}

export const SkeletonTaskCard = ({ count }: SkeletonTaskCardType) => {
  const items = Array.from({ length: count }, (_, i) => i + 1)

  return (
    <ul className={s.tasksList}>
      {items.map(item => (
        <li className={s.tasksItem} key={item}>
          <Skeleton height={170} />
        </li>
      ))}
    </ul>
  )
}
