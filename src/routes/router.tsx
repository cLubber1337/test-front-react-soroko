import { HomePage } from '@/pages/home-page/home-page.tsx'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import { Layout } from '@/components/layout/layout.tsx'
import { Header } from '@/components/layout/header/header.tsx'
import { NotFoundPage } from '@/pages/not-found-page/not-found-page.tsx'
import { ROUTES } from '@/routes/routes.ts'

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
].map(route => ({
  ...route,
  element: <Layout>{route.element}</Layout>,
}))

const router = createBrowserRouter([
  {
    children: routes,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: (
      <>
        <Header />
        <NotFoundPage />
      </>
    ),
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
