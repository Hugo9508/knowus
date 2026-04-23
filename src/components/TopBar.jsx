import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './TopBar.css'

export default function TopBar({ isPilarForm }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { profile, user, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Nombre e inicial del usuario real
  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'Usuario'
  const initial = displayName.charAt(0).toUpperCase()

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  /* Determine current island name for pilar form breadcrumb */
  const islaNames = { raices: 'Raíces', motor: 'El Motor', puente: 'El Puente', horizonte: 'Horizonte', cueva: 'La Cueva' }
  let currentIsla = ''
  if (isPilarForm) {
    const match = location.pathname.match(/islas\/([^/]+)/)
    if (match) currentIsla = islaNames[match[1]] || match[1]
  }

  async function handleLogout() {
    setMenuOpen(false)
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <header className="topbar">
      {isPilarForm ? (
        /* Pilar Form header with back button */
        <>
          <button className="topbar__back" onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_left</span>
            <span className="font-display" style={{ fontStyle: 'italic', fontSize: '18px' }}>
              {currentIsla}
            </span>
          </button>
          <div className="topbar__right" ref={menuRef}>
            <button className="topbar__avatar-btn" onClick={() => setMenuOpen(!menuOpen)}>
              <div className="topbar__avatar">
                <span style={{ fontSize: '12px', fontWeight: 700 }}>{initial}</span>
              </div>
            </button>
            {menuOpen && (
              <div className="topbar__menu">
                <div className="topbar__menu-header">
                  <span className="topbar__menu-name">{displayName}</span>
                  <span className="topbar__menu-email">{user?.email}</span>
                </div>
                <div className="topbar__menu-divider" />
                <button className="topbar__menu-item" onClick={() => { setMenuOpen(false); navigate('/link'); }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>link</span>
                  Vincular pareja
                </button>
                <button className="topbar__menu-item" onClick={handleLogout}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Standard header */
        <>
          <div className="topbar__left">
            <button className="topbar__avatar-btn" onClick={() => setMenuOpen(!menuOpen)}>
              <div className="topbar__avatar">
                <span style={{ fontSize: '12px', fontWeight: 700 }}>{initial}</span>
              </div>
            </button>
            <h1 className="topbar__title">
              {location.pathname === '/' ? (
                <span className="font-display" style={{ fontStyle: 'italic' }}>Hola, {displayName} ✦</span>
              ) : (
                <span className="font-display">Relational OS</span>
              )}
            </h1>
          </div>
          <div ref={menuRef} style={{ position: 'relative' }}>
            <span className="material-symbols-outlined topbar__icon" onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer' }}>
              settings
            </span>
            {menuOpen && (
              <div className="topbar__menu">
                <div className="topbar__menu-header">
                  <span className="topbar__menu-name">{displayName}</span>
                  <span className="topbar__menu-email">{user?.email}</span>
                </div>
                <div className="topbar__menu-divider" />
                <button className="topbar__menu-item" onClick={() => { setMenuOpen(false); navigate('/link'); }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>link</span>
                  Vincular pareja
                </button>
                <button className="topbar__menu-item" onClick={handleLogout}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  )
}
