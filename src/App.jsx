import { BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import { supabase } from './lib/supabase'
import AppRoutes from './routes.jsx'

function App() {
  useEffect(() => {
    // Handle magic link redirect
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        window.location.href = '/'
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App