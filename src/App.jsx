import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import VerifyOtpPage from './pages/VerifyOtpPage'
import HomePage from './pages/HomePage'
import IslasPage from './pages/IslasPage'
import EspejoPage from './pages/EspejoPage'
import OraculoPage from './pages/OraculoPage'
import PilarFormPage from './pages/PilarFormPage'
import LinkPage from './pages/LinkPage'

export default function App() {
  const { isAuthenticated, loading } = useAuth()

  return (
    <Routes>
      {/* Rutas públicas (auth) */}
      <Route
        path="/login"
        element={
          !loading && isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
        }
      />
      <Route
        path="/verify"
        element={
          !loading && isAuthenticated ? <Navigate to="/" replace /> : <VerifyOtpPage />
        }
      />

      {/* Rutas protegidas */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="islas" element={<IslasPage />} />
        <Route path="islas/:islaId/pilar/:pilarId" element={<PilarFormPage />} />
        <Route path="espejo" element={<EspejoPage />} />
        <Route path="oraculo" element={<OraculoPage />} />
        <Route path="link" element={<LinkPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
