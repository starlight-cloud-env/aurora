import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Watch from './pages/Watch'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout><Home /></Layout>} path="/" />
      <Route element={<Layout><Browse /></Layout>} path="/browse" />
      <Route element={<Layout><Watch /></Layout>} path="/watch/:id" />
    </Routes>
  )
}

export default AppRoutes