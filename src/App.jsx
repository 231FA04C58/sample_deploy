import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { DarkModeProvider } from './contexts/DarkModeContext'
import { PlannerProvider } from './contexts/PlannerContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Planner from './pages/Planner'
import RecipeDetail from './pages/RecipeDetail'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <DarkModeProvider>
          <PlannerProvider>
            <Routes>
              <Route path="/login" element={<Layout><Login /></Layout>} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout><Home /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/about" element={
                <ProtectedRoute>
                  <Layout><About /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/planner" element={
                <ProtectedRoute>
                  <Layout><Planner /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/recipe/:id" element={
                <ProtectedRoute>
                  <Layout><RecipeDetail /></Layout>
                </ProtectedRoute>
              } />
            </Routes>
          </PlannerProvider>
        </DarkModeProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

