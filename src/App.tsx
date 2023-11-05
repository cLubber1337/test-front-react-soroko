import { Router } from '@/routes/router.tsx'
import { store } from '@/services/redux/store.ts'
import { Provider } from 'react-redux'

export function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
