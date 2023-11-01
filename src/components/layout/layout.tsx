import { Header } from '@/components/layout/header/header.tsx'
import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={'layout'}>
      <Header />
      {children}
    </div>
  )
}
