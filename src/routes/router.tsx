import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import { Layout } from '@/components/layout/layout.tsx'
import { Header } from '@/components/layout/header/header.tsx'
import { NotFoundPage } from '@/pages/not-found-page/not-found-page.tsx'
import { ROUTES } from '@/routes/routes.ts'
import ErrorBoundary from '@/components/error-boundary/error-boundary.tsx'
import { ErrorBoundaryMessage } from '@/components/error-boundary/error-boundary-message.tsx'
import { lazy, Suspense } from 'react'
import { UiPageSpinner } from '@/components/ui-kit'
import TaskInfoPage from '@/pages/task-info-page/task-info-page.tsx'

const HomePage = lazy(() => import('@/pages/home-page/home-page.tsx'))

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
].map(route => ({
  ...route,
  element: (
    <ErrorBoundary fallback={<ErrorBoundaryMessage />}>
      <Suspense fallback={<UiPageSpinner />}>
        <Layout>{route.element}</Layout>
      </Suspense>
    </ErrorBoundary>
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
