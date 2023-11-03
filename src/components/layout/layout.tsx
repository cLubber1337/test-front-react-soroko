import { Header } from './header/header.tsx'
import { ReactNode } from 'react'
import { Sidebar } from '@/components/layout/sidebar/sidebar.tsx'

type LayoutProps = {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={'layout'}>
      <Header />
      <div className={'container'}>
        <div className={'grid-container'}>
          <Sidebar />
          <div className={'gridItem'}>{children}</div>
        </div>
      </div>
    </div>
  )
}
