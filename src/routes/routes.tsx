import { HomePage } from '@/pages/home-page/home-page.tsx'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import { Layout } from '@/components/layout/layout.tsx'
import { Header } from '@/components/layout/header/header.tsx'
import { NotFoundPage } from '@/pages/not-found-page/not-found-page.tsx'

const routes: RouteObject[] = [
  {
    path: '/',
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
    path: '*',
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
