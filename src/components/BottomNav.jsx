import { NavLink } from 'react-router-dom'
import './BottomNav.css'

const navItems = [
  { to: '/', icon: 'home', label: 'Home' },
  { to: '/islas', icon: 'explore', label: 'Islas' },
  { to: '/espejo', icon: 'psychology_alt', label: 'Espejo' },
  { to: '/oraculo', icon: 'auto_awesome', label: 'Oráculo' },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {navItems.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
        >
          <span className={`material-symbols-outlined bottom-nav__icon`}>{icon}</span>
          <span className="bottom-nav__label">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
