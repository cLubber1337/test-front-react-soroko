import s from './sidebar.module.scss'
import { SidebarMenu } from '@/components/sidebar-menu/sidebar-menu.tsx'

export const Sidebar = () => {
  return (
    <nav className={s.sidebar}>
      <SidebarMenu />
    </nav>
  )
}
