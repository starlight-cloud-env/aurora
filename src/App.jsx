import { useEffect, useRef } from 'react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import AppRoutes from './routes.jsx'

function AuthHandler() {
  const navigate = useNavigate()
  const initialSession = useRef(true)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      // Only redirect on a fresh sign in, not on session restore
      if (event === 'SIGNED_IN' && initialSession.current) {
        initialSession.current = false
        navigate('/', { replace: true })
      }
      if (event !== 'SIGNED_IN') {
        initialSession.current = true
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <AuthHandler />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App