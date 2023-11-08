import { HomePage } from '@/pages/home-page/home-page.tsx'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import { Layout } from '@/components/layout/layout.tsx'
import { Header } from '@/components/layout/header/header.tsx'
import { NotFoundPage } from '@/pages/not-found-page/not-found-page.tsx'
import { ROUTES } from '@/routes/routes.ts'
import { TaskInfoPage } from '@/pages/task-info-page/task-info-page.tsx'
import ErrorBoundary from '@/components/error-boundary/error-boundary.tsx'
import { ErrorBoundaryMessage } from '@/components/error-boundary/error-boundary-message.tsx'

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
].map(route => ({
  ...route,
  element: (
    <Layout>
      <ErrorBoundary fallback={<ErrorBoundaryMessage />}>{route.element}</ErrorBoundary>
    </Layout>
  ),
}))

const router = createBrowserRouter([
  {
    children: routes,
  },
  {
    path: `${ROUTES.TASK_INFO}/:priority/:id`,
    element: (
      <ErrorBoundary fallback={<ErrorBoundaryMessage />}>
        <Header />
        <TaskInfoPage />
      </ErrorBoundary>
    ),
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
