import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const [activeTab, setActiveTab] = useState('login')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  
  const { login, signup } = useAuth()
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    login(loginEmail, loginPassword)
    navigate('/')
  }

  const handleSignup = (e) => {
    e.preventDefault()
    signup(signupName, signupEmail, signupPassword)
    navigate('/')
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Create account
          </button>
        </div>

        <form 
          className={`auth-form ${activeTab === 'login' ? '' : 'hidden'}`}
          onSubmit={handleLogin}
        >
          <h2>Welcome back</h2>
          <input 
            type="email" 
            placeholder="Email" 
            required 
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button type="submit" className="btn primary">Login</button>
          <p className="muted">
            No account? <a className="switch" onClick={() => setActiveTab('signup')}>Create account</a>
          </p>
        </form>

        <form 
          className={`auth-form ${activeTab === 'signup' ? '' : 'hidden'}`}
          onSubmit={handleSignup}
        >
          <h2>Create your account</h2>
          <input 
            type="text" 
            placeholder="Full name" 
            required 
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="Email" 
            required 
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
          <button type="submit" className="btn primary">Create account</button>
          <p className="muted">
            Already have account? <a className="switch" onClick={() => setActiveTab('login')}>Login</a>
          </p>
        </form>
      </div>

      <aside className="auth-illustration">
        <h3>Why join SmartChef?</h3>
        <ul>
          <li>Save favorites</li>
          <li>Generate meal plans</li>
          <li>Export shopping lists</li>
        </ul>
        <img 
          src="https://images.unsplash.com/photo-1556910633-5099dc3971e8?w=900&h=600&fit=crop" 
          alt="Person cooking in a bright kitchen"
        />
      </aside>
    </main>
  )
}

export default Login

