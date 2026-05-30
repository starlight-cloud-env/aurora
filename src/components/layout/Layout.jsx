import Sidebar from './Sidebar'
import Navbar from './Navbar'
import BottomNav from './BottomNav'
import './Layout.css'

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__main">
        <Navbar />
        <main className="layout__content">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  )
}

export default Layout