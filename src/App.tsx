import { Router } from '@/routes/router.tsx'
import { store } from '@/services/redux/store.ts'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <Provider store={store}>
      <ToastContainer autoClose={3000} position="top-center" closeOnClick={false} />
      <Router />
    </Provider>
  )
}
