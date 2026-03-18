import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { supabase } from "@/utils/supabaseClient"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import MainLayout from "@/components/templates/MainLayout"

function App() {
  const [session, setSession] = useState(null)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setIsInitializing(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // loading screen
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500 font-medium">
        Loading Smart Travel...
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            session ? (
              <MainLayout>
                <Search />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        <Route 
          path="/login" 
          element={!session ? <Login /> : <Navigate to="/" replace />} 
        />
      </Routes>
    </Router>
  )
}

export default App