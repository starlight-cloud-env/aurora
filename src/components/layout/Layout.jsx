import Sidebar from './Sidebar'
import Navbar from './Navbar'
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
    </div>
  )
}

export default Layout