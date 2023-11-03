import { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import s from './ui-dialog.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

interface UiDialogProps {
  trigger: ReactNode
  content: ReactNode
  title?: string
}

export const UiDialog = ({ trigger, content, title }: UiDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />

        <Dialog.Content className={s.content}>
          <Dialog.Title className={s.title}>{title}</Dialog.Title>
          {content}
          <Dialog.Close className={s.closeBtn} aria-label="Close">
            <FontAwesomeIcon icon={faXmark} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
