import * as AlertDialog from '@radix-ui/react-alert-dialog'
import s from './ui-alert-dialog.module.scss'
import { ReactNode } from 'react'
import clsx from 'clsx'

type UiAlertDialogProps = {
  trigger?: ReactNode
  title?: string
  actionTitle?: string
  description?: string
  cancelButton?: ReactNode
  actionButton?: ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  action?: () => void
}

export const UiAlertDialog = ({
  isOpen,
  setIsOpen,
  trigger,
  action,
  actionTitle = 'Delete',
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone!',
}: UiAlertDialogProps) => {
  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <div>{trigger}</div>}
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={'overlay'} />
        <AlertDialog.Content className={'modal-content'}>
          <AlertDialog.Title className={s.title}>{title}</AlertDialog.Title>
          <AlertDialog.Description className={s.description}>{description}</AlertDialog.Description>
          <div className={s.actions}>
            <AlertDialog.Cancel asChild>
              <button className={clsx(s.button, s.cancelBtn)}>Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button onClick={action} className={clsx(s.button, s.confirmBtn)}>
                {actionTitle}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
