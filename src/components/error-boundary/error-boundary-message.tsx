import s from './error-boundary-message.module.scss'
import errorImg from '@/assets/img/globalError.svg'

export const ErrorBoundaryMessage = () => {
  return (
    <div className={s.errorBoundaryMessage}>
      <img className={s.errorImg} src={errorImg} alt="Error" />
      <h1 className={s.title}>Oops! Something went wrong. Please try again later</h1>
    </div>
  )
}
