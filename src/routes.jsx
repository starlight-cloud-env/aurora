import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Watch from './pages/Watch'
import SignIn from './pages/SignIn'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/browse" element={<Layout><Browse /></Layout>} />
      <Route path="/watch/:mediaType/:id" element={<Layout><Watch /></Layout>} />
    </Routes>
  )
}

export default AppRoutes