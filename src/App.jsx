import { useEffect } from 'react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import AppRoutes from './routes.jsx'

function AuthHandler() {
  const navigate = useNavigate()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        navigate('/', { replace: true })
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