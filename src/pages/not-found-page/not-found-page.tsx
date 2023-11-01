import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <div>
      <h1>404</h1>
      <Link to="/">Go to main page</Link>
    </div>
  )
}
