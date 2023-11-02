import { ReactNode } from 'react'

import * as Popover from '@radix-ui/react-popover'
import s from './ui-popover.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

type UiPopoverProps = {
  trigger: ReactNode
  content: ReactNode
  className?: string
}
export const UiPopover = ({ trigger, content }: UiPopoverProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={5} className={s.content}>
          {content}
          <Popover.Close className={s.closeBtn} aria-label="Close">
            <FontAwesomeIcon icon={faXmark} />
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
