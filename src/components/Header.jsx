import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useDarkMode } from '../contexts/DarkModeContext'

const Header = () => {
  const { currentUser, logout } = useAuth()
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <i className="fas fa-utensils"></i> SmartChef
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/planner">Meal Planner</Link>
        {currentUser ? (
          <>
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
              <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
            </button>
            <div className="user-profile">
              <div className="user-avatar">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <span>{currentUser.name}</span>
            </div>
            <a href="#" onClick={handleLogout}>Logout</a>
          </>
        ) : (
          <>
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
              <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
            </button>
            <Link to="/login">Login / Signup</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header

