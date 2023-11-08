import s from './sort-tasks-select.module.scss'
import { UiSelect } from '@/components/ui-kit/ui-select/ui-select.tsx'
import { sortTasksOptions } from '@/libs/data.ts'
import { useAppDispatch, useAppSelector } from '@/services/redux/hooks.ts'
import { selectSortOption, setSortOption } from '@/services/redux/tasks'
import { useCallback, useState } from 'react'
import { SelectOption } from '@/libs/types.ts'
import clsx from 'clsx'

type SortTasksSelectProps = {
  className?: string
}

export const SortTasksSelect = ({ className }: SortTasksSelectProps) => {
  const dispatch = useAppDispatch()
  const sortOption = useAppSelector(selectSortOption)
  const [sortOptions, setSortOptions] = useState<SelectOption>(sortOption)

  const handleSort = useCallback(
    (value: SelectOption) => {
      setSortOptions(value)
      dispatch(setSortOption(value))
    },
    [dispatch]
  )

  return (
    <div className={clsx(s.sortTasksSelect, className)}>
      <span className={s.selectLabel}>Sort by:</span>
      <UiSelect
        className={s.select}
        options={sortTasksOptions}
        value={sortOptions}
        onChange={handleSort}
      />
    </div>
  )
}
