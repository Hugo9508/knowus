import { Outlet, useLocation } from 'react-router-dom'
import TopBar from './TopBar'
import BottomNav from './BottomNav'

export default function Layout() {
  const { pathname } = useLocation()
  const isPilarForm = pathname.includes('/pilar/')

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <TopBar isPilarForm={isPilarForm} />
      <main style={{
        flex: 1,
        paddingTop: isPilarForm ? '80px' : '80px',
        paddingBottom: '100px',
        paddingLeft: '24px',
        paddingRight: '24px',
        maxWidth: '640px',
        margin: '0 auto',
        width: '100%',
      }}>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
